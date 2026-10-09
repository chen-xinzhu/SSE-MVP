<script setup lang="ts">
import { isGithubDeployed } from '@/config'
import { defaultMockModelName, modelMappingList } from '@/components/MarkdownPreview/models'
import type { SelectBaseOption } from 'naive-ui/es/select/src/interface'
import { systemTitle } from '@/base'
import LayoutCenterPanel from '@/views/layout/CenterPanel.vue'

const businessStore = useBusinessStore()
/* 1.加载 */
const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 700)

const stylizingLoading = ref(false)

/* 2.selections */
const modelListSelections = computed(() => {
  return modelMappingList.map<SelectBaseOption>((modelItem) => {
    let disabled = false
    if (isGithubDeployed && modelItem.modelName !== defaultMockModelName) {
      disabled = true
    }
    return {
      label: modelItem.label,
      value: modelItem.modelName,
      // Github 演示环境禁用模型切换，拉取代码后可按自己需求修改
      disabled
    }
  })
})

</script>

<template>
  <LayoutCenterPanel
    class="chat-index"
    :loading="loading"
  >
    <div class="chat-workspace">
      <header class="chat-toolbar">
        <a
          class="chat-brand"
          href="https://github.com/pdsuwwz/chatgpt-vue3-light-mvp"
          target="_blank"
          rel="noreferrer"
          :aria-label="`${systemTitle}，打开项目仓库`"
        >
          <span
            class="chat-brand-icon i-lucide:message-square-text"
            aria-hidden="true"
          ></span>
          <span class="chat-brand-title">{{ systemTitle }}</span>
        </a>

        <div class="chat-toolbar-actions">
          <span class="chat-model-label">当前模型</span>
          <n-select
            v-model:value="businessStore.systemModelName"
            class="chat-model-select"
            placeholder="请选择模型"
            :disabled="stylizingLoading"
            :options="modelListSelections"
          />
          <CustomTooltip :disabled="false">
            <div>注意：</div>
            <div>演示环境仅支持 “模拟数据模型”</div>
            <div>
              如需测试其他模型请克隆<a
                href="https://github.com/pdsuwwz/chatgpt-vue3-light-mvp"
                target="_blank"
                rel="noreferrer"
                class="repo-help-link"
              >本仓库</a>到本地运行
            </div>
            <template #trigger>
              <button
                type="button"
                class="chat-help-button"
                aria-label="查看模型使用说明"
              >
                <span
                  class="i-lucide:circle-help"
                  aria-hidden="true"
                ></span>
              </button>
            </template>
          </CustomTooltip>
        </div>
      </header>

      <main class="chat-response-region">
        <MarkdownPreview
          ref="refReaderMarkdownPreview"
        />
      </main>
    </div>
  </LayoutCenterPanel>
</template>

<style lang="scss" scoped>
.chat-index {
  --center-panel-background: #f7f7f5;
  --center-panel-shadow: none;
  --footer-background: #f7f7f5;
  --footer-border-color: #e6e6e1;
  --footer-padding: 8px 0;
  --footer-font-size: 12px;
  --footer-text-color: #858680;

  --chat-background: #f7f7f5;
  --chat-surface: #fff;
  --chat-text: #20201e;
  --chat-muted: #6f706b;
  --chat-border: #deded9;
  --chat-border-strong: #c9cac3;
  --chat-accent: #596b47;
  --chat-accent-hover: #4d5e3d;
}

:global(html.dark .chat-index) {
  --center-panel-background: #18181c;
  --footer-background: #18181c;
  --footer-border-color: #33332d;
  --footer-text-color: #a0a09a;

  --chat-background: #18181c;
  --chat-surface: #222225;
  --chat-text: #e6e6e1;
  --chat-muted: #999a93;
  --chat-border: #33332d;
  --chat-border-strong: #484942;
}

.chat-workspace {
  display: grid;
  grid-template-rows: 56px minmax(0, 1fr) auto;
  width: 100%;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  color: var(--chat-text);
  background: var(--chat-background);
}

.chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  padding: 0 24px;
  border-bottom: 1px solid var(--chat-border);
  background: rgb(255 255 255 / 76%);
}

.chat-brand{
  --at-apply:inline-flex items-center gap-10px min-w-0;
  color: var(--chat-text);
  transition: color 150ms ease;

  &:hover{
    color: var(--chat-accent);
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 38%);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .chat-brand-icon{
    --at-apply:flex-none w-22px h-22px
  }

  .chat-brand-title{
    --at-apply:overflow-hidden text-15px fw-[650] lh-[1.2] text-ellipsis ws-nowrap;
  }
}

.chat-toolbar-actions{
  --at-apply:flex flex-none items-center gap-8px;
  flex: 0 0 auto;

  .chat-model-label{
  --at-apply:mr-2px text-13px;
  color:var(--chat-muted)
  }

  .chat-model-select{
    --at-apply:w-252px;

    :deep(.n-base-selection) {
    --n-border-radius: 7px !important;
    --n-border: 1px solid var(--chat-border) !important;
    --n-border-hover: 1px solid var(--chat-border-strong) !important;
    --n-border-active: 1px solid var(--chat-accent) !important;
    --n-box-shadow-active: 0 0 0 2px rgb(89 107 71 / 12%) !important;
    --n-box-shadow-focus: 0 0 0 2px rgb(89 107 71 / 12%) !important;
    --n-color: var(--chat-surface) !important;
    --n-text-color: var(--chat-text) !important;

    min-height: 36px;
    font-size: 13px;
  }
  }
}

.chat-help-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  color: var(--chat-muted);
  font-size: 18px;
  cursor: help;
  background: transparent;
  transition: color 150ms ease, background-color 150ms ease;

  &:hover {
    color: var(--chat-text);
    background: #eeeeea;
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 38%);
    outline-offset: 1px;
  }
}

.repo-help-link {
  padding: 0 2px;
  color: #d5e7c2;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #b9d29f;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
  transition: color 150ms ease, text-decoration-color 150ms ease;

  &:hover,
  &:focus-visible {
    color: #fff;
    text-decoration-color: #fff;
  }
}


</style>
