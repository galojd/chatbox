import { Router } from 'express'
import { createChatCompletion } from '../controllers/chat-completion.controller'

const router = Router()

router.post('/', createChatCompletion)

export { router }
