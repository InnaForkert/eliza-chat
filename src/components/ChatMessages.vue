<script setup lang="ts">
import { ChatMessage } from "@/types/chat"
import MessageItem from "./MessageItem.vue"
import { nextTick, onMounted, ref, watch } from "vue"

const { messages } = defineProps<{ messages: ChatMessage[] }>()

const emit = defineEmits<{
  retryMessage: [id: string]
}>()

const listRef = ref<HTMLElement | null>(null)

function scrollToBottom(behavior: ScrollBehavior) {
  if (!listRef.value) return
  listRef.value.scrollTo({
    top: listRef.value.scrollHeight,
    behavior
  })
}

watch(
  () => messages.length,
  async () => {
    await nextTick()
    scrollToBottom("smooth")
  }
)

onMounted(() => {
  scrollToBottom("instant")
})
</script>

<template>
  <main class="chat-body" ref="listRef">
    <ul class="messages" aria-label="Chat messages" v-if="messages.length">
      <MessageItem
        v-for="message in messages"
        :key="message.id"
        :message="message"
        @retry="(messageId: string) => emit('retryMessage', messageId)"
      />
    </ul>
    <span v-else>Chat history is empty. Send your first message!</span>
  </main>
</template>
