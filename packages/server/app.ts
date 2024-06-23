import './src/config/envs'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { initDatabase } from './src/config/database'
import { router } from './src/routes'

const PORT = process.env.PORT ?? 8000

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', router)

async function main() {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`Starting development servet at http://localhost:${PORT}`)
  })
}

main()
