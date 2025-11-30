import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'

import modulesAutoLoader from './plugins/autoloader'

export function buildApp() {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  // Log de todas as requisições
  app.addHook('onRequest', async (request, reply) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} ${reply.statusCode}`)
  })

  // Zod serializers/validators
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  // CORS
  app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // credentials: true, // Habilite se precisar de cookies/autenticação
  })

  // Swagger
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'ERP System API',
        description: 'API documentation for the ERP System',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  // Scalar API docs
  app.register(ScalarApiReference, {
    routePrefix: '/docs',
  })

  // Aqui você registra suas rotas
  app.get('/', async (_request, reply) => {
    reply.send({ message: 'Welcome to the ERP System API' })
  })
  app.register(modulesAutoLoader)

  return app
}
