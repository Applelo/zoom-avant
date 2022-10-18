import { computed, ref, unref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import get from 'lodash.get'

import type { ZAvantTree } from './typings'

export const useGlobalState = createGlobalState(() => {
  const path = ref<string[]>([])
  const maxHeight = computed(() => 0)
  const tree = ref<ZAvantTree | null>(null)
  const level = computed(() => unref(path).length)
  const currentEl = ref<HTMLUListElement | null>(null)
  const options = ref<{
    dynamicHeight?: boolean
    back?: string
  }>({})

  const treePath = (children = true) => {
    const arr: string[] = []
    const unrefPath = unref(path)
    arr.push('children')
    for (let index = 0; index < unrefPath.length; index++) {
      const item = unrefPath[index]
      arr.push(item)
      if ((!children && index < unrefPath.length - 1) || children) {
        arr.push('children')
      }
    }

    return arr
  }

  const next = (e: Event) => {
    if (!unref(tree)) return

    const target = e.target as HTMLElement | null
    if (!target) return

    const button: HTMLElement | null =
      target.tagName === 'BUTTON' ? target : target.closest('button')
    if (!button) return

    const menu = button.nextElementSibling
    if (!menu) return

    const children: ZAvantTree['children'] = get(unref(tree), treePath())
    const index = children.findIndex(item => menu === item.el)
    if (index === -1) return

    path.value.push(index.toString())
    currentEl.value = children[index].el
    console.log('next', path.value)
  }
  const previous = () => {
    if (unref(level) === 0) return
    path.value.pop()
    const item: ZAvantTree = get(unref(tree), treePath(false))
    currentEl.value = item.el
  }
  return { level, options, currentEl, previous, next, path, tree, maxHeight }
})
