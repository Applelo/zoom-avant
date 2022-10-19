import { ComputedRef, Ref } from 'vue'

export interface ZAvantTree {
  el: HTMLUListElement
  children: ZAvantTree[]
}

export interface ZAvantProvider {
  options: Ref<{
    dynamicHeight?: boolean | undefined
    back?: string | undefined
  }>
  methods: {
    init: (root: Ref<HTMLUListElement | null>) => void
    next: (e: Event) => void
    back: () => void
  }
  state: {
    level: ComputedRef<number>
    path: Ref<string[]>
    tree: Ref<{
      el: HTMLUListElement
      children: ZAvantTree[]
    } | null>
    maxHeight: ComputedRef<number>
    currentEl: Ref<HTMLUListElement | null>
  }
}
