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
