import type {
  Router,
  RouteRecordRaw,
  NavigationGuard,
  RouteLocationRaw,
  RouteRecordNormalized
} from 'vue-router'

export function globalRouterGuardFn(
  router: Router,
  beforeEach?: NavigationGuard,
  forceReload = false
): void {
  if (typeof beforeEach === 'function') {
    /**
     * force reload in order to reset router and apply global beforeEach()
     * this is only required if the router has been initialized previously
     * TODO: can this be made less hacky?
     */
    if (forceReload) {
      router.go(0)
      return
    }
    // add `beforeEach` param on `router.beforeEach` and pass `to`, `from` and `next()` params to the function
    router.beforeEach((to, from, next) => beforeEach(to, from, next))
  }
}

export function initialRoute(router: Router, initialRoute: RouteLocationRaw): void {
  router.replace(initialRoute || '/')
}

export function resetRoutes(router: Router, newRoutes: RouteRecordRaw[]): void {
  const oldRoutes: Array<RouteRecordNormalized> = router.getRoutes()
  /* remove previously generated routes */
  oldRoutes.forEach((route) => {
    router.removeRoute(route.name)
  })
  /* add new story routes */
  newRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

type argObjectKeys = Record<string, unknown>
export type ArgsArrayOrObject = Array<string> | { [key: string]: string }
export function getFromArgs(args: argObjectKeys, options: ArgsArrayOrObject): argObjectKeys {
  let filtered: argObjectKeys = {}
  if (Array.isArray(options)) {
    options.forEach((option) => {
      filtered = { ...filtered, [option]: args[option] }
    })
  } else if (typeof options === 'object' && options !== null) {
    Object.keys(options).forEach((option) => {
      filtered = { ...filtered, [option]: options[option] }
    })
  } else {
    filtered = { ...filtered }
  }
  return filtered
}