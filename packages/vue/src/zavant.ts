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
  private _rootEl: HTMLDivElement | null
  private _wrapperEl: HTMLUListElement | null
  private _rootClass: ComputedRef<string[]>
  private _rootStyle: ComputedRef<StyleValue>
  private _wrapperStyle: ComputedRef<StyleValue>
  private _height: Ref<number>

  private _resizeObserver: ResizeObserver
  private _mutationObserver: MutationObserver
  private _unwatchCurrentEl: WatchStopHandle

  private readonly focusEls =
    '*:is(button, a, input, select, textarea, [tabindex]):not([tabindex="-1"])'

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
    this._wrapperEl = null

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

  public init(root: Ref<HTMLDivElement | null>) {
    const unrefRoot = unref(root)
    if (!unrefRoot) return

    this._rootEl = unrefRoot
    this._wrapperEl = this._rootEl.querySelector('.zavant__menu')
    this.currentEl = this._wrapperEl

    this.update()

    this._resizeObserver.observe(unrefRoot)
    this._mutationObserver.observe(unrefRoot, {
      childList: true
    })
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
        case 'Right':
          //Go to next element
          const activeElement = document.activeElement as HTMLElement | null
          if (
            activeElement &&
            activeElement.classList.contains('zavant__next')
          ) {
            this.next(activeElement)
          }
          break
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
    this._resizeObserver.disconnect()
    this._mutationObserver.disconnect()
    this._unwatchCurrentEl()
  }

  private update() {
    if (!this._wrapperEl) return

    const data = this.createTree({
      el: this._wrapperEl,
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

    button.setAttribute('aria-expanded', 'true')

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

    this.currentEl?.focus()
    this.focusFirst()
  }

  public back() {
    if (!this.tree || unref(this.level) === 0) return

    const nextButton = this.currentEl?.previousElementSibling as
      | HTMLButtonElement
      | undefined

    this.path.pop()
    const item: ZAvantTree['el'] = this.level
      ? get(this.tree, this.treePath()).el
      : this.tree.el

    this.currentEl = item
    this.updateFocusableElements()

    this.currentEl?.focus()

    if (nextButton) {
      nextButton.setAttribute('aria-expanded', 'false')
      nextButton.focus()
    }
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
