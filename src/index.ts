if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

import vueRouter from './withVueRouter'

// make it work with --isolatedModules
export default vueRouter;
