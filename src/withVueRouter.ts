
import { app } from "@storybook/vue3";
import { makeDecorator } from "@storybook/addons";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { defaultRoutes } from './defaultRoutes'

export const withVueRouter = (routesParam?: Array<RouteRecordRaw>, beforeEach?: Function) => makeDecorator({
    name: 'withVueRouter',
    parameterName: 'withVueRouter',

    wrapper: (storyFn, context) => {
      const vueRouterGlobalProperty = app.config.globalProperties.$router
      const vueRouteGlobalProperty = app.config.globalProperties.$route
      if (context.viewMode === 'story' && !vueRouterGlobalProperty && !vueRouteGlobalProperty) {
        console.log(app)
        /* get routes from either `routesParam` or use `defaultRoutes` */
        const routes: Array<RouteRecordRaw> = routesParam || defaultRoutes

        /* create vue router */
        const router = createRouter({
          history: createWebHashHistory(),
          routes
        });

        /* check if there is a `beforeEach` function passed into decorator function */
        if (typeof beforeEach === 'function') {
          /* fire `beforeEach` param on `router.beforeEach` and pass `to` and `from` params to the function */
          router.beforeEach((to, from) => beforeEach(to, from))
        }

        /* tell storybook to use vue router */
        app.use(router)

        /* if the route route is not `/` */
        if (routes[0].path !== '/') {
          /* update router to use the first path in routes defined */
          router.replace(routes[0].path)
        }
      }
      
      /* return the storybook story */
      return storyFn(context);
    
    }
  })

  
export default withVueRouter;
