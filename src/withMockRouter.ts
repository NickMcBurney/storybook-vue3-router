
import { app } from "@storybook/vue3";
import { makeDecorator } from "@storybook/addons";
import { LegacyStoryFn, StoryContext } from "@storybook/addons/dist/ts3.9/types";
import { action } from '@storybook/addon-actions';

function getFromArgs(args: { [key: string]: any }, options: Array<string>) {
  let filtered : { [key: string]: any } = {}
  options.forEach((option) => {
    filtered = { ...filtered, [option]: args[option] }
  })

  return filtered
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
export const withMockRouter = (
  options: { meta?: Array<string>, params?: Array<string>, query?: Array<string> }
) => makeDecorator({
  name: 'withMockRouter',
  parameterName: 'withMockRouter',

  wrapper: (storyFn: LegacyStoryFn, context: StoryContext) => {
    /* check if there is an existing router */
    const existingRouter = app.config.globalProperties.$router
    const existingRoute = app.config.globalProperties.$route
    
    /* if vue-router is already initialized we refresh the page to ensure full (non-mocked) vue-router can be initialized */
    const forceReload = (existingRouter && existingRouter.isMocked !== true) && (existingRoute && existingRoute.isMocked !== true)
    if (forceReload) {
      existingRouter.go(0)
      return
    } else {
      app.config.globalProperties.$router = {
        isMocked: true, // !IMPORTANT this line is required to ensure the full vue-router implementation can initialize
        push: (location: string) => { action('$router.push()')(location) },
        replace: (location: string) => { action('$router.replace()')(location) },
        go: (n: number) => { action('$router.go()')(n) },
        back: () => { action('$router.back()')('back') },
        forward: () => { action('$router.forward()')('forward') },
      }
      app.config.globalProperties.$route = {
        isMocked: true, // !IMPORTANT this line is required to ensure the full vue-router implementation can initialize
        path: context.args.path || '/',
        fullPath: `/#${context.args.path}`,
        name: context.args.name || 'home',
        meta: options.meta ? getFromArgs(context.args, options.meta) : {},
        params: options.params ? getFromArgs(context.args, options.params) : {},
        query: options.query ? getFromArgs(context.args, options.query) : {},
      }
    }

    /* return the storybook story */
    return storyFn(context);
  }
})
  
export default withMockRouter;
