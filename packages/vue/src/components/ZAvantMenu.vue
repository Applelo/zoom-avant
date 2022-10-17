<script lang="ts" setup>
import { useGlobalState } from './../store'

const props = defineProps<{
  name?: string
}>()
const state = useGlobalState()
</script>

<template>
  <button @click="state.next">
    <slot name="button">
      {{ props.name }}
    </slot>
  </button>
  <ul class="zavant__menu" ref="menu">
    <button @click="state.previous">
      <slot name="back">
        {{ state.options.value.back }}
      </slot>
    </button>
    <slot name="default" />
  </ul>
</template>

<style>
.zavant__menu {
  margin: 0;
  list-style: none;
  padding: 0;
}
</style>
