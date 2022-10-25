<script setup lang="ts">
import { ZAvant, ZAvantMenu, ZAvantMenuItem } from './../../vue/src/index'
</script>

<template>
  <p>Dynamic Height enable</p>
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
  <hr />
  <p>Dynamic Height disable (default)</p>
  <ZAvant>
    <ZAvantMenuItem>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
      eligendi architecto provident rem dolores praesentium, ipsam repudiandae
      reiciendis quia sit in inventore iste distinctio cumque magni, minus
      facilis at rerum.
    </ZAvantMenuItem>
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
  </ZAvant>
</template>

<style>
body {
  margin: 16px;
  font-family: Arial, Helvetica, sans-serif;
}

hr {
  margin: 64px 0;
}

.zavant {
  border: 1px solid black;
}

.zavant__item {
  padding: 8px 0;
}
</style>
