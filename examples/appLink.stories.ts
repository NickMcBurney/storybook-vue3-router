import { vueRouter } from '../dist'

import appLink from './components/appLink.vue'
import routerViewWrapper from './components/routerViewWrapper.vue'

export default {
  title: 'Router Link',
  component: routerViewWrapper,
}

/**
 * STORYBOOK EXPORT
 */
/* STORYBOOK EXPORT -- BASIC */
const BasicTemplate = () => ({
  components: { 'appLink': appLink, 'RouterViewWrapper': routerViewWrapper },
  template: `
  <RouterViewWrapper title="Storybook Vue 3 Router custom appLink component">
    <div>
      <div style="display: flex; gap: 1em">
        <appLink to="/">appLink: Home</appLink>
        <appLink to="/about/">appLink: About</appLink>
        <appLink to="https://www.google.com">appLink: External Link</appLink>
      </div>
      <router-view />
    </div>
  </RouterViewWrapper>
  `
})

export const Default = BasicTemplate.bind({})
Default.decorators = [
  vueRouter()
]
