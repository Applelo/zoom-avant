import {
  computed,
  ref,
  unref,
  Ref,
  ComputedRef,
  StyleValue,
  watch,
  WatchStopHandle,
  WritableComputedRef
} from 'vue'
import get from 'lodash.get'

interface ZAvantTree {
  el: HTMLUListElement
  children: ZAvantTree[]
}

export default class ZAvantMain {
  public options: Readonly<{
    dynamicHeight?: boolean | undefined
    back?: string | undefined
  }>

  public path: WritableComputedRef<number[]>
  private _tree: Ref<ZAvantTree | null>
  private _currentEl: Ref<HTMLUListElement | null>
  private _level: ComputedRef<number>
  private _rootEl: HTMLDivElement | null
  private _wrapperEl: HTMLUListElement | null
  private _rootClass: ComputedRef<string[]>
  private _rootStyle: ComputedRef<StyleValue>
  private _wrapperStyle: ComputedRef<StyleValue>
  private _height: Ref<number>

  private _resizeObserver: ResizeObserver | null
  private _mutationObserver: MutationObserver | null
  private _unwatchCurrentEl: WatchStopHandle
  private _unwatchPath: WatchStopHandle

  private readonly focusEls =
    '*:is(button, a, input, select, textarea, [tabindex]):not([tabindex="-1"])'

  constructor(
    options: Readonly<{
      dynamicHeight?: boolean | undefined
      back?: string | undefined
    }>,
    path: WritableComputedRef<number[]>
  ) {
    this.options = options
    this.path = path
    this._tree = ref(null)
    this._currentEl = ref(null)
    this._height = ref(0)
    this._level = computed(() => this.path.value.length)
    this._rootEl = null
    this._wrapperEl = null

    this._resizeObserver = null
    this._mutationObserver = null

    this._unwatchCurrentEl = watch(this._currentEl, () => {
      this.getHeightWithOptions()
    })

    this._unwatchPath = watch(
      this.path,
      () => {
        this.updateWithPath()
      },
      {
        deep: true
      }
    )

    this._rootClass = computed(() => {
      const classes = [`zavant--level-${this.level}`]
      if (options.dynamicHeight) classes.push('zavant--dynamic-height')

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

  public init(root: Ref<HTMLDivElement | null>) {
    const unrefRoot = unref(root)
    if (!unrefRoot) return

    this._rootEl = unrefRoot
    this._wrapperEl = this._rootEl.querySelector('.zavant__menu')
    this.currentEl = this._wrapperEl

    this.update()
    this.updateWithPath(true)

    if (
      typeof ResizeObserver !== 'undefined' &&
      typeof MutationObserver !== 'undefined'
    ) {
      this._resizeObserver = new ResizeObserver(() =>
        this.getHeightWithOptions()
      )
      this._mutationObserver = new MutationObserver(() => {
        this.update()
      })

      this._resizeObserver.observe(unrefRoot)
      this._mutationObserver.observe(unrefRoot, {
        childList: true
      })
    }

    this.initAccessibility(unrefRoot)
  }

  // Inspired by https://www.w3.org/WAI/ARIA/apg/patterns/menu/
  private initAccessibility(unrefRoot: HTMLDivElement) {
    unrefRoot.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          //Focus to previous element
          this.focusSibling('previous')
          break
        case 'ArrowDown':
        case 'Down':
          //Focus to next element
          this.focusSibling('next')
          break
        case 'ArrowLeft':
        case 'Left':
        case 'Esc':
        case 'Escape':
          // Go to the previous element
          this.back()
          break
        case 'ArrowRight':
        case 'Right': {
          //Go to next element
          const activeElement = document.activeElement as HTMLElement | null
          if (
            activeElement &&
            activeElement.classList.contains('zavant__next')
          ) {
            this.next(activeElement)
          }
          break
        }
        case 'Home':
        case 'PageUp':
          // Moves focus to the first item in the submenu.
          this.focusFirst()
          break
        case 'End':
        case 'PageDown':
          // Moves focus to the last item in the submenu.
          this.focusLast()
          break
        default:
          // Character search
          this.focusChar(e.key)
          break
      }
    })
  }

