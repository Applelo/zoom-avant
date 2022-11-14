<script lang="ts" setup>
import { onMounted, ref, provide, onBeforeUnmount, Ref, computed } from 'vue'
import ZAvantMain from './../zavant'

const props = withDefaults(
  defineProps<{
    dynamicHeight?: boolean
    back?: string
    modelValue?: number[]
  }>(),
  {
    dynamicHeight: false,
    back: 'Back'
  }
)

const emit = defineEmits(['update:modelValue'])
const path = computed({
  get() {
    return props.modelValue ? props.modelValue : ref<number[]>([]).value
  },
  set(value) {
    emit('update:modelValue', value ? value : ref<number[]>([]).value)
  }
})

const ZAvant = new ZAvantMain(props, path)
provide('ZAvant', ZAvant)

const root: Ref<HTMLDivElement | null> = ref(null)
onMounted(() => {
  ZAvant.init(root)
})

onBeforeUnmount(() => {
  ZAvant.destroy()
})
</script>

<template>
  <nav
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
  </nav>
</template>
