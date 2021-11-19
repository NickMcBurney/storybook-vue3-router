import vueRouter from '../dist/esm'

import routerViewWrapper from './components/routerViewWrapper.vue'

export default {
  title: 'Basic Router View Wrapper',
  component: routerViewWrapper,
}

/**
 * STORYBOOK EXPORT
 */
/* STORYBOOK EXPORT -- BASIC */
const BasicTemplate = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper>
      <router-view />
    </RouterViewWrapper>
  `
})

export const Default = BasicTemplate.bind({})
Default.decorators = [
  vueRouter()
]

/* STORYBOOK EXPORT -- WITH TRANSITION */
const TransitionTemplate = () => ({
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

export const WithTransition = TransitionTemplate.bind({})
WithTransition.decorators = [
  vueRouter()
]

/* STORYBOOK EXPORT -- WITH INITIAL ROUTE OPTION */
const InitialRouteTemplate = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Initial Route Option">
      <router-view></router-view>
    </RouterViewWrapper>
  `
})

export const WithInitialRoute = InitialRouteTemplate.bind({})
WithInitialRoute.decorators = [
  vueRouter(undefined, {
    initialRoute: '/about'
  })
]