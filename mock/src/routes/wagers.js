// Health check endpoint
export async function walletsRoutes(fastify, options) {
  fastify.get(
    '/wallets/:walletId/users/:userId/wagers',
    async (request, reply) => {
      reply.send({
        content: {
          amountToMainWager: 0,
          isWageringRequirementsMet: true,
          walletId: request.params.walletId
        }
      })
    }
  )
}
