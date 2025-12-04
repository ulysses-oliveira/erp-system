import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'
import { env } from '../config/env'

export async function jwtPlugin(app: FastifyInstance) {
  app.register(jwt, {
    secret: env.JWT_SECRET,
  })
}
