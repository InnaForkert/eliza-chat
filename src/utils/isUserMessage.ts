import { ChatMessage } from "@/types/chat"

export function isUserMessage(message: ChatMessage) {
  return message.author === "user"
}
