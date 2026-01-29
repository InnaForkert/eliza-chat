<script setup lang="ts">
import { ChatMessage, MessageAuthor } from "@/types/chat"
import { computed } from "vue"

const { message } = defineProps<{
  message: ChatMessage
}>()

const emit = defineEmits<{
  retry: [id: string]
}>()

const userMessage = computed(() => (message.author === "user" ? message : null))
const isFailed = computed(() => userMessage.value?.status === "failed")

const authorLabel = computed(() => {
  const labels: Record<MessageAuthor, string> = {
    bot: "Eliza",
    user: "You"
  }
  return labels[message.author]
})

const formattedTime = computed(() => {
  if (!message.timestamp) return ""

  const date = new Date(message.timestamp)
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
})
</script>

<template>
  <li class="msg" :class="`msg--${message.author}`">
    <div class="msg__bubble">
      <div class="msg__meta">
        {{ authorLabel }}
        •
        <span class="msg__time">{{ formattedTime }}</span>
        <span
          v-if="userMessage"
          class="msg__status"
          :data-status="userMessage.status"
          :aria-label="`Message status is ${userMessage.status}`"
        />
        <button
          v-if="isFailed"
          class="msg__retry"
          @click="emit('retry', message.id)"
          aria-label="Retry sending message"
        >
          ↻
        </button>
      </div>
      <div class="msg__text">{{ message.text }}</div>
    </div>
  </li>
</template>

<style scoped>
.msg__status {
  font-size: 12px;
  opacity: 0.8;
}

.msg__status[data-status="pending"]::after {
  content: "⏳";
}

.msg__status[data-status="success"]::after {
  content: "✓";
  color: green;
}

.msg__status[data-status="failed"]::after {
  content: "⚠";
  color: red;
}

.msg__retry {
  padding: 0;
  cursor: pointer;
  height: 16px;
  width: 16px;
  font-size: 16px;
  border-radius: 100%;
  background-color: transparent;
  color: var(--muted);
  border: none;
}
</style>
