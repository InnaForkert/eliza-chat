<script setup lang="ts">
import { useChat } from "@/composables/useChat"
import ChatInput from "./ChatInput.vue"
import Messages from "./ChatMessages.vue"

const { isSending, messages, clearChat, retryMessage, sendMessage } = useChat()

function handleSendMessage(text: string) {
  if (isSending.value || !text.trim()) return

  sendMessage(text)
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
        <Messages :messages="messages" @retry-message="retryMessage" />
      </main>

      <ChatInput :is-sending="isSending" @send-message="handleSendMessage" />
    </div>
  </div>
</template>
