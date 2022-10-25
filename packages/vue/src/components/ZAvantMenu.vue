<script lang="ts" setup>
import { inject } from 'vue'
import ZAvantProvider from './../zavant'

const ZAvant = inject('ZAvant') as ZAvantProvider

const props = defineProps<{
  name?: string
}>()
</script>

<template>
  <button @click="ZAvant.next" role="menuitem" aria-haspopup="true">
    <slot name="button" role="menuitem">
      {{ props.name }}
    </slot>
  </button>
  <ul class="zavant__menu" ref="menu" aria-hidden="true" role="group">
    <li role="none" class="zavant__item">
      <button @click="ZAvant.back" role="menuitem">
        <slot name="back">
          {{ ZAvant.options.back }}
        </slot>
      </button>
    </li>
    <slot name="default" />
  </ul>
</template>
