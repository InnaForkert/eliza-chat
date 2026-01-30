import { sendToEliza } from "@/api/eliza"
import { describe, expect, vi, it, beforeEach } from "vitest"
import { useChat } from "./useChat"
import { UserMessage } from "@/types/chat"

vi.mock("@/api/eliza.ts")

describe("useChat", () => {
  beforeEach(() => {
    const { messages } = useChat()
    messages.value = []
    vi.clearAllMocks()
  })

  it("adds user and bot messages on successful send", async () => {
    vi.mocked(sendToEliza).mockResolvedValue("Test bot response message")

    const { messages, sendMessage } = useChat()

    await sendMessage("Hi")

    expect(messages.value).toHaveLength(2)
    expect(messages.value[0].author).toBe("user")
    expect(messages.value[1].author).toBe("bot")
  })

  it("marks message as failed and creates system message on error", async () => {
    vi.mocked(sendToEliza).mockRejectedValue(new Error("Network error"))

    const { messages, sendMessage } = useChat()

    await sendMessage("Hi")

    expect(messages.value).toHaveLength(2)
    expect(messages.value[0].author).toBe("user")
    expect((messages.value[0] as UserMessage).status).toBe("failed")
    expect(messages.value[1].author).toBe("system")
  })

  it("retries failed message", async () => {
    vi.mocked(sendToEliza)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce("Recovered")

    const { messages, sendMessage, retryMessage } = useChat()

    await sendMessage("Hi")

    const failedMessageId = messages.value[0].id

    await retryMessage(failedMessageId)

    expect(messages.value).toHaveLength(3)
    expect(messages.value[0].author).toBe("system")
    expect(messages.value[1].author).toBe("user")
    expect(messages.value[2].author).toBe("bot")
  })
})
