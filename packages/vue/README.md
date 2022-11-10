# Zoom Avant / Vue

> Currently in _alpha_

**Zoom Avant** (pronounced /zum a.vɑ̃/) is a drilldown component for VueJS 3.

> This module is not compatible with VueJS 2

## Install

```
npm i -D @zoom-avant/vue

# yarn
yarn add -D @zoom-avant/vue

# pnpm
pnpm add -D @zoom-avant/vue
```

## Usage

```vue
<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantItem } from '@zoom-avant/vue'
import '@zoom-avant/vue/css'
</script>

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
