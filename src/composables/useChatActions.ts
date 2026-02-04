import { ChatMessage, MessageStatus } from "@/types/chat"
import { createBotMessage, createSystemMessage, createUserMessage } from "@/utils/createMessage"
import { delayRequest } from "@/utils/delayRequest"
import { computed, ref, watch } from "vue"
import { useChatApi } from "./useChatApi"
import { useChatStorage } from "./useChatStorage"
import { isUserMessage } from "@/utils/isUserMessage"

export function useChatActions() {
  const { sendMessageToApi } = useChatApi()
  const { loadMessages, saveMessages, clearChatStorage } = useChatStorage()

  const messages = ref<ChatMessage[]>(loadMessages())

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
      const reply = await sendMessageToApi(text)

      updateMessageStatus(userMessage.id, "success")
      addMessage(createBotMessage(reply))
    } catch (error) {
      updateMessageStatus(userMessage.id, "failed")
      addMessage(createSystemMessage())
      console.error(error)
    }
  }

  async function retryMessage(messageId: string) {
    const msgIndex = messages.value.findIndex(
      (message) => message.id === messageId && message.author === "user"
    )

    if (msgIndex === -1) return

    const msg = messages.value[msgIndex]
    if (!isUserMessage(msg) || msg.status !== "failed") return

    messages.value.splice(msgIndex, 1)

    const retriedMessage = createUserMessage(msg.text, "pending")
    addMessage(retriedMessage)

    const start = Date.now()

    try {
      const reply = await sendMessageToApi(msg.text)

      await delayRequest(start)
      updateMessageStatus(retriedMessage.id, "success")
      addMessage(createBotMessage(reply))
    } catch (error) {
      await delayRequest(start)
      updateMessageStatus(retriedMessage.id, "failed")
      addMessage(createSystemMessage())
      console.error(error)
    }
  }

  function updateMessageStatus(messageId: string, status: MessageStatus) {
    const msg = messages.value.find((message) => message.id === messageId)
    if (!isUserMessage(msg)) return

    if (msg?.author === "user") {
      msg.status = status
    }
  }

  function clearChat() {
    messages.value = []
    clearChatStorage()
  }

  watch(
    messages,
    (val) => {
      saveMessages(val)
    },
    { deep: true }
  )

  return {
    messages,
    isSending,
    clearChat,
    retryMessage,
    sendMessage
  }
}
