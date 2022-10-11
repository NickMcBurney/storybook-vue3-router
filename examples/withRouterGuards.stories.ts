import { action } from '@storybook/addon-actions';

import { ref, computed } from 'vue'
import { useRouter } from "vue-router";

import vueRouter from '../dist/esm'

import routerViewWrapper from './components/routerViewWrapper.vue'

/**
 * AUTHENTICATION HANDLING
 */
const loggedIn = ref(false)

const Auth = () => {
  const router = useRouter()

  const login = () => {
    loggedIn.value = true
  }

  const logout = () => {
    loggedIn.value = false
    router.push('/login')
  }

  const routerGuard = (to, from, next) => {
    const { meta } = to

    if (meta?.authRequired) {
      action('checking auth')({ required: meta.authRequired })
    }
    
    if (meta?.authRequired && loggedIn.value !== true) {
      action('auth required route blocked')({ to: to.path })
      next({ name: 'login', params: { blocked: true } })
    } else {
      if (meta?.authRequired) {
        action('auth required route passed')({ isAuthenticated: loggedIn.value })
      }
      next()
    }
  }

  return { router, login, logout, routerGuard }
}

/**
 * COMPONENT TEMPLATES
 */
const Login = {
  setup () {
    const { login, logout, router } = Auth()
    const params = computed(() => router.currentRoute.value.params)
    return { loggedIn, login, logout, params }
  },
  template: `
    <div>
      <h2>Login</h2>
      <p class="login-state">Is Logged-In: {{ loggedIn }}</p>
      <p v-if="params.blocked && !loggedIn" class="login-warning">
        You can't access the dashboard whilst not logged in.
      </p>
      
      <p>
        <button v-if="!loggedIn" @click="login()">Login</button>
        <button v-else @click="logout()" class="grey">Logout</button>
      </p>

      <div style="display: flex; gap: 1em">
        <router-link to="/login">Home</router-link>
        <router-link to="/dash">View dashboard</router-link>
      </div>
    </div>
  `
};

const Dash = {
  setup () {
    const { logout } = Auth()

    return { logout }
  },
  template: `
    <div>
      <h2>Dashboard</h2>
      <p>You're logged in!</p>
      <p><button @click="logout()" class="grey">Logout</button></p>

      <div style="display: flex; gap: 1em">
        <router-link to="/login">Home</router-link>
      </div>
    </div>
  `
};

/**
 * STORYBOOK EXPORT
 */
export default {
  title: 'With Router Guards',
}

const AuthGuardTemplate = () => ({
  components: { 'RouterViewWrapper': routerViewWrapper },
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Auth Router Guard">
      <router-view />
    </RouterViewWrapper>
  `
})

export const PerRouteGuard = AuthGuardTemplate.bind({})
PerRouteGuard.decorators = [
  vueRouter(
    [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/dash',
        name: 'dash',
        component: Dash,
        meta: { authRequired: true },
        /* add route specific beforeEnter guard */
        beforeEnter: Auth().routerGuard
      }
    ], {
      initialRoute: '/login'
    }
  )
]

export const GlobalGuard = AuthGuardTemplate.bind({})
GlobalGuard.decorators = [
  vueRouter(
    [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/dash',
        name: 'dash',
        component: Dash,
        meta: { authRequired: true },
      }
    ],
    {
      initialRoute: '/login',
      /* add global beforeEach guard */
      beforeEach: Auth().routerGuard
    }
  )
]
