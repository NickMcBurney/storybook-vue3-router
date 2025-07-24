
import { Decorator } from '@storybook/vue3'
import { getCurrentInstance } from 'vue';
import { action } from 'storybook/actions'

import type {
  Router,
  RouteLocationRaw,
  RouteLocationNormalizedLoaded
} from 'vue-router'

import { getFromArgs, type ArgsArrayOrObject } from './utils'

type MockRouter = Router & { isMocked?: boolean }
type MockRoute = RouteLocationNormalizedLoaded & { isMocked?: boolean }

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
export function withMockRouter (
    /* optional: router options - used to pass `initialRoute` value, `beforeEach()` navigation guard methods and vue-router `createRouter` options */
    options: { meta?: ArgsArrayOrObject, params?: ArgsArrayOrObject, query?: ArgsArrayOrObject }
): Decorator {
  return (_, ctx) => ({
    setup () {
      const { app } = getCurrentInstance()!.appContext
      const existingRouter = app.config.globalProperties.$router as MockRouter
      const existingRoute = app.config.globalProperties.$route as MockRoute
      
      /* if vue-router is already initialized we refresh the page to ensure full (non-mocked) vue-router can be initialized */
      const forceReload = (existingRouter && existingRouter.isMocked !== true) && (existingRoute && existingRoute.isMocked !== true)
      if (forceReload) {
        existingRouter.go(0)
        return
      } else {
        app.config.globalProperties.$router = {
          isMocked: true, // !IMPORTANT this line is required to ensure the full vue-router implementation can initialize
          push: async (location: RouteLocationRaw) => { action('$router.push()')(location) },
          replace: async (location: RouteLocationRaw) => { action('$router.replace()')(location) },
          go: (n: number) => { action('$router.go()')(n) },
          back: () => { action('$router.back()')('back') },
          forward: () => { action('$router.forward()')('forward') },
        } as MockRouter
        app.config.globalProperties.$route = {
          isMocked: true, // !IMPORTANT this line is required to ensure the full vue-router implementation can initialize
          path: ctx.args?.path || '/',
          fullPath: `/#${ctx.args?.path}`,
          name: ctx.args?.name || 'home',
          meta: options.meta ? getFromArgs(ctx.args, options.meta) : {},
          params: options.params ? getFromArgs(ctx.args, options.params) : {},
          query: options.query ? getFromArgs(ctx.args, options.query) : {},
        } as MockRoute
      }
    },
    template: '<story/>'
  })
}
  
export default withMockRouter
