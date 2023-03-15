
import { setup } from '@storybook/vue3'
import { makeDecorator } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
import type { StoryContext, StoryFn } from '@storybook/types'

import type {
  Router,
  RouteLocationRaw,
  RouteLocationNormalizedLoaded
} from 'vue-router'

import { getFromArgs } from './utils'

type MockRouter = Router & { isMocked?: boolean }
type MockRoute = RouteLocationNormalizedLoaded & { isMocked?: boolean }
type decoratorType = ReturnType<typeof makeDecorator>

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
export const withMockRouter: decoratorType = (
  options: { meta?: Array<string>, params?: Array<string>, query?: Array<string> }
) => makeDecorator({
  name: 'withMockRouter',
  parameterName: 'withMockRouter',

  wrapper: (storyFn: StoryFn, context: StoryContext) => {
    /* check if there is an existing router */
    setup((app) => {
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
          path: context.args.path || '/',
          fullPath: `/#${context.args.path}`,
          name: context.args.name || 'home',
          meta: options.meta ? getFromArgs(context.args, options.meta) : {},
          params: options.params ? getFromArgs(context.args, options.params) : {},
          query: options.query ? getFromArgs(context.args, options.query) : {},
        } as MockRoute
      }
    })

    /* return the storybook story */
    return storyFn(context)
  }
})
  
export default withMockRouter
