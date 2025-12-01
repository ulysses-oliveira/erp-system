import { FastifyReply, FastifyRequest } from 'fastify'
import { userService } from './service'
import { CreateUserInput, UpdateUserInput } from './model'

export const userController = {
  list: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await userService.list()
      reply.send(users)
    } catch (error) {
      console.error('[UserController] Erro ao listar usuários:', error)
      reply.status(500).send({ message: 'Internal Server Error', error: String(error) })
    }
  },

  get: async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const userId = parseInt(request.params.userId)
      const user = await userService.get(userId)
      reply.send(user)
    } catch (error) {
      console.error('[UserController] Erro ao buscar usuário:', error)
      reply.status(404).send({ message: String(error) })
    }
  },

  create: async (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const newUser = await userService.create(request.body)
      reply.status(201).send(newUser)
    } catch (error) {
      console.error('[UserController] Erro ao criar usuário:', error)
      reply.status(400).send({ message: String(error) })
    }
  },

  update: async (
    request: FastifyRequest<{ Params: { userId: string }; Body: UpdateUserInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const userId = parseInt(request.params.userId)
      const updatedUser = await userService.update(userId, request.body)
      reply.send(updatedUser)
    } catch (error) {
      console.error('[UserController] Erro ao atualizar usuário:', error)
      reply.status(400).send({ message: String(error) })
    }
  },

  delete: async (
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) => {
    try {
      const userId = parseInt(request.params.userId)
      await userService.delete(userId)
      reply.status(204).send()
    } catch (error) {
      console.error('[UserController] Erro ao deletar usuário:', error)
      reply.status(400).send({ message: String(error) })
    } 
  }
}
