export type MessageAuthor = "user" | "bot"

export type MessageStatus = "pending" | "success" | "failed"

export type ChatMessage = UserMessage | BotMessage
export interface BaseMessage {
  id: string
  text: string
  timestamp: Date
}

export interface UserMessage extends BaseMessage {
  author: "user"
  status: MessageStatus
}

export interface BotMessage extends BaseMessage {
  author: "bot"
}
