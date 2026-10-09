import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as TransformUtils from '@/components/MarkdownPreview/transform'
import { defaultModelName, modelMappingList } from '@/components/MarkdownPreview/models'

export const useBusinessStore = defineStore('business-store', () => {
  // 1. State
  const systemModelName = ref(defaultModelName)

  // 2. Getters
  const currentModelItem = computed(() => {
    return modelMappingList.find(v => v.modelName === systemModelName.value)
  })

  // 3. Actions
  async function createAssistantWriterStylized(data: { text: string; }) {
    if (!currentModelItem.value?.chatFetch) {
      return {
        error: 1,
        reader: null
      }
    }
    try {
      const res = await currentModelItem.value.chatFetch(data.text)
      if (res.body) {
        const reader = res.body
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(TransformUtils.splitStream('\n'))
          .getReader()
        return {
          error: 0,
          reader
        }
      }
    } catch {
      return {
        error: 1,
        reader: null
      }
    }
    return {
      error: 1,
      reader: null
    }
  }

  return {
    systemModelName,
    currentModelItem,
    createAssistantWriterStylized
  }
})
