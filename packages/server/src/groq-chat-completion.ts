import Groq from 'groq-sdk'

export async function getGroqChatCompletion({ message }: { message: string }) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: message
      },
      {
        role: 'assistant',
        content: 'Always response in spanish'
      }
    ],
    model: 'llama3-8b-8192',
    max_tokens: 1024
  })
}
