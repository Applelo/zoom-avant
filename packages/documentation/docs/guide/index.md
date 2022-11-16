# Getting Started

## Overview

**Zoom Avant** (pronounced /zum a.vɑ̃/) is a drilldown component for [VueJS 3](https://vuejs.org/) and [Nuxt 3](https://v3.nuxtjs.org/). Why ? This was not available on the internet and I needed one for a project at my company.

::: warning
This library is not compatible with **VueJS 2** and so, **NuxtJS 2**
:::

The drilldown is inspired by the [Foundation Drilldown](https://get.foundation/sites/docs/drilldown-menu.html) (an old css/js framework if you don't know about it).

**Zoom Avant** is mainly focus to be very customizable, accessible (respect ARIA Menu pattern) and flexible to cover all the use case you need a drilldown component (especially a mobile menu).

## Browser support

**Zoom Avant** uses modern API to work like [ResizableObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver), [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or [:scope](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope) selector.

No support for IE11 is planned.

## Installation

### Vue

1. Install the library with your favorite package manager

```shell
npm i -D @zoom-avant/vue

# yarn
yarn add -D @zoom-avant/vue

# pnpm
pnpm add -D @zoom-avant/vue
```

2. Import manually the components or globally import via plugin installation

```vue
<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantItem } from '@zoom-avant/vue'
import '@zoom-avant/vue/css'
</script>
```

3. That's it, see the [usage](/guide/usage) page to continue your journey.

or

```ts
import { ZAvantPlugin } from '@zoom-avant/vue'
import { createApp } from 'vue'

const app = createApp({})

app.use(ZAvantPlugin)
```

::: warning
Don't forget to import the css styles
:::

### Nuxt

1. Install the library with your favorite package manager

```shell
npm i -D @zoom-avant/nuxt

# yarn
yarn add -D @zoom-avant/nuxt

# pnpm
pnpm add -D @zoom-avant/nuxt
```

2. In your `nuxt.config.ts`, add the `@zoom-avant/nuxt` in the `modules` array.

```ts{2}
export default defineNuxtConfig({
  modules: ['@zoom-avant/nuxt']
})
```

3. That's it, see the [usage](/guide/usage) page to continue your adventure.<br/>After that, don't forget to consult [Nuxt](/guide/nuxt) page which details the module.

## Credits

- [Foundation Drilldown](https://get.foundation/sites/docs/drilldown-menu.html)
- [Aria Pattern Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)
- [Anu](https://github.com/jd-solanki/anu) and [Pinia](https://github.com/vuejs/pinia) packages for the inspiration
