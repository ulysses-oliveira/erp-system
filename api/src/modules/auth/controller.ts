import { FastifyReply, FastifyRequest } from 'fastify'
import { loginService } from './service'

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = request.body as any

  const user = await loginService(email, password)

  const token = request.server.jwt.sign({
    sub: String(user.id),
    email: user.email,
    role: user.role,
  })

  return reply.send({ token })
}
