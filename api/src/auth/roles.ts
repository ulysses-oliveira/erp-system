import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyRole(role: string) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    if (request.user.role !== role) {
      reply.code(403).send({
        message: 'Acesso negado: permissão insuficiente',
        error: 'Forbidden',
      })
    }
  }
}
