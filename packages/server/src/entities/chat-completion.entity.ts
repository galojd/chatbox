import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'ChatCompletion' })
export class ChatCompletion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  object: string

  @Column()
  createdAt: number

  @Column({ length: 50 })
  model: string

  @Column({ length: 50 })
  role: string

  @Column()
  usuario: number

  @Column('text')
  content: string

  @Column({ length: 20 })
  finish_reason: string
}
