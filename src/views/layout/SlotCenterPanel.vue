<script lang="ts" setup>
import NavFooter from '@/components/Navigation/NavFooter.vue'
import LayoutSlotFrame from './SlotFrame.vue'

interface Props {
  loading?: boolean
}
withDefaults(
  defineProps<Props>(),
  {
    loading: true
  }
)

</script>

<template>
  <LayoutSlotFrame :class="['bg-no-repeat bg-center bg-cover']">
    <template #center>
      <div
        w-full
        h-full
        overflow-hidden
        class="panel-shadow"
        flex
        item-center
      >
        <n-spin
          w-full
          h-full
          content-class="w-full h-full flex"
          :show="loading"
          :rotate="false"
          class="center-panel-spin"
          :style="{'--n-opacity-spinning': '0'}"
        >
          <template #icon>
            <div class="i-svg-spinners:pulse-3 text-#596b47 w-160 h-160"></div>
          </template>
          <section
            v-if="$slots.left"
            class="w-300 h-full overflow-hidden"
          >
            <slot name="left"></slot>
          </section>
          <section class="flex-1 h-full overflow-hidden">
            <slot name="default"></slot>
          </section>
        </n-spin>
      </div>
    </template>
    <template #bottom>
      <NavFooter :show-border="true" />
    </template>
  </LayoutSlotFrame>
</template>

<style lang="scss" scoped>
.panel-shadow {
  box-shadow: var(--center-panel-shadow, 0 1px 4px rgb(0 0 0 / 6%));
}

.center-panel-spin {
  background: var(--center-panel-background, #fefbff);
}
</style>
