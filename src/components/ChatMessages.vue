<script setup lang="ts">
import { ChatMessage } from "@/types/chat"
import MessageItem from "./MessageItem.vue"

const { messages } = defineProps<{ messages: ChatMessage[] }>()

const emit = defineEmits<{
  retryMessage: [id: string]
}>()
</script>

<template>
  <ul class="messages" aria-label="Chat messages" v-if="messages.length">
    <MessageItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
      @retry="(messageId: string) => emit('retryMessage', messageId)"
    />
  </ul>
  <span v-else>Chat history is empty. Send your first message!</span>
</template>
