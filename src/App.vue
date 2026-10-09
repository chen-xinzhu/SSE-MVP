<script lang="ts" setup>
import NaiveProvider from './NaiveProvider.vue'
import { NGlobalStyle, dateZhCN, zhCN } from 'naive-ui'
import { useTheme } from '@/hooks/useTheme.js'
import { useCopyCode } from '@/hooks/useCopyCode.js'

const { currentTheme, themeOverrides } = useTheme()

defineOptions({
  name: 'App'
})
useCopyCode()
</script>

<template>
  <NConfigProvider
    class="h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="currentTheme"
    :theme-overrides="themeOverrides"
  >
    <NGlobalStyle />
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>

<style lang="scss">
@use "@/styles/index";
</style>
