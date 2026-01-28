import { createClient } from "@connectrpc/connect"
import { createConnectTransport } from "@connectrpc/connect-web"

import { ElizaService } from "@buf/connectrpc_eliza.bufbuild_es/connectrpc/eliza/v1/eliza_pb"

const transport = createConnectTransport({
  baseUrl: "https://demo.connectrpc.com"
})

const client = createClient(ElizaService, transport)

export async function sendToEliza(sentence: string) {
  const response = await client.say({ sentence })
  return response.sentence
}
