import {
  computed,
  ref,
  unref,
  Ref,
  ComputedRef,
  StyleValue,
  watch,
  WatchStopHandle
} from 'vue'
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
  private _rootEl: HTMLUListElement | null
  private _rootClass: ComputedRef<string[]>
  private _rootStyle: ComputedRef<StyleValue>
  private _wrapperStyle: ComputedRef<StyleValue>
  private _height: Ref<number>

  private _resizeObserver: ResizeObserver
  private _mutationObserver: MutationObserver
  private _unwatchCurrentEl: WatchStopHandle

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
    this._height = ref(0)
    this._level = computed(() => this.path.length)
    this._rootEl = null

    this._resizeObserver = new ResizeObserver(() => this.getHeightWithOptions())
    this._unwatchCurrentEl = watch(this._currentEl, () => {
      this.getHeightWithOptions()
    })
    this._mutationObserver = new MutationObserver(() => {
      this.update()
    })

    this._rootClass = computed(() => {
      const classes = [`zavant--level-${this.level}`]
      if (!!options.dynamicHeight) classes.push('zavant--dynamic-height')

      return classes
    })

    this._rootStyle = computed(() => {
      return {
        height: this._height.value ? `${this._height.value}px` : ''
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
    this._rootEl = unrefRoot

    this.update()

    this._resizeObserver.observe(unrefRoot)
    // this._mutationObserver.observe(unrefRoot, {
    //   subtree: true
    // })
    this.initAccessibility(unrefRoot)
  }

  // Inspired by https://www.w3.org/WAI/ARIA/apg/patterns/menu/
  private initAccessibility(unrefRoot: HTMLUListElement) {
    unrefRoot.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'Left':
          this.back()
          break
        case 'ArrowRight':
        case 'Right':
          const activeElement = document.activeElement as HTMLElement | null
          if (
            activeElement &&
            activeElement.classList.contains('zavant__next')
          ) {
            this.next(activeElement)
          }
          break
        case 'Esc':
        case 'Escape':
          //
          break
        case 'Home':
        case 'PageUp':
          // Moves focus to the first item in the submenu.
          this.focusFirst()
          break
        case 'End':
        case 'PageDown':
          // Moves focus to the last item in the submenu.
          break
        default:
          // Character search
          break
      }
    })
  }

  public destroy() {
    this._resizeObserver.disconnect()
    this._mutationObserver.disconnect()
    this._unwatchCurrentEl()
  }

  private update() {
    if (!this._rootEl) return

    const data = this.createTree({
      el: this._rootEl,
      children: []
    })

    this.tree = data
    this.getHeightWithOptions()
    this.updateFocusableElements()
  }

  private updateFocusableElements() {
    if (!this.currentEl || !this._rootEl) return

    const children = Array.from(this._rootEl.getElementsByTagName('*'))
    children.forEach(item => item.setAttribute('tabindex', '-1'))

    const currentChildren = Array.from(this.currentEl.getElementsByTagName('*'))
    currentChildren.forEach(item => item.removeAttribute('tabindex'))
    this.currentEl.removeAttribute('tabindex')

    const items = Array.from(
      this.currentEl.querySelectorAll(':scope .zavant__menu *')
    )
    items.forEach(item => item.setAttribute('tabindex', '-1'))
  }

  private focusFirst() {
    if (!this.currentEl) return
    const firstEl = this.currentEl.querySelector(
      "button:not(.zavant__back), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    ) as HTMLElement | null
    if (firstEl) firstEl.focus()
    this._rootEl?.parentElement?.scrollTo(0, 0)
  }

  private createTree(tree: ZAvantTree): ZAvantTree {
    const childrenItem = tree.el.children
    const children = []

    for (let index = 0; index < childrenItem.length; index++) {
      const childItem = childrenItem[index]
      const menu = childItem.querySelector<HTMLUListElement>('.zavant__menu')

      if (!menu) continue

      children.push(
        this.createTree({
          el: menu,
          children: []
        })
      )
    }

    tree.children = children

    return tree
  }

  private getHeightWithOptions() {
    let height = 0

    if (this.options.dynamicHeight === true && this.currentEl) {
      height = this.currentEl.clientHeight
    } else if (this.tree) {
      const menus = this.tree.el.getElementsByClassName('zavant__menu')
      height = this.tree.el.clientHeight
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index]
        if (element.clientHeight > height) height = element.clientHeight
      }
      this.height = height
    }

    this.height = height
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

  public next(e: Event | HTMLElement) {
    if (!this.tree) return
    const target =
      typeof e === 'object' && 'target' in e
        ? (e.target as HTMLElement | null)
        : e
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
    this.updateFocusableElements()
    this.focusFirst()
  }

  public back() {
    if (!this.tree || unref(this.level) === 0) return

    this.path.pop()
    const item: ZAvantTree['el'] = this.level
      ? get(this.tree, this.treePath()).el
      : this.tree.el

    this.currentEl = item
    this.updateFocusableElements()
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

  private set height(height) {
    this._height.value = height
  }

  private get height() {
    return unref(this._height)
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
