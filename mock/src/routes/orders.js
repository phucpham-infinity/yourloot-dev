import { getOrder, ORDER_STATUS } from '../database.js'
import { incrementStatusCheckCount } from '../database.js'

// API: Kiểm tra trạng thái order
export async function ordersRoutes(fastify, options) {
  fastify.get(
    '/wallets/users/:userId/orders/:orderId/operation-status',
    async (request, reply) => {
      try {
        const { userId, orderId } = request.params

        const order = await getOrder(userId, orderId)

        await incrementStatusCheckCount(userId, orderId)

        let status = ORDER_STATUS.ACTIVE
        if (order?.statusCheckCount < 299) {
          status = ORDER_STATUS.ACTIVE
        } else {
          status = ORDER_STATUS.COMPLETED_WITH_SUCCESS
          // status = ORDER_STATUS.COMPLETED_WITH_FAILURE
          // status = ORDER_STATUS.CANCELED_ON_TIMEOUT
          // status = ORDER_STATUS.DENIED
        }

        if (!order) {
          return reply.status(404).send({
            success: false,
            error: 'Order not found'
          })
        }

        reply.send({
          content: {
            success: true,
            orderId: order?.orderId,
            status: status,
            failCause: order.failCause,
            statusCheckCount: order?.statusCheckCount || 0,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt
          }
        })
      } catch (error) {
        console.error('Error getting order status:', error)
        reply.status(500).send({
          success: false,
          error: 'Internal server error'
        })
      }
    }
  )
}
