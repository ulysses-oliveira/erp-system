import bcrypt from 'bcryptjs'
import { userRepository } from './repository'
import { CreateUserInput } from './model'

export const userService = {
  async list() {
    return userRepository.findAll()
  },

  async get(id: number) {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  async create(input: CreateUserInput) {
    const existingUser = await userRepository.findByEmail(input.email)
    if (existingUser) {
      throw new Error('Email already in use')
    }

    const password_hash = await bcrypt.hash(input.password, 10)

    return userRepository.create({
      ...input,
      password: password_hash,
    })
  },

  async update(id: number, data: Partial<CreateUserInput>) {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    if (data.email && data.email !== user.email) {
      const existingUser = await userRepository.findByEmail(data.email)
      if (existingUser) {
        throw new Error('Email already in use')
      }
    }
    return userRepository.update(id, data)
  },

  async delete(id: number) {
    const user = await userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return userRepository.delete(id)
  },
}
