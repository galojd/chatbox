declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      SQL_HOST: string
      SQL_USER: string
      SQL_PASSWORD: string
      SQL_DATABASE: string
    }
  }
}

export {}
