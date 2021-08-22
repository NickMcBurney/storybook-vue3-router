import { action } from '@storybook/addon-actions';

import vueRouter from '../src/withVueRouter'

import myRouterWrapper from './myRouterWrapper.vue'

export default {
  title: 'Components/Vue Router View Wrapper',
  component: myRouterWrapper,
}

const Template = (args: Record<string, unknown>) => ({
  components: { 'MyRouterWrapper': myRouterWrapper },
  setup () {
    return { args }
  },
  template: `<MyRouterWrapper />`
})

export const Default = Template.bind({})
Default.decorators = [
  vueRouter(null, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]