import { defineNuxtModule, addComponent } from '@nuxt/kit'

type ModuleOptionsStyles = 'base' | 'animation' | 'theme'

export interface ModuleOptions {
  styles?: ModuleOptionsStyles[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@zoom-avant/nuxt',
    configKey: 'zavant',
    compatibility: { nuxt: '>=3.0.0' }
  },
  defaults: {
    styles: []
  },
  setup(options, nuxt) {
    if (options.styles && options.styles.length) {
      for (let index = 0; index < options.styles.length; index++) {
        const style = options.styles[index]
        nuxt.options.css.push(`@zoom-avant/vue/css/${style}`)
      }
    } else {
      nuxt.options.css.push('@zoom-avant/vue/css')
    }

    ;['ZAvant', 'ZAvantMenu', 'ZAvantItem'].forEach(comp => {
      addComponent({
        name: comp,
        filePath: '@zoom-avant/vue',
        export: comp
      })
    })
  }
})
