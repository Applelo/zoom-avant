<script lang="ts" setup>
import { onMounted, ref, provide, onBeforeUnmount } from 'vue'
import ZAvantProvider from '@/zavant'

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

const root = ref<HTMLDivElement | null>(null)
onMounted(() => {
  ZAvant.init(root)
})

onBeforeUnmount(() => {
  ZAvant.destroy()
})
</script>

<template>
  <div
    class="zavant"
    ref="root"
    :class="ZAvant.rootClass"
    :style="ZAvant.rootStyle"
  >
    <ul
      class="zavant__menu zavant__menu--wrapper"
      role="menubar"
      :style="ZAvant.wrapperStyle"
      aria-multiselectable="false"
      aria-orientation="vertical"
    >
      <slot />
    </ul>
  </div>
</template>
