import Fastify from 'fastify'
import { initDatabase } from './src/database.js'
import { depositsRoutes } from './src/routes/deposits.js'
import { ordersRoutes } from './src/routes/orders.js'
import { healthRoutes } from './src/routes/health.js'
import { startStatusSimulation } from './src/services/statusSimulation.js'

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



// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3001
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`🚀 Mock server running on http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
