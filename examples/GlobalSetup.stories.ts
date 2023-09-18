import { vueRouter } from '../dist'
import routerViewWrapper from './components/routerViewWrapper.vue'

export default {
  title: 'Global Preview.js Component and Vue Router Decorator',
}

/**
 * STORYBOOK EXPORT
 */
/* STORYBOOK EXPORT -- BASIC */
const BasicTemplate = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
  <RouterViewWrapper title="Storybook Vue 3 Router custom appLink component">
    <div>
      <p>This story replicates a bug with current SB7 and this decorator using vue setup()</p>
      <p>The below should render as a button using the ./components/BasicButton.vue component - which is imported globally via preview.js</p>
      <GlobalButton>A global button</GlobalButton>
      <router-view />
    </div>
  </RouterViewWrapper>
  `
})

export const Default = BasicTemplate.bind({})
Default.decorators = [
  vueRouter()
]