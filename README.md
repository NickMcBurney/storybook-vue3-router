# Storybook Vue3 Router

[![minified + gzip size](https://badgen.net/bundlephobia/minzip/storybook-vue3-router)](https://bundlephobia.com/package/storybook-vue3-router)
[![Npm package monthly downloads](https://badgen.net/npm/dm/storybook-vue3-router)](https://www.npmjs.com/package/storybook-vue3-router)
[![Release](https://github.com/NickMcBurney/storybook-vue3-router/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/NickMcBurney/storybook-vue3-router/actions/workflows/release.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/nickmcburney/storybook-vue3-router/badge)](https://www.codefactor.io/repository/github/nickmcburney/storybook-vue3-router)
[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org/addons/storybook-vue3-router/)

A Storybook decorator that allows you to use your Vue 3 routing-aware components.

If you want to build stories for Vue 3 components using `<router-view>` or `<router-link>` then you need to wrap your stories with `vue-router` this addon will allow for you to easily do this.

There is also a [mocked router decorator](#mock-router) option for users who only need access to `$route` and `$router` properties.

## How to use
This decorator works with Storybook's [Component Story Format (CSF)](https://storybook.js.org/docs/vue/api/csf) and [hoisted CSF annotations](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations), which is the recommended way to write stories since Storybook 6. It has not been tested with the [storiesOf API](https://github.com/storybookjs/storybook/blob/master/lib/core/docs/storiesOf.md).

### Storybook v6: Please use package version 2.x
### Storybook v7: Please use package version 3+
### Storybook v8: Please use package version 5.1.x
### Storybook v9: Please use package version 6.x

See [migration guides](#v2x--v3x-migration).

### Install the decorator

```node
npm install --save-dev storybook-vue3-router
// or
yarn add --dev storybook-vue3-router
```

### Use in your stories
The default setup will create a `vue-router` instance, with 2 routes (`/` and `/about`) - these can be reviewed in the [defaultRoutes.ts](https://github.com/NickMcBurney/storybook-vue3-router/blob/main/src/defaultRoutes.ts) file.

```typescript
/* import storybook-vue3-router */
import { vueRouter } from 'storybook-vue3-router'

/* ...story setup... */

/* your story export */
export const Default = Template.bind({})

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* this is the basic setup with no params passed to the decorator */
  vueRouter()
]
```

## Demo
You can see [the examples stories](https://github.com/NickMcBurney/storybook-vue3-router/tree/main/examples) published on this [demo](https://storybook-vue3-router.netlify.app/).

## Advanced usage
This decorator comes with optional params for customising the implementation of your `vue-router` within Storybook.

### Custom Routes
```typescript
/* define our custom routes */
const customRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent // this would need to be defined/imported into the `.stories` file
  },
  {
    path: '/about',
    name: 'about',
    component: AboutComponent // this would need to be defined/imported into the `.stories` file
  }
]

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* pass custom routes to the decorator */
  vueRouter(customRoutes)
]
```

### Custom Routes (with guards)
```typescript
/* define our custom routes */
const customRoutes = [
  // ...
  {
    path: '/admin',
    name: 'admin',
    component: AdminComponent,
    /* add per-route navigation guard */
    beforeEnter: (to, from, next) => {
      // ...
    }
  }
]

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* pass custom routes to the decorator */
  vueRouter(customRoutes)
]
```

### Custom Routes (with initial route)
By default the decorator will default the starting route to `/`, if you want to change this you can pass as a paramtor to the decorator

```typescript
/* define our custom routes */
const customRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/intro',
    name: 'intro',
    component: Intro
  }
]

### With Router Options
We can pass [Vue Router options](https://router.vuejs.org/api/index.html#history) into our decorator.

```typescript
/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* pass vueRouterOptions to the decorator */
  vueRouter(undefined, {
    vueRouterOptions: {
      linkActiveClass: 'my-active-class',
      linkExactActiveClass: 'my-exact-active-class'
      ...etc
    }
  })
]
```

## `router.isReady()`
If you have a router setup using `router.isReady()` and / or you have components which require specific route / route data on created lifecycle hook you may need to use the `asyncVueRouter` export.

This export provides router which won't render story until router is ready.

### Story setup
```typescript
import { asyncVueRouter } from 'storybook-vue3-router'

/* define our custom routes */
const customRoutes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/intro',
    name: 'intro',
    component: Intro
  }
]

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* pass initialRoute to the decorator */
  asyncVueRouter(customRoutes, {
    initialRoute: '/intro'
  })
]
```

### Preview.js Async Setup
In order to use `async` router setup method, you will need to amend your .storybook/preview.js file to wrap stories in Vue 3's `<Suspense>` component. This is because the decorator requires an `async setup()` to correctly `await router.isReady()`. You can modify preview to:
```typescript
const preview = {
  decorators: [
    (story) => ({
      components: { story },
      template: '<Suspense><story /></Suspense>',
    }),
  ],
};

export default preview;
```

See [the examples folder](https://github.com/NickMcBurney/storybook-vue3-router/tree/main/examples) for more advanced usage.

### Decorator Parameters
```typescript

function vueRouter(routes: RouteRecordRaw[], options?: { initialRoute?: string, beforeEach?: NavigationGuard, vueRouterOptions?: RouterOptions })
function asyncVueRouter(routes: RouteRecordRaw[], options?: { initialRoute?: string, beforeEach?: NavigationGuard, vueRouterOptions?: RouterOptions })
```

## Mock Router
The full `vue-router` is not always needed - for example if you don't have components using `<router-view>` or `<router-link>` then using the `mockRouter` export may cover your needs (and reduce the imports being used in your stories).

Note: `mockRouter` will only work in instances where you are using options API `this.$route` and/or `this.$router`, it is not suitable for use-cases using vue router composables such as `useRoute()` and `useRouter()`.

### Use `mockRouter` in your stories
The default setup will create mock `$router` and `$route` from `vue-router`, this allows you to create stories for components using programatic navigation and route based logic.

We can also pass custom options into the `mockRouter` decorator:
```typescript
{ 
  meta?: Array<string>, 
  params?: Array<string>, 
  query?: Array<string>
}
```

```typescript
/* import storybook-vue3-router mockRouter */
import { mockRouter } from 'storybook-vue3-router'

/* ...story setup... */

/* your story export */
export const Default = Template.bind({})

/* adding storybook-vue3-router mockRouter decorator */
Default.decorators = [
  mockRouter({
    meta: ['some_meta'],
    params: ['some_param'],
    query: ['some_query']
  })
]
```

You can see examples of the `mockRouter` in our [storybook demo site](https://storybook-vue3-router.netlify.app/?path=/story/mock-router--default), and our [code examples](https://github.com/NickMcBurney/storybook-vue3-router/tree/main/examples/mockRouter.stories.ts)

## v2.x > v3+ Migration
### ⚠️ BREAKING CHANGE ⚠️

v3.x version no longer uses default export for `vueRouter` decorator, you will need to update to using named import:

```typescript
/* DONT */
import vueRouter from 'storybook-vue3-router'
/* DO */
import { vueRouter } from 'storybook-vue3-router'
```

## v1.x > v2.x Migration
The migration from v1 brings some breaking changes:

```typescript
// v1.x - 2nd param is used to pass `beforeEach` router guard
// in this example the guard is used to fire a storybook action with `to` and `from` router objects
vueRouter(customRoutes, (to, from) => action('ROUTE CHANGED')({ to: to, from: from })) // LEGACY

// v2.1 - 2nd param is used to pass additional options to the decorator
vueRouter(customRoutes, {
  /* add global beforeEach guard */
  beforeEach: (to, from) => action('ROUTE CHANGED')({ to: to, from: from })
})
```
If you were previously using v1 with router guards in the second parameter, these will need to be refactored to use the [route specific router guards](#custom-routes-with-guards) _(recommended)_ or you can pass your global route guards using the `beforeEach` option.

**_v2.0 DOES NOT HAVE THIS `beforeEach` option, please upgrade to v2.1_**

### ⚠️ Warning:

When using the global `beforeEach` option, if there is an existing story also using this decorator then we must force a page reload in order to setup the specific story router guard and this has a minor UX / performance impact. Checkout the [demo](https://storybook-vue3-router.netlify.app/) for an example of this: README > With Router Guards > Global Guard - when clicking the 'Global Guard' link you will notice the page is refreshed to apply global guards (due to previously existing stories).

This will not be an issue if you are using this decorator for just one story.

After resolving [this issue](https://github.com/NickMcBurney/storybook-vue3-router/issues/7), to enable multiple stories to be created using different route setups, it was noticed that this caused the global `beforeEach` function to be added on every route. For example every time you click a different story the new `beforeEach` hook is added - but previous ones are not removed, this results in multiple guards firing on stories unrelated to the 'active' story.

<!--There is an issue raised here to look into fixing this bug and adding `beforeEach` as an option within the options param e.g. `options?: { initialRoute?: string, beforeEach?: NavigationGuard }`-->
