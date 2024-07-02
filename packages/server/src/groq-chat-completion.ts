import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Groq from 'groq-sdk'

const PROJECT_PATH = resolve('..', '..', 'promps', 'web-app', 'TECNICO.txt')

const getInstruccions = () => readFileSync(PROJECT_PATH, { encoding: 'utf-8' })

export async function getGroqChatCompletion({ message }: { message: string }) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  const instruccions = getInstruccions()

  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: message
      },
      {
        role: 'assistant',
        content: instruccions
      }
    ],
    model: 'llama3-8b-8192',
    max_tokens: 1024
  })
}
