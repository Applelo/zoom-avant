<script lang="ts" setup>
import { inject } from 'vue'
import type { ZAvantProvider } from './../typings'

const ZAvant = inject('ZAvant') as ZAvantProvider

const props = defineProps<{
  name?: string
}>()
</script>

<template>
  <button @click="ZAvant.methods.next" role="menuitem">
    <slot name="button" role="menuitem">
      {{ props.name }}
    </slot>
  </button>
  <ul class="zavant__menu" ref="menu" aria-hidden="true" role="group">
    <li role="presentation">
      <button @click="ZAvant.methods.back" role="menuitem">
        <slot name="back">
          {{ ZAvant.options.value.back }}
        </slot>
      </button>
    </li>
    <slot name="default" />
  </ul>
</template>
