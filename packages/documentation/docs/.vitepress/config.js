import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Zoom Avant',
  description: 'A drilldown component for VueJS',
  themeConfig: {
    footer: {
      message: 'Released under the GPL3 License.'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Applelo/zoom-avant' }
    ],
    // TODO: After docs publish, apply for https://docsearch.algolia.com/
    // algolia: {
    //   indexName: 'zavant',
    //   appId: '',
    //   apiKey: ''
    // },
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting started', link: '/guide/' },
            { text: 'Usage', link: '/guide/usage' },
            { text: 'Components', link: '/guide/components' },
            { text: 'Styles', link: '/guide/styles' },
            { text: 'Nuxt', link: '/guide/nuxt' },
            { text: 'Accessibility', link: '/guide/accessibility' }
          ]
        }
      ]
    }
  }
})
