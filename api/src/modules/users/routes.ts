import { FastifyInstance } from 'fastify'
import { userController } from './controller'
import { createUserSchema, getUserSchema } from './schema'

export default async function usersRoutes(app: FastifyInstance) {
  app.get('/', userController.list)

  app.get('/:userId', { schema: getUserSchema }, userController.get)

  app.post('/', { schema: createUserSchema }, userController.create)

  app.put('/:userId', { schema: createUserSchema }, userController.update)

  app.delete('/:userId', userController.delete)
}
