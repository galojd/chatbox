import Groq from 'groq-sdk'

export async function getGroqChatCompletion() {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of fast language models'
      },
      {
        role: 'assistant'
      }
    ],
    model: 'llama3-8b-8192',
    max_tokens: 1024,
    stop: 'six',
    stream: true
  })
}
