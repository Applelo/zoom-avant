<script lang="ts" setup>
import { ZAvantTree } from './../typings'
import { computed, onMounted, ref, watch } from 'vue'
import { useGlobalState } from './../store'

const state = useGlobalState()
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
state.options.value = props

const classes = computed(() => {
  return {
    'zavant--dynamic-height': props.dynamicHeight
  }
})

const menu = ref<HTMLUListElement | null>(null)
watch(state.level, () => {
  if (!menu.value) return
  menu.value.style.transform = `translateX(${(state.level.value - 1) * -100}%)`
})

watch(state.height, () => {
  if (!menu.value) return
  menu.value.style.height = `${state.height.value}px`
})

const initTree = () => {
  if (!menu.value) return

  const tree = createTree({
    height: computed(() => (menu.value ? menu.value.clientHeight : 0)),
    el: menu.value,
    children: []
  })
}

const createTree = (tree: ZAvantTree): ZAvantTree => {
  const childrenItem = tree.el.children
  const children = []
  for (let index = 0; index < childrenItem.length; index++) {
    const childItem = childrenItem[index]
    const menu = childItem.querySelector<HTMLUListElement>('.zavant__menu')

    if (!menu) continue

    children.push(
      createTree({
        height: computed(() => menu.clientHeight),
        el: menu,
        children: []
      })
    )
  }
  tree.children = children
  return tree
}

onMounted(() => {
  if (!menu.value) return
  state.height.value = menu.value.clientHeight
  initTree()
})
</script>
<template>
  <div class="zavant" :class="classes">
    <ul class="zavant__wrapper" ref="menu">
      <slot />
    </ul>
  </div>
</template>
<style>
.zavant {
  overflow: hidden;
}

.zavant__wrapper {
  margin: 0;
  list-style: none;
  padding: 0;
  will-change: transform;
  transition: 0.3s transform;
}
</style>
