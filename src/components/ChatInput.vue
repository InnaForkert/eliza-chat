<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"

const { isSending } = defineProps<{ isSending: boolean }>()
const emit = defineEmits<{
  "send-message": [text: string]
}>()

const input = ref<string>("")
const inputRef = ref<HTMLTextAreaElement>()

const isValid = computed(() => input.value.trim().length > 0)

async function handleSendMessage() {
  if (!isValid.value || isSending) return

  const text = input.value.trim()

  emit("send-message", text)

  input.value = ""
  inputRef.value?.focus()
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <footer class="chat-footer">
    <form
      class="composer"
      action="#"
      aria-label="Message composer"
      @submit.prevent="handleSendMessage"
    >
      <div class="composer__field">
        <label class="sr-only" for="message">Message</label>
        <textarea
          ref="inputRef"
          v-model="input"
          @keydown.enter.exact.prevent="handleSendMessage"
          @keydown.enter.shift="() => {}"
          id="message"
          class="input"
          type="text"
          placeholder="Type your message…"
          autocomplete="off"
        />
        <div class="composer__hint">Enter — send • Shift+Enter — new line</div>
      </div>

      <button class="btn btn--primary" type="submit" :disabled="isSending || !isValid">
        <template v-if="isSending">
          <span class="btn__text">Sending...</span>
          <span class="btn__spinner" aria-hidden="true"></span>
        </template>
        <span class="btn__text" v-else>Send</span>
      </button>
    </form>

    <div class="status">
      <span class="status__dot"></span>
      <span class="status__text">Ready</span>
    </div>
  </footer>
</template>
