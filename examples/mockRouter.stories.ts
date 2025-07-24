import { mockRouter } from '../dist'

export default {
  title: 'Mock Router',
  args: {
    path: '/',
    some_meta: 'true',
    some_param: 'false',
    some_query: 'false'
  },
  argTypes: {
    path: {
      control: 'text',
    },
    some_meta: {
      control: 'select',
      options: ['true', 'false'],
    },
    some_param: {
      control: 'select',
      options: ['true', 'false'],
    },
    some_query: {
      control: 'select',
      options: ['true', 'false'],
    },
  }
};

export const Default = () => ({
  args: {
    path: '/'
  },
  /* create template and pass Storybook args to <router-view> using props */
  template: `
    <div class="my-wrapper">
      <div>
        <h2>$route:</h2>
        <pre>&lt;pre&gt;&#123;&#123;&nbsp;&sect;route&nbsp;&#125;&#125;&lt;/pre&gt;</pre>
        <pre>{{ $route }}</pre>
      </div>
    </div>
  `
})

Default.decorators = [
  mockRouter({
    meta: ['some_meta'],
    params: ['some_param'],
    query: ['some_query']
  })
]

export const ParamsObject = () => ({
  args: {
    path: '/'
  },
  /* create template and pass Storybook args to <router-view> using props */
  template: `
    <div class="my-wrapper">
      <div>
        <h2>$route:</h2>
        <pre>&lt;pre&gt;&#123;&#123;&nbsp;&sect;route&nbsp;&#125;&#125;&lt;/pre&gt;</pre>
        <pre>{{ $route }}</pre>
      </div>
    </div>
  `
})

ParamsObject.decorators = [
  mockRouter({
    meta: { some: 'meta' },
    params:{ "type": "custom", "projectId": "1", "tab": "products", "vProduct": "1" },
    query: { 'some': 'query' }
  })
]

export const DynamicTemplate = () => ({
  /* create template and pass Storybook args to <router-view> using props */
  template: `
    <div class="my-wrapper">
      <div>
        <h3 style="margin-top: 2em">Example dynamic template from <code>$route.meta.some_meta</code></h3>
        
        <template v-if="$route.meta.some_meta === 'true'">
          <code>some_meta</code> is true!
        </template>
        <template v-else>
          <code>some_meta</code> is not true!
        </template>
      </div>
    </div>
  `
})

DynamicTemplate.decorators = [
  mockRouter({
    meta: ['some_meta'],
    params: ['some_param'],
    query: ['some_query']
  })
]

export const ProgramaticNavigation = () => ({
  /* create template and pass Storybook args to <router-view> using props */
  template: `
    <div class="my-wrapper">
      <div>
        <button @click="$router.push('/some-route')" style="margin-bottom: 1em">Push</button><br/>
        <button @click="$router.replace('/some-route')" style="margin-bottom: 1em">Replace</button><br/>
        <button @click="$router.go(1)" style="margin-bottom: 1em">Go</button><br/>
        <button @click="$router.back()" style="margin-bottom: 1em">Back</button><br/>
        <button @click="$router.forward()">Forward</button>
      </div>
    </div>
  `
})

ProgramaticNavigation.decorators = [
  mockRouter({
    meta: ['some_meta'],
    params: ['some_param'],
    query: ['some_query']
  })
]