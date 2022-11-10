# Nuxt

**Zoom Avant** has an integration for Nuxt 3, allowing you to load automatically [styles](/guide/styles) and components for quick and fast integration in your web apps/sites.

## Installation

See [Nuxt](/guide/#nuxt) installation chapter.

## Configuration

The default configuration for `@zoom-avant/nuxt` loads the components and all the styles.

```ts{2}
export default defineNuxtConfig({
  modules: ['@zoom-avant/nuxt']
})
```

You can customize the styles Nuxt will load for you in the `zavant` object.

```ts{3-5}
export default defineNuxtConfig({
  modules: ['@zoom-avant/nuxt'],
  zavant: {
    styles: ['base', 'animation']
  }
})
```

Refer to the [Styles](/guide/styles) chapter to see all the styles parts available.
