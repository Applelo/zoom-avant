<script lang="ts" setup></script>
<template>
  <li class="zavant__item">
    <slot />
  </li>
</template>
<style>
.zavant__item {
  padding: 8px 0;
}
.zavant__item > .zavant__menu {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(100%);
  width: 100%;
}
</style>
