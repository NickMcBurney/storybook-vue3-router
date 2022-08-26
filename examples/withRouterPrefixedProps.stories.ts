import vueRouter from '../dist/esm'

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
        <router-link to="/username/@nick">User: @nick</router-link>
        <router-link to="/username/@james">User @james</router-link>
      </div>
    </div>
  `
};

/* the component for the prefixed vue router prop (@:username) */
const Username = {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    userDetailsRoute () {
      return `/username/@${this.username}/details/`
    }
  },
  template: `
    <div>
      <h2>User</h2>
      <p>User id is: {{ username }} </p>
      <p>Prefixed with: @ </p>
      <p>Path is /@username/</p>

      <router-view />

      <div style="display: flex; gap: 1em">
        <router-link to="/">Home</router-link>
        <router-link :to="userDetailsRoute">User Details</router-link>
      </div>
    </div>
  `
}
/* A simple nested route component */
const UserDetails = {
  template: `
    <div>
      <p>User details could go here</p>
    </div>
  `
}

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

export const UsernamePrefix = DefaultTemplate.bind({})
UsernamePrefix.decorators = [
  vueRouter([
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      /* here we prefix the username with '@' */
      /* the `username` will be 'nick' or 'james' */
      /* but the route / url displayed will include the @ symbol e.g. /username/@nick/ */
      path: '/username/@:username',
      name: 'username',
      component: Username,
      props: true,
      children: [
        /* here we include a nested route */
        /* this creates routes such as /username/@nick/details */
        {
          path: 'details',
          component: UserDetails
        }
      ]
    }
  ])
]