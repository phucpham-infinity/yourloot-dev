import { useAuthStore, useV2WithdrawStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { useV2DepositStore } from '@/store'
import { orderController } from '@/services/controller/orders'

export const useLogout = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const {
    clearDeposit,
    status: depositStatus,
    orderData: depositOrderData
  } = useV2DepositStore()

  const {
    clearWithdraw,
    status: withdrawStatus,
    orderData: withdrawOrderData
  } = useV2WithdrawStore()

  const { mutateAsync: createCancelOrder, isPending: isCreatingCancelOrder } =
    orderController().useCreateCancelOrder()

  const handleLogout = async () => {
    if (depositStatus === 'inProgress' || withdrawStatus === 'inProgress') {
      try {
        await createCancelOrder({
          orderId: depositOrderData?.orderId || withdrawOrderData?.orderId,
          userId: depositOrderData?.userId! || withdrawOrderData?.userId!,
          walletId: depositOrderData?.walletId || withdrawOrderData?.walletId
        })
      } catch (error) {
        console.log('error', error)
      } finally {
        clearDeposit()
        clearWithdraw()
      }
    }
    logout()
    navigate('/')
  }
  return { logout: handleLogout, isPendingLogout: isCreatingCancelOrder }
}
