import { FastifyInstance } from 'fastify'
import fastifyAuth from '@fastify/auth'

export async function authPlugin(app: FastifyInstance) {
  app.register(fastifyAuth)
}
