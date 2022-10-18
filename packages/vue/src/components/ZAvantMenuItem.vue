<script lang="ts" setup></script>
<template>
  <li class="zavant__item" role="presentation">
    <slot />
  </li>
</template>
<style>
.zavant__item > .zavant__menu {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(100%);
  width: 100%;
}

.zavant__item > .zavant__menu[aria-hidden='true'] {
  z-index: -1;
}
</style>
