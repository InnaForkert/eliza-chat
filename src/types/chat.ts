export type MessageAuthor = "user" | "bot" | "system"

export type MessageStatus = "pending" | "success" | "failed"

export type ChatMessage = UserMessage | BotMessage | SystemMessage

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

export interface SystemMessage extends BaseMessage {
  author: "system"
}
