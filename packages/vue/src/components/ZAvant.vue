<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue'
import ZAvantProvider from '../zavant'

const props = withDefaults(
  defineProps<{
    dynamicHeight?: boolean
    back?: string
  }>(),
  {
    dynamicHeight: false,
    back: 'Back'
  }
)
const ZAvant = new ZAvantProvider(props)
provide('ZAvant', ZAvant)

const menu = ref<HTMLUListElement | null>(null)
onMounted(() => {
  ZAvant.init(menu)
})
</script>

<template>
  <div class="zavant" :class="ZAvant.rootClass" :style="ZAvant.rootStyle">
    <ul
      class="zavant__wrapper"
      ref="menu"
      role="menubar"
      :style="ZAvant.wrapperStyle"
      aria-multiselectable="false"
      aria-orientation="vertical"
    >
      <slot />
    </ul>
  </div>
</template>
