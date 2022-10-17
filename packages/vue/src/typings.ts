import { ComputedRef } from 'vue'

export interface ZAvantTree {
  height: ComputedRef<number>
  el: HTMLUListElement
  children: ZAvantTree[]
}
