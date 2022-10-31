<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantMenuItem } from './../../vue/src/index'
</script>

<template>
  <p>Dynamic Height enable</p>
  <ZAvant :dynamic-height="true">
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 1">
        <ZAvantMenuItem>Hello</ZAvantMenuItem>
        <ZAvantMenuItem>world</ZAvantMenuItem>
        <ZAvantMenuItem>Bonjour</ZAvantMenuItem>
      </ZAvantMenu>
    </ZAvantMenuItem>
    <ZAvantMenuItem>
      <ZAvantMenu next="Next 2">
        <ZAvantMenuItem>Proute</ZAvantMenuItem>
        <ZAvantMenuItem>wioefj</ZAvantMenuItem>
        <ZAvantMenuItem>oefiwne</ZAvantMenuItem>
        <ZAvantMenuItem>
          <ZAvantMenu>
            <template #next>
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
  <hr />
  <p>Dynamic Height disable (default)</p>
  <ZAvant back="Retour">
    <ZAvantMenuItem>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
      eligendi architecto provident rem dolores praesentium, ipsam repudiandae
      reiciendis quia sit in inventore iste distinctio cumque magni, minus
      facilis at rerum.
    </ZAvantMenuItem>
    <ZAvantMenuItem>
      <ZAvantMenu>
        <template #next>
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
          <ZAvantMenuItem> Hello World </ZAvantMenuItem>
        </template>
      </ZAvantMenu>
    </ZAvantMenuItem>
  </ZAvant>
</template>

<style>
body {
  margin: 16px;
  font-family: Arial, Helvetica, sans-serif;
}

hr {
  margin: 32px 0;
}

.zavant {
  border: 1px solid black;
}

.zavant__item {
  padding: 8px;
}
</style>
