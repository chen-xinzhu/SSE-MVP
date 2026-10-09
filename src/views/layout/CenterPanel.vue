<script lang="ts" setup>
import LayoutSlotCenterPanel from './SlotCenterPanel.vue'
</script>

<template>
  <LayoutSlotCenterPanel v-bind="$attrs">
    <div
      h-full
      class="center-panel-surface"
    >
      <slot name="default"></slot>
    </div>
  </LayoutSlotCenterPanel>
</template>

<style lang="scss" scoped>
.center-panel-surface {
  background: var(--center-panel-background, #fefbff);
}
</style>
