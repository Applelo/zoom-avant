<script lang="ts" setup>
import { computed, onMounted, ref, unref } from 'vue'
import type { ZAvantTree } from './../typings'
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

const styles = computed(() => {
  return {
    height: state.currentEl.value
      ? `${state.currentEl.value.clientHeight}px`
      : '',
    transform: `translateX(${unref(state.level) * -100}%)`
  }
})

const createTree = (tree: ZAvantTree): ZAvantTree => {
  const childrenItem = tree.el.children
  const children = []
  for (let index = 0; index < childrenItem.length; index++) {
    const childItem = childrenItem[index]
    const menu = childItem.querySelector<HTMLUListElement>('.zavant__menu')

    if (!menu) continue

    children.push(
      createTree({
        el: menu,
        children: []
      })
    )
  }
  tree.children = children
  return tree
}

const menu = ref<HTMLUListElement | null>(null)
onMounted(() => {
  const unrefMenu = unref(menu)
  if (!unrefMenu) return
  state.currentEl.value = unrefMenu

  const tree = createTree({
    el: unrefMenu,
    children: []
  })

  state.tree.value = tree
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
