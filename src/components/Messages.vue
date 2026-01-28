<script setup lang="ts">
import MessageItem from "./MessageItem.vue"

const messages = []
</script>

<template>
  <ul class="messages" aria-label="Chat messages">
    <MessageItem
      v-for="{ author, text, time, id } in messages"
      :id="id"
      :author="author"
      :text="text"
      :time="time"
    />
  </ul>
</template>
