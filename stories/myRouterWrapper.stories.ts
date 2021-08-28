import { action } from '@storybook/addon-actions';

import vueRouter from '../dist/esm'

import myRouterWrapper from './myRouterWrapper.vue'

export default {
  title: 'Components/Vue Router View Wrapper',
  component: myRouterWrapper,
}

const DefaultTemplate = (args: Record<string, unknown>) => ({
  components: { 'MyRouterWrapper': myRouterWrapper },
  setup () {
    return { args }
  },
  template: `
    <MyRouterWrapper>
      <router-view/>
    </MyRouterWrapper>
  `
})

export const Default = DefaultTemplate.bind({})
Default.decorators = [
  vueRouter(null, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]

const TransitionTemplate = (args: Record<string, unknown>) => ({
  components: { 'MyRouterWrapper': myRouterWrapper },
  setup () {
    return { args }
  },
  template: `
    <MyRouterWrapper title="Storybook Vue 3 Router with Transition">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </MyRouterWrapper>
  `
})

export const WithTransition = TransitionTemplate.bind({})
WithTransition.decorators = [
  vueRouter(null, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]