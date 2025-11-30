import { prisma } from './config/prisma'
import { env } from './config/env'
import { buildApp } from './app'

async function bootstrap() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...')
    await prisma.$connect()
    // await prisma.$queryRaw`SELECT 1` // força o handshake real
    console.log('✅ Banco conectado com sucesso!')

    const app = buildApp()

    await app.listen({ port: env.PORT, host: '0.0.0.0' })

    console.log(`🔥 Servidor rodando: http://localhost:${env.PORT}`)
    console.log(`📚 Documentação: http://localhost:${env.PORT}/docs`)
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor ou conectar no banco:', error)
    process.exit(1)
  }
}

bootstrap()
