import { describe, expect, it } from "vitest"
import { createBotMessage, createSystemMessage, createUserMessage } from "./createMessage"

describe("createMessage", () => {
  it("creates user message", () => {
    const msg = createUserMessage("Test user message", "pending")

    expect(msg.author).toBe("user")
    expect(msg.status).toBe("pending")
  })

  it("creates bot message", () => {
    const msg = createBotMessage("Test bot message")

    expect(msg.author).toBe("bot")
    expect(msg).not.toHaveProperty("status")
  })

  it("creates system message", () => {
    const msg = createSystemMessage()

    expect(msg.author).toBe("system")
    expect(msg).not.toHaveProperty("status")
  })
})
