import { ChatMessage } from "@/types/chat"

const STORAGE_KEY = "eliza-chat-messages"

export function useChatStorage() {
  function clearChatStorage() {
    localStorage.removeItem(STORAGE_KEY)
  }

  function saveMessages(messages: ChatMessage[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }

  function loadMessages(): ChatMessage[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw)

      return parsed.map((msg: ChatMessage) => {
        const parsedMessage = {
          ...msg,
          timestamp: new Date(msg.timestamp)
        }
        if (parsedMessage.author === "user" && parsedMessage.status === "pending") {
          parsedMessage.status = "failed"
        }

        return parsedMessage
      })
    } catch {
      return []
    }
  }

  return {
    loadMessages,
    saveMessages,
    clearChatStorage
  }
}
