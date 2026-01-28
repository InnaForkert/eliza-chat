<script setup lang="ts">
import MessageItem from "./MessageItem.vue"
import { useChat } from "@/composables/useChat"

const { messages, addMessage } = useChat()
</script>

<template>
  <ul class="messages" aria-label="Chat messages">
    <MessageItem
      v-for="{ author, text, timestamp, id } in messages"
      :id="id"
      :author="author"
      :text="text"
      :timestamp="timestamp"
    />
  </ul>
</template>
