import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../config/prisma'

export async function loginService(
  app: FastifyInstance,
  email: string,
  password: string,
) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) throw new Error('Invalid password')

  return app.jwt.sign({
    sub: String(user.id),
    email: user.email,
    role: user.role,
  })
}
