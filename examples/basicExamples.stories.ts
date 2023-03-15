import { vueRouter } from '../dist'

import routerViewWrapper from './components/routerViewWrapper.vue'

export default {
  title: 'Basic Router View Wrapper',
  component: routerViewWrapper,
}

/**
 * STORYBOOK EXPORT
 */
/* STORYBOOK EXPORT -- BASIC */
export const Default = () => ({
  components: { routerViewWrapper },
  template: `
    <router-view-wrapper>
      <router-view />
    </router-view-wrapper>
  `
})

Default.decorators = [
  vueRouter()
]

/* STORYBOOK EXPORT -- WITH TRANSITION */
export const WithTransition = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Transition">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </RouterViewWrapper>
  `
})

WithTransition.decorators = [
  vueRouter()
]

/* STORYBOOK EXPORT -- WITH INITIAL ROUTE OPTION */
export const WithInitialRoute = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Initial Route Option">
      <router-view></router-view>
    </RouterViewWrapper>
  `
})

WithInitialRoute.decorators = [
  vueRouter(undefined, {
    initialRoute: '/about'
  })
]

/* STORYBOOK EXPORT -- WITH VUE ROUTER OPTIONS */
export const WithVueRouteOptions = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Vue Router Options">
      <router-view></router-view>
    </RouterViewWrapper>
  `
})

WithVueRouteOptions.decorators = [
  vueRouter(undefined, {
    initialRoute: '/about',
    vueRouterOptions: {
      linkActiveClass: 'activeLink'
    }
  })
]