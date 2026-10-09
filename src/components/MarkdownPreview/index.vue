<script setup lang="ts">

const showLoading = computed(() => {

  return true
})
</script>

<template>
  <n-spin :show="showLoading">
    <template #icon>
      <div class="i-svg-spinners:3-dots-rotate"></div>
    </template>
  </n-spin>
</template>
w
