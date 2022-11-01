# Installation

::: warning
This library is not compatible with **VueJS 2** and **NuxtJS 2**
:::

## VueJS

1. Add `@zoom-avant/vue` to your project

```shell
npm i -D @zoom-avant/vue

# yarn
yarn add -D @zoom-avant/vue

# pnpm
pnpm add -D @zoom-avant/vue
```

## Nuxt

1. Add `@zoom-avant/nuxt` to your project

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
