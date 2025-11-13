// Health check endpoint
export async function healthRoutes(fastify, options) {
  fastify.get('/health', async (request, reply) => {
    reply.send({ status: 'OK', timestamp: new Date().toISOString() })
  })
}
