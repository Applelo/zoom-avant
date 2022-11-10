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

```vue-html
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
      <ZAvantMenu next="Next 2" back="Back 2">
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

For more about options (props and slots) available, you can check the [components](/guide/components) page.
