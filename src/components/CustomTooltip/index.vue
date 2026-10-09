<script lang="tsx" setup></script>

<template>
  <n-tooltip
    trigger="hover"
    v-bind="$attrs"
    content-class="wrapper-tooltip-scroller"
  >
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <slot></slot>
  </n-tooltip>
</template>
