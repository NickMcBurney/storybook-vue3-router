import { vueRouter } from '../dist'

import routerViewWrapper from './components/routerViewWrapper.vue'

/**
 * COMPONENT TEMPLATES
 */
const Home = {
  template: `
    <div>
      <h2>Home</h2>

      <div style="display: flex; gap: 1em">
        <router-link to="/">Home</router-link>
        <router-link to="/user/1">User 1</router-link>
        <router-link to="/user/2">User 2</router-link>
      </div>
    </div>
  `
};

const User = {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  template: `
    <div>
      <h2>User</h2>
      <p>User id is: {{ id }} </p>

      <div style="display: flex; gap: 1em">
        <router-link to="/">Home</router-link>
      </div>
    </div>
  `
};

/**
 * STORYBOOK EXPORT
 */
export default {
  title: 'Router Props',
  component: routerViewWrapper,
}

const DefaultTemplate = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Router Props">
      <div>
        <router-view />
      </div>
    </RouterViewWrapper>
  `
})

export const UserID = DefaultTemplate.bind({})
UserID.decorators = [
  vueRouter([
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User,
      props: true
    }
  ])
]