import { BotMessage, MessageStatus, UserMessage } from "@/types/chat"

export function createUserMessage(text: string, status: MessageStatus): UserMessage {
  return {
    id: crypto.randomUUID(),
    author: "user",
    text,
    timestamp: new Date(),
    status
  }
}

export function createBotMessage(text: string): BotMessage {
  return {
    id: crypto.randomUUID(),
    author: "bot",
    text,
    timestamp: new Date()
  }
}
