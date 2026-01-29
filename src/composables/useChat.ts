import { sendToEliza } from "@/api/eliza"
import { ChatMessage, MessageStatus, UserMessage } from "@/types/chat"
import { createBotMessage, createUserMessage } from "@/utils/createMessage"
import { delayRequest } from "@/utils/delayRequest"
import { computed, ref } from "vue"

export function useChat() {
  const messages = ref<ChatMessage[]>()

  const isSending = computed(() =>
    messages.value.some((message) => message.author === "user" && message.status === "pending")
  )

  function addMessage(message: ChatMessage) {
    messages.value.push(message)
  }

  async function sendMessage(text: string) {
    const userMessage = createUserMessage(text, "pending")
    addMessage(userMessage)

    try {
      const reply = await sendToEliza(text)

      updateMessageStatus(userMessage.id, "success")
      addMessage(createBotMessage(reply))
    } catch (error) {
      updateMessageStatus(userMessage.id, "failed")
      console.log(error)
    }
  }

  async function retryMessage(messageId: string) {
    const msgIndex = messages.value.findIndex(
      (message) => message.id === messageId && message.author === "user"
    )

    if (msgIndex === -1) return

    const msg = messages.value[msgIndex]
    if ((msg as UserMessage).status !== "failed") return

    messages.value.splice(msgIndex, 1)

    const retriedMessage = createUserMessage(msg.text, "pending")
    addMessage(retriedMessage)

    const start = Date.now()

    try {
      const reply = await sendToEliza(msg.text)

      await delayRequest(start)
      updateMessageStatus(retriedMessage.id, "success")
      addMessage(createBotMessage(reply))
    } catch (error) {
      await delayRequest(start)
      updateMessageStatus(retriedMessage.id, "failed")
      console.log(error)
    }
  }

  function updateMessageStatus(messageId: string, status: MessageStatus) {
    const msg = messages.value.find((message) => message.id === messageId) as UserMessage
    if (msg?.author === "user") {
      msg.status = status
    }
  }

  function clearChat() {
    messages.value = []
  }

  return {
    messages,
    isSending,
    clearChat,
    retryMessage,
    sendMessage
  }
}
