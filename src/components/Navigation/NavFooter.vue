<script setup lang="tsx">
import NavGit from './NavGit.vue'
defineProps({
  showBorder: {
    type: Boolean,
    default: false
  }
})

const link = ref('https://github.com/pdsuwwz')
</script>

<template>
  <footer
    class="footer w-full mx-auto my-0 flex justify-center select-none bg-$footer-background"
    :class="{
      'b-t b-t-solid b-t-#dcdfe6 dark:b-t-#444':showBorder
    }"
  >
    <div class="container p-$footer-padding">
      <p
        class="text text-[length:var(--footer-font-size)] c-$footer-text-color"
        flex
        justify-center
        items-center
        flex-wrap
        m-0
        text-center
        lh-12px
      >
        <NavGit />
        MIT Licensed | Copyright © 2020-PRESENT

        <a
          target="_blank"
          :href="link"
          class="github-link c-#555 dark:c-#fff b-b b-b-solid b-b-#3c3c43:12 dark:b-b-#666:12"
          block
        >
          Wisdom
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.github-link {
  transition: border 0.3s ease-in-out;
  margin-left: 6px;

  &:hover {
    border-color: #7d7d7d;
  }
}
</style>
