import { computed, Ref, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import { ZAvantTree } from './typings'

export const useGlobalState = createGlobalState(() => {
  const path = ref([])
  const maxHeight = computed(() => 0)
  const tree = ref<ZAvantTree | null>(null)
  const level = computed(() => path.value.length)
  const height = ref(0)
  const options = ref<{
    dynamicHeight?: boolean
    back?: string
  }>({})
  const next = () => {
    //
  }
  const previous = () => {
    if (level.value === 0) return
    path.value.pop()
  }
  return { level, options, height, previous, next, path, tree, maxHeight }
})
