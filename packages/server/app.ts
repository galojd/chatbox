import './config/envs'
import { getGroqChatCompletion } from './groq-chat-completion'
import { delay } from './lib/utils'

async function main() {
  const stream = await getGroqChatCompletion()

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

main()
