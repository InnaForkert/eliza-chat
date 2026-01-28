import { ChatMessage } from "@/types/chat"
import { ref } from "vue"

export function useChat() {
  const messages = ref<ChatMessage[]>([])
  const isSending = ref(false)

  function addMessage(message: ChatMessage) {
    messages.value.push(message)
  }

  function clearChat() {
    messages.value = []
  }

  return {
    messages,
    isSending,
    addMessage,
    clearChat
  }
}
