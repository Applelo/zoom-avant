<script lang="ts" setup>
import { computed, onMounted, ref, unref, provide } from 'vue'
import ZAvant from '../provider'

provide('ZAvant', ZAvant)

const props = withDefaults(
  defineProps<{
    dynamicHeight?: boolean
    back?: string
  }>(),
  {
    dynamicHeight: true,
    back: 'Back'
  }
)
ZAvant.options.value = props

const menu = ref<HTMLUListElement | null>(null)

const classes = computed(() => {
  return {
    'zavant--dynamic-height': props.dynamicHeight
  }
})

const styles = computed(() => {
  const unrefCurrentEl = unref(ZAvant.state.currentEl)
  return {
    height: unrefCurrentEl ? `${unrefCurrentEl.clientHeight}px` : '',
    transform: `translateX(${unref(ZAvant.state.level) * -100}%)`
  }
})

onMounted(() => {
  ZAvant.methods.init(menu)
})
</script>
<template>
  <div class="zavant" :class="classes">
    <ul class="zavant__wrapper" :style="styles" ref="menu" role="menu">
      <slot />
    </ul>
  </div>
</template>
<style>
.zavant {
  overflow: hidden;
}

.zavant ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.zavant__wrapper {
  will-change: transform;
  transition: 0.3s transform;
}

.zavant--dynamic-height .zavant__wrapper {
  will-change: transform, height;
  transition: 0.3s transform, 0.3s height;
}
</style>
