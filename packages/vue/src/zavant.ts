import { computed, ref, unref, Ref, ComputedRef, StyleValue } from 'vue'
import get from 'lodash.get'

interface ZAvantTree {
  el: HTMLUListElement
  children: ZAvantTree[]
}

export default class ZAvantProvider {
  public options: Readonly<{
    dynamicHeight?: boolean | undefined
    back?: string | undefined
  }>

  private _path: Ref<string[]>
  private _tree: Ref<ZAvantTree | null>
  private _currentEl: Ref<HTMLUListElement | null>
  private _level: ComputedRef<number>
  private _rootClass: ComputedRef<Record<string, boolean>>
  private _rootStyle: ComputedRef<StyleValue>
  private _wrapperStyle: ComputedRef<StyleValue>

  constructor(
    options: Readonly<{
      dynamicHeight?: boolean | undefined
      back?: string | undefined
    }>
  ) {
    this.options = options
    this._path = ref([])
    this._tree = ref<ZAvantTree | null>(null)
    this._currentEl = ref<HTMLUListElement | null>(null)
    this._level = computed(() => this.path.length)
    this._rootClass = computed(() => {
      return {
        'zavant--dynamic-height': !!options.dynamicHeight
      }
    })

    this._rootStyle = computed(() => {
      let value = 0
      if (options.dynamicHeight && this.currentEl) {
        value = this.currentEl.clientHeight
      }

      const height = value ? `${value}px` : ''
      return {
        height
      }
    })

    this._wrapperStyle = computed(() => {
      return {
        transform: `translateX(${unref(this._level) * -100}%)`
      }
    })
  }

  public init(root: Ref<HTMLUListElement | null>) {
    const unrefRoot = unref(root)
    if (!unrefRoot) return

    this.currentEl = unrefRoot

    const data = this.addTree({
      el: unrefRoot,
      children: []
    })

    this.tree = data
  }

  private addTree(tree: ZAvantTree): ZAvantTree {
    const childrenItem = tree.el.children
    const children = []

    for (let index = 0; index < childrenItem.length; index++) {
      const childItem = childrenItem[index]
      const menu = childItem.querySelector<HTMLUListElement>('.zavant__menu')

      if (!menu) continue

      children.push(
        this.addTree({
          el: menu,
          children: []
        })
      )
    }

    tree.children = children

    return tree
  }

  private treePath() {
    const arr: string[] = []

    for (let index = 0; index < this.path.length; index++) {
      const item = this.path[index]
      arr.push('children')
      arr.push(item)
    }

    return arr
  }

  public next(e: Event) {
    if (!this.tree) return
    const target = e.target as HTMLElement | null
    if (!target) return

    const button: HTMLElement | null =
      target.tagName === 'BUTTON' ? target : target.closest('button')
    if (!button) return

    const menu = button.nextElementSibling
    if (!menu) return

    const children: ZAvantTree['children'] = this.level
      ? get(this.tree, this.treePath()).children
      : this.tree.children
    const index = children.findIndex(item => menu === item.el)
    if (index === -1) return

    this.path.push(index.toString())
    this.currentEl = children[index].el
  }

  public back() {
    if (!this.tree || unref(this.level) === 0) return

    this.path.pop()
    const item: ZAvantTree['el'] = this.level
      ? get(this.tree, this.treePath()).el
      : this.tree.el

    this.currentEl = item
  }

  private set path(path) {
    this._path.value = path
  }

  private get path() {
    return unref(this._path)
  }

  private set tree(tree) {
    this._tree.value = tree
  }

  private get tree() {
    return unref(this._tree)
  }

  private set currentEl(currentEl) {
    this._currentEl.value = currentEl
  }

  private get currentEl() {
    return unref(this._currentEl)
  }

  public get level() {
    return unref(this._level)
  }

  public get rootClass() {
    return unref(this._rootClass)
  }

  public get rootStyle() {
    return unref(this._rootStyle)
  }

  public get wrapperStyle() {
    return unref(this._wrapperStyle)
  }
}
