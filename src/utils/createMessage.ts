import { ChatMessage, MessageAuthor } from "@/types/chat"

export function createMessage(text: string, author: MessageAuthor): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author,
    text,
    timestamp: new Date()
  }
}

export function createErrorMessage(): ChatMessage {
  return {
    id: crypto.randomUUID(),
    author: "system",
    text: "Something went wrong. Please try again.",
    timestamp: new Date()
  }
}
