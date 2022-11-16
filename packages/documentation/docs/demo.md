---
title: Demo
---

<script setup>
import sdk from '@stackblitz/sdk'
import {ref, onMounted} from 'vue'

const vueContainer = ref()
const nuxtContainer = ref()

onMounted(() => {
  if (!nuxtContainer.value || !vueContainer.value) return

  sdk.embedProjectId(nuxtContainer.value, 'playground-zavant-nuxt', {
    forceEmbedLayout: true,
    openFile: 'nuxt.config.ts',
    view: 'preview'
  })

  sdk.embedProjectId(vueContainer.value, 'playground-zavant-vue', {
    forceEmbedLayout: true,
    openFile: 'src/App.vue',
    view: 'preview'
  })
})
</script>

# Demo

## Vue

<div ref="vueContainer" class="stackblitz"></div>

## Nuxt 3

<div ref="nuxtContainer" class="stackblitz"></div>
