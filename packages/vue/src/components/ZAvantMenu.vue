<script lang="ts" setup>
import { inject } from 'vue'
import ZAvantProvider from './../zavant'

const ZAvant = inject('ZAvant') as ZAvantProvider

const props = defineProps<{
  next?: string
}>()
</script>

<template>
  <button
    @click="ZAvant.next"
    class="zavant__next"
    role="menuitem"
    aria-haspopup="true"
    aria-expanded="false"
    :aria-controls="`zavant-menu-${$.uid}`"
  >
    <slot name="next" role="menuitem">
      {{ props.next }}
    </slot>
  </button>
  <ul :id="`zavant-menu-${$.uid}`" class="zavant__menu" role="menu">
    <li role="none" class="zavant__item zavant__item--back">
      <button @click="ZAvant.back" class="zavant__back" role="menuitem">
        <slot name="back">
          {{ ZAvant.options.back }}
        </slot>
      </button>
    </li>
    <slot name="default" />
  </ul>
</template>
