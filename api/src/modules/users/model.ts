import { User } from '@prisma/client'

export type UserEntity = User

export type CreateUserInput = {
  name?: string
  email: string
}

export type UpdateUserInput = {
  name?: string
  email?: string
}
