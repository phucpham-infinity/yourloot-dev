import {
  getOrdersForStatusUpdate,
  updateOrderStatus,
  incrementStatusCheckCount,
  ORDER_STATUS
} from '../database.js'

// Logic mô phỏng thay đổi trạng thái orders dựa trên amount
export async function simulateStatusChanges() {
  try {
    const orders = await getOrdersForStatusUpdate()
    const now = Date.now()

    for (const order of orders) {
      if (order.statusCheckCount < 5) {
        if (order.status === ORDER_STATUS.WAITING_APPROVAL) {
          await updateOrderStatus(
            order.userId,
            order.orderId,
            ORDER_STATUS.ACTIVE
          )
        }
        continue
      }

      // Logic update status dựa trên amount của order
      let targetStatus
      let failCause = null

      if (order.amount >= 5000) {
        targetStatus = ORDER_STATUS.CANCELED_ON_TIMEOUT
        failCause = 'Transaction timeout'
      } else if (order.amount >= 4000) {
        targetStatus = ORDER_STATUS.COMPLETED_WITH_FAILURE
        failCause = 'Payment processing error'
      } else if (order.amount >= 3000) {
        targetStatus = ORDER_STATUS.COMPLETED_WITH_SUCCESS
      } else if (order.amount >= 2000) {
        targetStatus = ORDER_STATUS.ACTIVE
      } else if (order.amount >= 1000) {
        targetStatus = ORDER_STATUS.DENIED
      } else {
        // Amount < 1000, keep current status or move to ACTIVE
        if (order.status === ORDER_STATUS.WAITING_APPROVAL) {
          targetStatus = ORDER_STATUS.ACTIVE
        } else {
          continue // Keep current status
        }
      }

      // Chỉ update nếu status khác với status hiện tại
      if (order.status !== targetStatus) {
        await updateOrderStatus(
          order.userId,
          order.orderId,
          targetStatus,
          failCause
        )
      }
    }
  } catch (error) {
    console.error('Error in status simulation:', error)
  }
}

// Khởi tạo simulation service
export function startStatusSimulation() {
  // Chạy simulation mỗi 2 giây
  setInterval(simulateStatusChanges, 2000)
  console.log('📊 Status simulation service started')
}
