import { User, Role } from '@prisma/client'

export type UserEntity = User

export type CreateUserInput = {
  name?: string
  email: string
  password: string
  role?: Role
}

export type UpdateUserInput = {
  name?: string
  email?: string
  password?: string
  role?: Role
}
