import { sendToEliza } from "@/api/eliza"

export function useChatApi() {
  async function sendMessageToApi(text: string) {
    return sendToEliza(text)
  }

  return {
    sendMessageToApi
  }
}
