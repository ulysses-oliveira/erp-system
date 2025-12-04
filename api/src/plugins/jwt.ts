import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from '@fastify/jwt'
import { env } from '../config/env'

export default fp(async (app) => {
  app.register(jwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '7d' },
  })

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.send(err)
    }
  })
})
