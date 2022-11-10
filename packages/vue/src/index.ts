import.meta.glob(['./assets/css/*.css'], {
  eager: true
})

import { App } from 'vue'
import ZAvant from './components/ZAvant.vue'
import ZAvantMenu from './components/ZAvantMenu.vue'
import ZAvantItem from './components/ZAvantItem.vue'

const ZAvantPlugin = {
  install(app: App) {
    app.component('ZAvant', ZAvant)
    app.component('ZAvantMenu', ZAvantMenu)
    app.component('ZAvantItem', ZAvantItem)
  }
}

export { ZAvant, ZAvantMenu, ZAvantItem }
export { ZAvantPlugin }
