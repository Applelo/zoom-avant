# Zoom Avant

**Zoom Avant** (pronounced /zum a.vɑ̃/) is a drilldown component for VueJS 3.

> This module is not compatible with VueJS 2 and NuxtJS 2

## Features

- 🚀 Simple and efficient using modern API
- ✨ Customizable to meet every need
- 🖖 Accessible : respect W3C WAI Aria Menu pattern

## Install

For **VueJS 3**

```
npm i -D @zoom-avant/vue

# yarn
yarn add -D @zoom-avant/vue

# pnpm
pnpm add -D @zoom-avant/vue
```

For **Nuxt 3**

```
npm i -D @zoom-avant/nuxt

# yarn
yarn add -D @zoom-avant/nuxt

# pnpm
pnpm add -D @zoom-avant/nuxt
```

## Usage

For **VueJS 3**, import all the components and css styles.

```vue
<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantMenuItem } from '@zoom-avant/vue'
import '@zoom-avant/vue/css'
</script>
```

For **Nuxt 3**, just add the `@zoom-avant/nuxt` module in your `nuxt.config.ts`.

```ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@zoom-avant/nuxt']
})
```

In your template, add the ZoomAvant structure :

```vue
<template>
  <ZAvant :dynamic-height="true">
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 1">
        <ZAvantMenuItem>Hello</ZAvantMenuItem>
        <ZAvantMenuItem>world</ZAvantMenuItem>
        <ZAvantMenuItem>Bonjour</ZAvantMenuItem>
      </ZAvantMenu>
    </ZAvantMenuItem>
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 2" back="Next 2">
        <ZAvantMenuItem>Cheese</ZAvantMenuItem>
        <ZAvantMenuItem>Fromage</ZAvantMenuItem>
        <ZAvantMenuItem>Brie</ZAvantMenuItem>
        <ZAvantMenuItem>
          <ZAvantMenu>
            <template #next>
              <span>Bonjour le monde</span>
            </template>
            <template #back>
              <span>Retour</span>
            </template>
            <template #default>
              <ZAvantMenuItem>
                <a href="#">Hello</a>
              </ZAvantMenuItem>
              <ZAvantMenuItem>
                <a href="#">world</a>
              </ZAvantMenuItem>
            </template>
          </ZAvantMenu>
        </ZAvantMenuItem>
      </ZAvantMenu>
    </ZAvantMenuItem>
    <ZAvantMenuItem>
      <a href="#">Bonjour le monde</a>
    </ZAvantMenuItem>
  </ZAvant>
</template>
```

<!-- For more information, consult the documentation. -->
