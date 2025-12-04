import { FastifyReply, FastifyRequest } from 'fastify'
import { loginService } from './service'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = request.body as any

  const token = await loginService(request.server, email, password)

  return reply.send({ token })
}
