import { defineNuxtModule, addComponent } from '@nuxt/kit'

type ModuleOptionsCSS = 'base' | 'animation' | 'theme'

export interface ModuleOptions {
  css: ModuleOptionsCSS[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@zoom-avant/nuxt',
    configKey: 'zavant'
    // compatibility: { nuxt: '^3.0.0' || '^3.0.0-rc.13' }
  },
  defaults: {
    css: []
  },
  setup(options, nuxt) {
    if (options.css.length) {
      for (let index = 0; index < options.css.length; index++) {
        const part = options.css[index]
        nuxt.options.css.push(`@zoom-avant/vue/css/${part}`)
      }
    } else {
      nuxt.options.css.push('@zoom-avant/vue/css')
    }

    // prettier-ignore
    ['ZAvant', 'ZAvantMenu', 'ZAvantMenuItem'].forEach(comp => {
      addComponent({
        name: comp,
        filePath: '@zoom-avant/vue',
        export: comp
      })
    })
  }
})
