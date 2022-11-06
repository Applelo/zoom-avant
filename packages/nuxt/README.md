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
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 1">
        <ZAvantMenuItem>Hello</ZAvantMenuItem>
        <ZAvantMenuItem>world</ZAvantMenuItem>
        <ZAvantMenuItem>Bonjour</ZAvantMenuItem>
      </ZAvantMenu>
    </ZAvantMenuItem>
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 2">
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
