<script setup lang="ts">
import { useChat } from "@/composables/useChat"
import ChatInput from "./ChatInput.vue"
import Messages from "./ChatMessages.vue"
import { sendToEliza } from "@/api/eliza"
import { createErrorMessage, createMessage } from "@/utils/createMessage"

const { isSending, addMessage, messages, clearChat } = useChat()

async function handleSendMessage(text: string) {
  if (isSending.value || !text.trim()) return

  addMessage(createMessage(text, "user"))
  isSending.value = true

  try {
    const reply = await sendToEliza(text)
    addMessage(createMessage(reply, "bot"))
  } catch (error) {
    addMessage(createErrorMessage())
    console.log(error)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="chat-card">
      <header class="chat-header">
        <div class="chat-title">
          <div class="chat-title__name">Chat Eliza</div>
          <div class="chat-title__sub">Vue 3 + TypeScript + ConnectRPC</div>
        </div>

        <div class="chat-actions">
          <button class="btn btn--ghost" type="button" @click="clearChat">Clear</button>
        </div>
      </header>

      <main class="chat-body">
        <Messages :messages="messages" />
      </main>

      <ChatInput :is-sending="isSending" @send-message="handleSendMessage" />
    </div>
  </div>
</template>
