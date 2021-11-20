
import { app } from "@storybook/vue3";
import { makeDecorator } from "@storybook/addons";

import {
  Router,
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  NavigationGuard,
  RouteLocationRaw
} from "vue-router";

import { defaultRoutes } from './defaultRoutes'

/* NOT USED - see bug notes in `withVueRouter()`
function routerGuardFn (router: Router, beforeEach?: NavigationGuard) {
  if (typeof beforeEach === 'function') {
    // fire `beforeEach` param on `router.beforeEach` and pass `to`, `from` and `next()` params to the function
    router.beforeEach(
      (to, from, next) => beforeEach(to, from, next)
    )
  } else {
    router.beforeEach(
      (to, from) => action('CHANGED')(to, from)
    )
  }
}
*/

function initialRoute (router: Router, initialRoute: RouteLocationRaw) {
  router.replace(initialRoute || '/')
}

function resetRoutes (router: Router, newRoutes: RouteRecordRaw[]) {
  const oldRoutes: Array<RouteRecordRaw> = router.getRoutes()
  /* remove previously generated routes */
  oldRoutes.forEach((route) => {
    router.removeRoute(route.name)
  })
  /* add new story routes */
  newRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

export const withVueRouter = (
  /* optional: routes param - uses `defaultRoutes` if not provided */
  routes = defaultRoutes,
  /* optional: router options - used to pass `initialRoute` value and `beforeEach()` navigation guard methods */
  options?: { initialRoute?: string, beforeEach?: NavigationGuard }
) => makeDecorator({
  name: 'withVueRouter',
  parameterName: 'withVueRouter',

  wrapper: (storyFn, context) => {
    const existingRouter = app.config.globalProperties.$router

    if (!existingRouter) {
      /* create vue router */
      const router = createRouter({
        history: createWebHashHistory(),
        routes
      });
      
      /* setup router guards */
      /*
       ! BUG: This causes the beforeEach events to fire multiple times if you click on multiple stories
       this is because `vue-router` is technically only initialised once, and shared across stories,
       so each new story add its route guards and this results it multiple route guards applied to each route
       ! BUG: to fix we'll need to clear/destroy the previous router between stories (though haven't found how to do this)
       routerGuardFn(router, options?.beforeEach)
      */

      /* tell storybook to use vue router */
      app.use(router)

      /* go to initial route */
      initialRoute(router, options?.initialRoute)
    } else {
      /* reset routes (remove old / add new) */
      resetRoutes(existingRouter, routes, context.id)

      /* setup router guards */
      /*
       ! BUG: This causes the beforeEach events to fire multiple times if you click on multiple stories
       this is because `vue-router` is technically only initialised once, and shared across stories,
       so each new story add its route guards and this results it multiple route guards applied to each route
       ! BUG: to fix we'll need to clear/destroy the previous router between stories (though haven't found how to do this)
       routerGuardFn(existingRouter, options?.beforeEach)
      */

      /* go to initial route */
      initialRoute(existingRouter, options?.initialRoute)
    }

    /* return the storybook story */
    return storyFn(context);
  
  }
})
  
export default withVueRouter;
