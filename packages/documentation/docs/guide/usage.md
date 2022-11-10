# Usage

**Zoom Avant** is really simple to use. But if you want more control, you can access to differents `slots` and `props` to cover all your needs.

## Basic

This example cover the basic of **Zoom Avant**. The [ZAvant](/guide/components.html#zavant) component is the root element. After that you can build with [ZAvantItem](/guide/components.html#zavantmenuitem) and put on it your links or a submenu with [ZAvantMenu](/guide/components.html#zavantmenu)

```vue-html
<template>
  <ZAvant>
    <ZAvantItem>
      <ZAvantMenu next="Go to level 1" back="Back to root">
        <ZAvantItem>Hello</ZAvantItem>
        <ZAvantItem>world</ZAvantItem>
        <ZAvantItem>
          <ZAvantMenu next="Go to level 2" back="Back to level 1">
            <ZAvantItem>Hello</ZAvantItem>
            <ZAvantItem>world</ZAvantItem>
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

## Advanced

This exemple is more complexe using props and slots. You can check the [components](/guide/components) page for more information.

```vue-html
<template>
  <ZAvant :dynamic-height="true">
    <ZAvantItem>
      <ZAvantMenu next="Item 0 1">
        <ZAvantItem>Item 1 1</ZAvantItem>
        <ZAvantItem>Item 1 2</ZAvantItem>
        <ZAvantItem>Item 1 3</ZAvantItem>
      </ZAvantMenu>
    </ZAvantItem>
    <ZAvantItem>
      <ZAvantMenu next="Item 0 2" back="Back to root">
        <ZAvantItem>Item 2 1</ZAvantItem>
        <ZAvantItem>Item 2 2</ZAvantItem>
        <ZAvantItem>Item 2 2</ZAvantItem>
        <ZAvantItem>
          <ZAvantMenu>
            <template #next>
              <span>Item 2 3</span>
            </template>
            <template #back>
              <span>Back to 1</span>
            </template>
            <template #default>
              <ZAvantItem>
                <a href="#">Item 2 4</a>
              </ZAvantItem>
              <ZAvantItem>
                <a href="#">Item 2 5</a>
              </ZAvantItem>
            </template>
          </ZAvantMenu>
        </ZAvantItem>
      </ZAvantMenu>
    </ZAvantItem>
    <ZAvantItem>
      <a href="#">Item 0 3</a>
    </ZAvantItem>
  </ZAvant>
</template>
```
