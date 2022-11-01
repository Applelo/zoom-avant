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
    sidebar: {
      '/introduction/': [
        {
          text: 'Introduction',
          items: [{ text: 'Installation', link: '/introduction/installation' }]
        }
      ]
    }
  }
})
