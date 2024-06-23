import { Request, Response } from 'express'
import { handleErrorResponse } from '../handle/error.handle'
import { getGroqChatCompletion } from '../groq-chat-completion'
import { registerChat } from '../service/chat-completion.routes.service'

export const createChatCompletion = async (req: Request, res: Response) => {
  try {
    const { message, userId } = req.body

    const chatCompletion = await getGroqChatCompletion({ message })
    const messageContent = chatCompletion.choices[0].message.content

    if (!messageContent) throw new Error('Cannot generate message response content')

    const completion = await registerChat({
      object: chatCompletion.object,
      createdAt: chatCompletion.created,
      model: chatCompletion.model,
      role: chatCompletion.choices[0].message.role,
      usuario: userId,
      content: messageContent,
      finish_reason: chatCompletion.choices[0].finish_reason
    })

    res.status(200).json({
      ok: true,
      data: completion
    })
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
