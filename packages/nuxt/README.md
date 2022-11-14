# Zoom Avant / Nuxt

> Currently in _alpha_

**Zoom Avant** (pronounced /zum a.vɑ̃/) is a drilldown component for VueJS 3.

> This module is not compatible with NuxtJS 2

## Install

```
npm i -D @zoom-avant/nuxt

# yarn
yarn add -D @zoom-avant/nuxt

# pnpm
pnpm add -D @zoom-avant/nuxt
```

## Usage

Add the `@zoom-avant/nuxt` module in your `nuxt.config.ts` file.

The module will uses features from Nuxt3 to auto import the components and the css styles for you.

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
    <ZAvantItem>
      <ZAvantMenu next="Next 1">
        <ZAvantItem>Hello</ZAvantItem>
        <ZAvantItem>world</ZAvantItem>
        <ZAvantItem>Bonjour</ZAvantItem>
      </ZAvantMenu>
    </ZAvantItem>
    <ZAvantItem>
      <ZAvantMenu next="Next 2">
        <ZAvantItem>Cheese</ZAvantItem>
        <ZAvantItem>Fromage</ZAvantItem>
        <ZAvantItem>Brie</ZAvantItem>
        <ZAvantItem>
          <ZAvantMenu>
            <template #next>
              <span>Bonjour le monde</span>
            </template>
            <template #back>
              <span>Retour</span>
            </template>
            <template #default>
              <ZAvantItem>
                <a href="#">Hello</a>
              </ZAvantItem>
              <ZAvantItem>
                <a href="#">world</a>
              </ZAvantItem>
            </template>
          </ZAvantMenu>
        </ZAvantItem>
      </ZAvantMenu>
    </ZAvantItem>
    <ZAvantItem>
      <a href="#">Bonjour le monde</a>
    </ZAvantItem>
  </ZAvant>
</template>
```
