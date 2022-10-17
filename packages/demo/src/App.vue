<script setup lang="ts">
import ZAvant from './../../vue/src/components/ZAvant.vue'
import ZAvantMenu from './../../vue/src/components/ZAvantMenu.vue'
import ZAvantMenuItem from './../../vue/src/components/ZAvantMenuItem.vue'
</script>

<template>
  <ZAvant :dynamic-height="true">
    <ZAvantMenuItem>
      <ZAvantMenu name="Hello world">
        <ZAvantMenuItem>Hello</ZAvantMenuItem>
        <ZAvantMenuItem>world</ZAvantMenuItem>
        <ZAvantMenuItem>Bonjour</ZAvantMenuItem>
        <ZAvantMenuItem>
          <ZAvantMenu>
            <template #button>
              <span> le monde </span>
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
      <a href="#"> Bonjour le monde </a>
    </ZAvantMenuItem>
  </ZAvant>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.zavant > .zavant__menu {
  margin: 16px 0;
}
</style>
