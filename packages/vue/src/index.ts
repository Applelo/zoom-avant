import type { App } from 'vue'
import components from './components'

const plugin = {
  install(app: App) {
    for (const prop in components) {
      // @ts-expect-error: I want to index import using string
      const component = components[prop]
      app.component(component.name, component)
    }
  }
}

export default plugin
