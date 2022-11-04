# Zoom Avant

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
import { ZAvant, ZAvantMenu, ZAvantMenuItem } from '@zoom-avant/vue'
import '@zoom-avant/vue/css'
</script>

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
```
