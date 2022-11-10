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
