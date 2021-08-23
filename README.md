# Storybook Vue 3 Router

Integration of Vue 3 and Vue Router v4 in Storybook stories.

You will need to use this plugin if you wish to include stories for any component using Vue Router v4+ `<router-view>` and `<router-link>`

![Storybook with Vue 3 Router Integration](https://github.com/NickMcBurney/storybook-vue-router/blob/main/storybook-vue-router.gif?raw=true)

## Install
`npm install storybook-vue3-router`

## Usage
After installing you can import the Storybook decorator and start working with components using Vue Router v4+
```ts
/* import `action` to log router changes (this can be used by this addon to log router events) */
import { action } from '@storybook/addon-actions';

/* import Storybook addon (decorator for Vue Router) */
import vueRouter from 'storybook-addon-vue-router'

/* component you're writing story for */
import myRouterWrapperComponent from './myRouterWrapperComponent.vue'

/* your component defaults */
export default {
  title: 'Components/Vue Router View Wrapper',
  component: myRouterWrapperComponent,
}

/* your component story */
const Template = (args: Record<string, unknown>) => ({
  components: { 'MyRouterWrapper': myRouterWrapperComponent },
  setup () {
    return { args }
  },
  template: `<MyRouterWrapper />`
})
/* youur story export */
export const Default = Template.bind({})

/* adding custom decorator to allow use of `<router-view>` and Vue Router 4+ */
Default.decorators = [
  vueRouter(null, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]
```

The example above uses:
```ts
Default.decorators = [
  vueRouter(null, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]
```

Which will:
- Use this packages default routes (`/` and `/about` routes, with `<router-link>` for each route)
- Add a Storybook action to log the route changes

### Pass custom routes
You can pass custom router setup by including (or importing into your `.stories.` file) and passing this as the first parametor within the `vueRouter` decorator:

```ts
const customRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent // this would need to be imported into the `.stories` file
  },
  {
    path: '/about',
    name: 'about',
    component: AboutComponent // this would need to be imported into the `.stories` file
  }
  {
    /* ... other routes ... */
  }
]

/* ... other story setup ... */
Default.decorators = [
  vueRouter(customRoutes, (to, from) => action('ROUTE CHANGED')({ to: to, from: from }))
]
```

### Optional Action
The second parameter for `vueRouter` is a function which is ran on Vue Routers `beforeEach` route guard.

In our examples we're using this to log an action event to the Storybook UI.

This parametor is optional.