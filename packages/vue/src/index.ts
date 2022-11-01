import.meta.glob(['./assets/css/*.css', '!./assets/css/theme.css'], {
  eager: true
})

import ZAvant from './components/ZAvant.vue'
import ZAvantMenu from './components/ZAvantMenu.vue'
import ZAvantMenuItem from './components/ZAvantMenuItem.vue'

export { ZAvant, ZAvantMenu, ZAvantMenuItem }
