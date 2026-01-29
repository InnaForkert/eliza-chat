export async function delayRequest(start: number) {
  const finishedInMs = Date.now() - start
  const MIN_PENDING_MS = 400

  if (finishedInMs < MIN_PENDING_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_PENDING_MS - finishedInMs))
  }
}
