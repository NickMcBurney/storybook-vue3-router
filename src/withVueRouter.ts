
import { setup } from "@storybook/vue3";
import { makeDecorator } from "@storybook/addons";
import type { StoryContext, StoryFn } from '@storybook/types'

import {
  createRouter,
  createWebHashHistory,
  /* types */
  Router,
  RouteRecordRaw,
  NavigationGuard,
  RouteLocationRaw,
  RouteRecordNormalized,
  RouteLocationNormalizedLoaded,
  RouterOptions,
} from "vue-router";

type MockRouter = Router & { isMocked?: boolean }
type MockRoute = RouteLocationNormalizedLoaded & { isMocked?: boolean }

import { defaultRoutes } from './defaultRoutes'

function globalRouterGuardFn (router: Router, beforeEach?: NavigationGuard, forceReload = false): void {
  if (typeof beforeEach === 'function') {
    /**
     * force reload in order to reset router and apply global beforeEach()
     * this is only required if the router has been initialized previously
     * TODO: can this be made less hacky?
    */
    if (forceReload) {
      router.go(0)
      return
    }
    // add `beforeEach` param on `router.beforeEach` and pass `to`, `from` and `next()` params to the function
    router.beforeEach(
      (to, from, next) => beforeEach(to, from, next)
    )
  }
}


function initialRoute (router: Router, initialRoute: RouteLocationRaw): void {
  router.replace(initialRoute || '/')
}

function resetRoutes (router: Router, newRoutes: RouteRecordRaw[]): void {
  const oldRoutes: Array<RouteRecordNormalized> = router.getRoutes()
  /* remove previously generated routes */
  oldRoutes.forEach((route) => {
    router.removeRoute(route.name)
  })
  /* add new story routes */
  newRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

/**
 * Add a vue router instance to Storybook stories
 * @param routes (optional) custom routes for story
 * @param options (optional) custom options
 *
 * @remarks
 *
 * If there is a previously initialized story using vue-router and you wish to use `beforeEach` to apply global router guards via `options` param,
 * we must reload the story in order to apply the global route guards, this can have a minor performance impact.
 */
export const withVueRouter = (
  /* optional: routes param - uses `defaultRoutes` if not provided */
  routes = defaultRoutes,
  /* optional: router options - used to pass `initialRoute` value, `beforeEach()` navigation guard methods and vue-router `createRouter` options */
  options?: { initialRoute?: string, beforeEach?: NavigationGuard, vueRouterOptions?: RouterOptions },
) => makeDecorator({
  name: 'withVueRouter',
  parameterName: 'withVueRouter',

  wrapper: (storyFn: StoryFn, context: StoryContext) => {
    setup(app => {
            /* setup router var */
      let router

      /* check if there is an existing router */
      const existingRouter = app.config.globalProperties.$router as MockRouter
      const existingRoute = app.config.globalProperties.$route as MockRoute
      if ((!existingRouter || existingRouter.isMocked === true) && (!existingRoute || existingRoute.isMocked === true)) {
        /* create vue router */
        router = createRouter({
          history: createWebHashHistory(),
          routes,
          ...options?.vueRouterOptions
        });
        
        /* setup optional global router guards */
        globalRouterGuardFn(router, options?.beforeEach)

        /* tell storybook to use vue router */
        app.use(router)
      } else {
        /* set router to value of existing router */
        router = existingRouter

        /* reset routes (remove old / add new) */
        resetRoutes(router, routes)
        /* setup optional global router guards (if provided and there is an existing router this will force a page reload) */
        globalRouterGuardFn(existingRouter, options?.beforeEach, true)
      }

      /* go to initial route */
      initialRoute(router, options?.initialRoute)

    })
    /* return the storybook story */
    return storyFn(context, context);
  }
})
  
export default withVueRouter;
