if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

import vueRouter from './withVueRouter'
import mockRouter from './withMockRouter'
// make it work with --isolatedModules
export default vueRouter;
export { mockRouter }
