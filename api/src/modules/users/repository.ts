import { prisma } from '../../config/prisma'
import { CreateUserInput, UserEntity } from './model'

export const userRepository = {
  async findAll(): Promise<UserEntity[]> {
    return prisma.user.findMany()
  },

  async findById(id: number): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { id } })
  },

  async findByEmail(email: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({ where: { email } })
  },

  async create(data: CreateUserInput): Promise<UserEntity> {
    return prisma.user.create({ data })
  },

  async update(id: number, data: Partial<CreateUserInput>): Promise<UserEntity> {
    return prisma.user.update({ where: { id }, data })
  },

  async delete(id: number): Promise<UserEntity> {
    return prisma.user.delete({ where: { id }})
  }
}
