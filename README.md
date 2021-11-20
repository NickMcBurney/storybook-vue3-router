# Storybook Vue3 Router

[![minified + gzip size](https://badgen.net/bundlephobia/minzip/storybook-vue3-router)](https://bundlephobia.com/package/storybook-vue3-router)
[![Npm package monthly downloads](https://badgen.net/npm/dm/storybook-vue3-router)](https://www.npmjs.com/package/storybook-vue3-router)
[![Release](https://github.com/NickMcBurney/storybook-vue3-router/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/NickMcBurney/storybook-vue3-router/actions/workflows/release.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/nickmcburney/storybook-vue3-router/badge)](https://www.codefactor.io/repository/github/nickmcburney/storybook-vue3-router)
[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org/addons/storybook-vue3-router/)

A Storybook decorator that allows you to use your Vue 3 routing-aware components.

If you want to build stories for Vue 3 components using `<router-view>` or `<router-link>` then you need to wrap your stories with `vue-router` this addon will allow for you to easily do this.

## How to use
This decorator works with Storybook's [Component Story Format (CSF)](https://storybook.js.org/docs/vue/api/csf) and [hoisted CSF annotations](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations), which is the recommended way to write stories since Storybook 6. It has not been tested with the [storiesOf API](https://github.com/storybookjs/storybook/blob/master/lib/core/docs/storiesOf.md).

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
import vueRouter from 'storybook-vue3-router'

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
This decorator comes with optioal params for customising the implementation of your `vue-router` within Storybook.

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

### Custom Routes (with inital route)
By default the decorator will default the starting route to `/`, if you want to change this you can pass as a parametor to the decorator
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

/* adding storybook-vue3-router decorator */
Default.decorators = [
  /* pass initialRoute to the decorator */
  vueRouter(customRoutes, {
    initialRoute: '/intro'
  })
]
```

See [the examples folder](https://github.com/NickMcBurney/storybook-vue3-router/tree/main/examples) for more advanced usage.

### Decorator Parameters
```typescript

function vueRouter(routes: RouteRecordRaw[], options?: { initialRoute?: string })
```

## v2.x Migration
The migration from v1 brings some breaking changes:

```typescript
// v1.x - 2nd param is used to pass `beforeEach` router guard
// in this example the guard is used to fire a storybook action with `to` and `from` router objects
vueRouter(customRoutes, (to, from) => action('ROUTE CHANGED')({ to: to, from: from })) // LEGACY

// v2.x - 2nd param is used to pass additional options to the decorator
vueRouter(customRoutes, { initialRoute?: string })
```
If you were previously using v1 with router guards in the second parameter, these will need to be refactored to use the [route specific router guards](#custom-routes-with-guards).

**Why was `beforeEach` router guard removed from options?**

After resolving [this issue](https://github.com/NickMcBurney/storybook-vue3-router/issues/7), to enable multiple stories to be created using different route setups, it was noticed that this caused the `beforeEach` function to be added on every route. For example every time you click a different story the new `beforeEach` hook is added - but previous ones are not removed, this results in multiple guards firing on stories unrelated to the 'active' story.

<!--There is an issue raised here to look into fixing this bug and adding `beforeEach` as an option within the options param e.g. `options?: { initialRoute?: string, beforeEach?: NavigationGuard }`-->