# Styles

**Zoom Avant** respect the [BEM](https://getbem.com/) methodology.

This is all the styles available with **ZoomAvant**

- `@zoom-avant/vue/css`: all styles below compiled in one file
- `@zoom-avant/vue/css/base`: the base of ZoomAvant to make it work
- `@zoom-avant/vue/css/animation`: animation on drill and on height change
- `@zoom-avant/vue/css/theme`: a simple drilldown theme with css chevron for back and next button

::: warning
Only the main css files is compiled and minified. The other parts are not. You need to processed it with your tool.
:::

You can import it with `@import '@zoom-avant/vue/css'` directly in your CSS or `import '@zoom-avant/vue/css'` in js file.

It will work on modern building tools, like ViteJS and Webpack 5, which support package imports.

::: info
If your tool doesn't support package import feature, you can import css file directly :

- `@zoom-avant/vue/dist/style.css`
- `@zoom-avant/vue/dist/css/base.css`
- `@zoom-avant/vue/dist/css/animation.css`
- `@zoom-avant/vue/dist/css/theme.css`
  :::
