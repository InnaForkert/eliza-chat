<script setup lang="ts">
import { ChatMessage } from "@/types/chat"
import MessageItem from "./MessageItem.vue"

const { messages } = defineProps<{ messages: ChatMessage[] }>()
</script>

<template>
  <ul class="messages" aria-label="Chat messages" v-if="messages.length">
    <MessageItem
      v-for="{ author, text, timestamp, id } in messages"
      :key="id"
      :author="author"
      :text="text"
      :timestamp="timestamp"
    />
  </ul>
  <span v-else>Chat history is empty. Send your first message!</span>
</template>
