<script lang="ts" setup>
import { useGlobalState } from './../store'

const props = defineProps<{
  name?: string
}>()
const state = useGlobalState()
</script>

<template>
  <button @click="state.next" role="menuitem">
    <slot name="button" role="menuitem">
      {{ props.name }}
    </slot>
  </button>
  <ul class="zavant__menu" ref="menu" aria-hidden="true" role="group">
    <li role="presentation">
      <button @click="state.previous" role="menuitem">
        <slot name="back">
          {{ state.options.value.back }}
        </slot>
      </button>
    </li>
    <slot name="default" />
  </ul>
</template>
