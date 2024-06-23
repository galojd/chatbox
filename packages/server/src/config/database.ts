import path from 'node:path'
import { DataSource } from 'typeorm'

const ENTITIES_PATH = path.join(__dirname, '..', 'entities', '**/*.entity.{ts,js}')

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'root',
  password: 'root',
  database: 'AlmacenOnline',
  synchronize: true,
  entities: [ENTITIES_PATH],
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
})

export const initDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      console.log('Data source has been initialized.')
    }
  } catch (error) {
    console.error('Error during DataSource initialization', error)
  }
}
