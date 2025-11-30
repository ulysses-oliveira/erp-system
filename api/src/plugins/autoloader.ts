import { FastifyInstance } from 'fastify'
import path from 'node:path'
import { readdirSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export default async function modulesAutoLoader(app: FastifyInstance) {
  const apiDir = process.cwd().endsWith('api')
    ? process.cwd()
    : path.join(process.cwd(), 'api')

  const modulesDir = path.join(apiDir, 'src', 'modules')

  const modules = readdirSync(modulesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const module of modules) {
    const folder = path.join(modulesDir, module)

    // Buscamos apenas esses dois arquivos possíveis
    const files = ['routes.ts', 'routes.js']
      .map((f) => path.join(folder, f))
      .filter((file) => existsSync(file))

    if (files.length === 0) {
      console.warn(`[Autoloader] Nenhum routes.ts encontrado em ${module}`)
      continue
    }

    // Sempre pega o primeiro (ts no dev, js no build)
    const file = files[0]

    try {
      const mod = await import(pathToFileURL(file).href)

      if (typeof mod.default !== 'function') {
        console.warn(
          `[Autoloader] Ignorado: ${file} (não exporta função default)`
        )
        continue
      }

      app.register(mod.default, { prefix: `/${module}` })

      console.log(
        `[Autoloader] ✅ Rotas carregadas: /${module} → ${path.basename(file)}`
      )
    } catch (err) {
      console.error(`[Autoloader] ❌ Erro ao carregar ${file}:`, err)
    }
  }
}
