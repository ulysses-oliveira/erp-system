import bcrypt from 'bcryptjs'
import { prisma } from '../../config/prisma'

export async function loginService(
  email: string,
  password: string,
) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('User not found')

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) throw new Error('Invalid password')

  return user
}
