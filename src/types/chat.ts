export type MessageAuthor = "system" | "user" | "bot"

export interface ChatMessage {
  id: string
  author: MessageAuthor
  text: string
  timestamp: Date
}
