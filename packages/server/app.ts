import path from 'node:path'
import { config } from 'dotenv'
config({ path: path.resolve('..', '..', '.env') })

import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

main()
export async function main() {
  const stream = await getGroqChatCompletion()
  // Print the completion returned by the LLM.
  // console.log(chatCompletion.choices[0]?.message?.content || '')
  for await (const chunk of stream) {
    // Print the completion returned by the LLM.
    // console.log(chunk.choices[0]?.delta?.content || '')
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models'
      }
    ],
    model: 'llama3-8b-8192',
    max_tokens: 1024,
    stop: 'six',
    stream: true
  })
}
