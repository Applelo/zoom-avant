---
title: Demo
layout: false
---

<a href="/" class="back">Go back to the documentation</a>

This is a demo of ZoomAvant with all props/slots. It uses custom [styles](/guide/styles.html) and also it is [Control programatically](/usage.html#control-programatically) thanks to `v-model`.
<br>

You can check on StackBlitz a lighter demo for [Vue](https://stackblitz.com/edit/playground-zavant-vue?file=src/App.vue) and [Nuxt](https://stackblitz.com/edit/playground-zavant-nuxt?file=nuxt.config.ts).

<script setup>
import {ZAvant, ZAvantMenu, ZAvantItem} from '@zoom-avant/vue'
import {ref} from 'vue'

const model = ref()
</script>

<style lang="scss">
@import '@zoom-avant/vue/css/base';
@import '@zoom-avant/vue/css/animation';

body {
  padding: 2rem;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.demo {
  margin: 2rem 0;
}

.demo__zavant {
  background-color: rgba(72, 49, 212, 0.25);
  padding: 1rem;
  max-width: 300px;
  margin: 1rem 0;

  a {
    font-weight: 400;
  }
}

.zavant__item + .zavant__item {
  margin-top: .75rem;
}

a {
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: color 0.25s;

  &:hover {
    color: var(--vp-c-brand-dark);
  }
}

.zavant__next,
.zavant__back {
  text-decoration: underline;

   &:hover {
    text-decoration: none;
  }
}

button, a {
  font-size: 1rem;
}

button:not([class]) {
  background-color: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  padding: .25rem .5rem;
  margin: .5rem 0;
}

.back {
  display:block;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
  margin-bottom: 2rem;

  &:hover {
    color: var(--vp-c-brand);
  }
}
</style>

<div class="demo">
    <p>Path of the v-model : {{ model }}</p>
    <div class="demo__zavant">
      <ZAvant :dynamic-height="true" v-model="model">
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
    </div>
    <p>
      <button @click="model.pop()">Back button outside</button>
    </p>
    <p>
      <button @click="model = [2, 1]">Go to [2, 1]</button>
    </p>
  </div>