  public destroy() {
    if (this._resizeObserver) this._resizeObserver.disconnect()
    if (this._mutationObserver) this._mutationObserver.disconnect()
    this._unwatchCurrentEl()
    this._unwatchPath()
  }

  private update() {
    if (!this._wrapperEl) return

    const data = this.createTree({
      el: this._wrapperEl,
      children: []
    })

    this.tree = data
    this.getHeightWithOptions()
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
    const firstEl = this.currentEl?.querySelector<HTMLElement>(this.focusEls)
    if (firstEl) firstEl.focus()

    this._rootEl?.scrollTo(0, 0)
  }

  private focusLast() {
    if (!this.currentEl) return

    const items = Array.from(this.currentEl.querySelectorAll(':scope > *'))

    for (let index = items.length - 1; index >= 0; index--) {
      const item = items[index]
      const focusEl = item.querySelector<HTMLElement>(this.focusEls)
      if (focusEl) {
        focusEl.focus()
        return
      }
    }
  }

  private focusSibling(dir: 'next' | 'previous') {
    const activeElement = document.activeElement as HTMLElement | null
    if (!activeElement || !this.currentEl) return this.focusFirst()

    const currentItem = activeElement.closest('.zavant__item')
    const items = Array.from(this.currentEl.querySelectorAll(':scope > *'))
    const currentItemIndex = items.findIndex(item => currentItem === item)
    if (currentItemIndex === -1) return this.focusFirst()

    if (dir === 'next' && currentItemIndex === items.length - 1) {
      return this.focusFirst()
    } else if (dir === 'previous' && currentItemIndex === 0) {
      return this.focusLast()
    }

    for (
      let index = dir === 'next' ? currentItemIndex + 1 : currentItemIndex - 1;
      dir === 'next' ? index < items.length : index >= 0;
      dir === 'next' ? index++ : index--
    ) {
      const item = items[index]
      const focusEl = item.querySelector<HTMLElement>(this.focusEls)
      if (focusEl) {
        focusEl.focus()
        return
      }
    }

    return dir === 'next' ? this.focusFirst() : this.focusLast()
  }

  private focusChar(char: string) {
    if (!this.currentEl) return

    const items = Array.from(this.currentEl.querySelectorAll(':scope > *'))
    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      const focusEl = item.querySelector<HTMLElement>(this.focusEls)

      if (
        focusEl &&
        focusEl.textContent &&
        focusEl.textContent.trim().toLowerCase()[0] === char
      ) {
        focusEl.focus()
        return
      }
    }
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

  private treePath(path = unref(this.path)) {
    const arr: string[] = []

    for (let index = 0; index < path.length; index++) {
      const item = path[index] - 1
      arr.push('children')
      arr.push(item.toString())
    }

    return arr
  }

  public updateWithPath(init = false) {
    if (!this.tree) return

    const currentEl: ZAvantTree['el'] = this.level
      ? get(this.tree, this.treePath()).el
      : this.tree.el

    const nexts = Array.from(document.getElementsByClassName('zavant__next'))
    nexts.forEach(next => next.setAttribute('aria-expanded', 'false'))
    const unrefPath = unref(this.path)
    const route: number[] = []

    for (let index = 0; index < unrefPath.length; index++) {
      const item = unrefPath[index]
      route.push(item)
      const el: ZAvantTree['el'] = this.level
        ? get(this.tree, this.treePath(route)).el
        : this.tree.el
      const next = el.previousElementSibling
      if (!next) continue

      next.setAttribute('aria-expanded', 'true')
    }

    this.currentEl = currentEl
    this.updateFocusableElements()

    if (!init) {
      this.currentEl?.focus()
      this.focusFirst()
    }
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

    const path = this.path.value
    path.push(index + 1)

    this.path.value = path
  }

  public back() {
    if (!this.tree || unref(this.level) === 0) return

    const path = this.path.value
    path.pop()

    this.path.value = path
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
