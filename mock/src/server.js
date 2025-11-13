import Fastify from 'fastify'
import { initDatabase } from './database.js'
import { depositsRoutes } from './routes/deposits.js'
import { ordersRoutes } from './routes/orders.js'
import { healthRoutes } from './routes/health.js'
import { startStatusSimulation } from './services/statusSimulation.js'

const fastify = Fastify({
  logger: true
})

// Khởi tạo database khi server start
await initDatabase()

// Middleware để log requests
fastify.addHook('preHandler', async (request, reply) => {
  console.log(`${request.method} ${request.url}`)
})

// CORS support
fastify.register(import('@fastify/cors'), {
  origin: true
})

// Đăng ký các routes
fastify.register(depositsRoutes)
fastify.register(ordersRoutes)
fastify.register(healthRoutes)

// Khởi tạo status simulation service
startStatusSimulation()

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3001
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`🚀 Mock server running on http://localhost:${port}`)
    console.log('  GET /health')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
