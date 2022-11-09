# Components

This page details the three components which compose the **Zoom Avant**.

You need to know about VueJS 3 [props](https://vuejs.org/guide/components/props.html) and [slots](https://vuejs.org/guide/components/slots.html).

## ZAvant

This is the root element of the drilldown.

**Props**

::: details **dynamicHeight**
Change the height dynamically. If false, it will take the bigger menu height.

Type: `boolean`<br/>
Default: `false`

```vue-html
<ZAvant :dynamic-height="true"></ZAvant>
```

:::

::: details **back**
Set all the button back text.

Type: `string`<br/>
Default: `Back`

```vue-html
<ZAvant back="Précédent"></ZAvant>
```

:::

## ZAvantMenu

**Props**

::: details **next**
Set the button next text.

Type: `string`<br/>
Default: `Next`

```vue-html
<ZAvantMenu next="Next 1 level"></ZAvantMenu>
```

:::

::: details **back**
Set the button back text.

Type: `string`<br/>
Default: `Back`

```vue-html
<ZAvantMenu back="Previous 1 level"></ZAvantMenu>
```

:::

**Slots**

- `next`
- `back`

## ZAvantMenuItem

Nothing special here, just a component to generate the `<li class="zavant__item"></li>` element.

```vue-html
<ZAvantMenuItem>
  Hello
  <span>World</span>
</ZAvantMenuItem>
```
