<script setup lang="ts">
import { MessageAuthor } from "@/types/chat"
import { computed } from "vue"

const { author, text, timestamp } = defineProps<{
  author: MessageAuthor
  text: string
  timestamp: Date
}>()

const authorLabel = computed(() => {
  const labels: Record<MessageAuthor, string> = {
    bot: "Eliza",
    user: "You",
    system: "System"
  }
  return labels[author]
})

const showTime = computed(() => ["user", "eliza"].includes(author))
const formattedTime = computed(() => timestamp ?? "") // to 12:41 format
</script>

<template>
  <li class="msg" :class="`msg--${author}`">
    <div class="msg__bubble">
      <div class="msg__meta">
        {{ authorLabel }}
        <template v-if="showTime">
          •
          <span class="msg__time">{{ formattedTime }}</span>
        </template>
      </div>
      <div class="msg__text">{{ text }}</div>
    </div>
  </li>
</template>
