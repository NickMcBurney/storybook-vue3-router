import { computed } from 'vue'
import { useRouter } from "vue-router";

import vueRouter from '../dist/esm'

import routerViewWrapper from './components/routerViewWrapper.vue'

/**
 * COMPONENT TEMPLATES
 */
const Page1 = {
  props: {
    routerLinkParam: String
  },
  setup (props) {
    const router = useRouter()
    const routerLinkPath = computed(() => {
      return `/page-2?value=${props.routerLinkParam || ''}`
    })
    const routerQueryParams = computed(() => router.currentRoute.value.query)

    return { routerLinkPath, routerQueryParams }
  },
  template: `
    <div>
      <h2>Page 1</h2>

      <p><strong>Router Query Parameters</strong> {{ routerQueryParams }}</p>

      <div style="display: flex; gap: 1em">
        <router-link :to="routerLinkPath">Page 2</router-link>
      </div>
    </div>
  `
};

const Page2 = {
  props: {
    routerLinkParam: String
  },
  setup (props) {
    const router = useRouter()
    const routerLinkPath = computed(() => {
      return `/page-1?value=${props.routerLinkParam || ''}`
    })
    const routerQueryParams = computed(() => router.currentRoute.value.query)

    return { routerLinkPath, routerQueryParams }
  },
  template: `
    <div>
      <h2>Page 2</h2>

      <p><strong>Router Query Parameters</strong> {{ routerQueryParams }}</p>

      <div style="display: flex; gap: 1em">
        <router-link :to="routerLinkPath">Page 1</router-link>
      </div>
    </div>
  `
};

/**
 * STORYBOOK EXPORT
 */
export default {
  title: 'With Args',
}

/* Create story with StoryBook Args */
const withArgs = (args) => ({
  setup () {
    /* make `args` available within template */
    return { args }
  },
  components: { 'RouterViewWrapper': routerViewWrapper },
  /* create template and pass Storybook args to <router-view> using props */
  template: `
    <RouterViewWrapper title="Storybook Vue 3 Router with Storybook Args">
      <router-view
        :router-link-param="args.routerLinkParam"
      />
    </RouterViewWrapper>
  `
})

export const Default = withArgs.bind({})
/* args are passed to route component via <router-view> props */
Default.args = {
  routerLinkParam: 'some-url-parameter',
}
Default.decorators = [
  vueRouter(
    [
      {
        path: '/page-1',
        name: 'page-1',
        component: Page1
      },
      {
        path: '/page-2',
        name: 'page-2',
        component: Page2,
      }
    ], {
      initialRoute: '/page-1'
    }
  )
]