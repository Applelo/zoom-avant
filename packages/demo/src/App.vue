<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantMenuItem } from './../../vue/src/index'
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
            <template #back>
              <span>Retour</span>
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
.zavant {
  margin: 16px 0;
  border: 1px solid black;
}

.zavant__item {
  padding: 8px 0;
}
</style>
