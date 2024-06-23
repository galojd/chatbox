import { AppDataSource } from '../config/database'
import { ChatCompletion } from '../entities/chat-completion.entity'

const chatCompletionRespository = AppDataSource.getRepository(ChatCompletion)

export const registerChat = async (data: Omit<ChatCompletion, 'id'>) => {
  return chatCompletionRespository.save(data)
}
