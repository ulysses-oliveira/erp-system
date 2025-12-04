import { FastifyInstance } from 'fastify'
import { loginController } from './controller'

export default async function authRoutes(app: FastifyInstance) {
  app.post('/login', loginController)
}
