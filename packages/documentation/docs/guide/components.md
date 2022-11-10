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

::: details **next**
Set the button next inner HTML. It will override the next props for this item.

```vue-html
<ZAvantMenu>
  <template #next>
    Next <span>➡️</span>
  </template>
  <template #default>
    <!--My menu items-->
  </template>
</ZAvantMenu>
```

:::

::: details **back**
Set the button back inner HTML. It will override the back global options and back props for this item.

```vue-html
<ZAvantMenu>
  <template #back>
    <span>⬅️</span> Back
  </template>
  <template #default>
    <!--My menu items-->
  </template>
</ZAvantMenu>
```

:::

## ZAvantItem

Nothing special here, just a component to generate the `<li class="zavant__item"></li>` element.

```vue-html
<ZAvantItem>
  Hello
  <span>World</span>
</ZAvantItem>
```
