import { FastifyInstance } from 'fastify'
import { FastifyRequest, FastifyReply } from 'fastify'
import fastifyAuth from '@fastify/auth'

export async function authPlugin(app: FastifyInstance) {
  app.register(fastifyAuth)

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.status(401).send({
        message: 'Token inválido ou ausente',
        error: 'Unauthorized',
      })
    }
  })

  app.decorate('verifyRole', (role: string) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      if (request.user.role !== role) {
        return reply.status(403).send({
          message: 'Acesso negado: permissão insuficiente',
          error: 'Forbidden',
        })
      }
    }
  })
}
