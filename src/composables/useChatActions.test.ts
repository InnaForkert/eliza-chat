import { sendToEliza } from "@/api/eliza"
import { describe, expect, vi, it, beforeEach } from "vitest"
import { useChatActions } from "./useChatActions"
import { isUserMessage } from "@/utils/isUserMessage"

vi.mock("@/api/eliza.ts")

describe("useChat", () => {
  beforeEach(() => {
    const { messages } = useChatActions()
    messages.value = []
    vi.clearAllMocks()
  })

  it("adds user and bot messages on successful send", async () => {
    vi.mocked(sendToEliza).mockResolvedValue("Test bot response message")

    const { messages, sendMessage } = useChatActions()

    await sendMessage("Hi")

    expect(messages.value).toHaveLength(2)
    expect(messages.value[0].author).toBe("user")
    expect(messages.value[1].author).toBe("bot")
  })

  it("marks message as failed and creates system message on error", async () => {
    vi.mocked(sendToEliza).mockRejectedValue(new Error("Network error"))

    const { messages, sendMessage } = useChatActions()

    await sendMessage("Hi")

    expect(messages.value).toHaveLength(2)

    const userMessage = messages.value[0]
    expect(isUserMessage(messages.value[0])).toBe(true)

    if (!isUserMessage(userMessage)) {
      throw new Error("Expected UserMessage")
    }

    expect(userMessage.status).toBe("failed")
    expect(messages.value[1].author).toBe("system")
  })

  it("retries failed message", async () => {
    vi.mocked(sendToEliza)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce("Recovered")

    const { messages, sendMessage, retryMessage } = useChatActions()

    await sendMessage("Hi")

    const failedMessageId = messages.value[0].id

    await retryMessage(failedMessageId)

    expect(messages.value).toHaveLength(3)
    expect(messages.value[0].author).toBe("system")
    expect(messages.value[1].author).toBe("user")
    expect(messages.value[2].author).toBe("bot")
  })
})
