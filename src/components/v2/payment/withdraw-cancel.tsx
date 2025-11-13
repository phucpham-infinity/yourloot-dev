import WarningIcon from '@/assets/images/warning-icon.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useToast } from '@/hooks/use-toast'
import { orderController } from '@/services/controller/orders'
import { useV2WithdrawStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const WithdrawalCancel = () => {
  const toast = useToast()
  const { isMobile } = useScreen()
  const { t } = useTranslation()

  const isOpenCancel = useV2WithdrawStore((s) => s.isOpenWithdrawCancel)
  const setIsOpenCancel = useV2WithdrawStore((s) => s.setIsOpenWithdrawCancel)
  const clearWithdraw = useV2WithdrawStore((s) => s.clearWithdraw)
  const orderData = useV2WithdrawStore((s) => s.orderData)

  const {
    mutate: createCancelOrder,
    isPending: isCreatingCancelOrder,
    isSuccess: isCancelOrderSuccess
  } = orderController().useCreateCancelOrder()

  useEffect(() => {
    if (isCancelOrderSuccess) {
      toast.warning(
        t('withdraw.canceled', { defaultValue: 'Withdraw request canceled.' })
      )
      setIsOpenCancel(false)
      clearWithdraw()
    }
  }, [isCancelOrderSuccess])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('withdraw.requestedTitle', {
              defaultValue: 'Withdrawal Requested'
            })}
          </div>
        </div>
      }
      open={isOpenCancel}
      onOpenChange={(open) => setIsOpenCancel(open)}
      hideHeader
      mode={!isMobile ? 'dialog' : 'drawer'}
      contentClassName={'h-[80dvh]'}
      name="WithdrawalCancel"
      type="withdraw"
    >
      <div className="flex flex-col items-center gap-4">
        <img src={WarningIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('withdraw.cancelQuestion', { defaultValue: 'Cancel Withdrawal?' })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('withdraw.cancelDescription', {
            defaultValue:
              'Are you sure you want to cancel your withdrawal request? The funds will return to your balance.'
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('withdraw.cancelAction', {
              defaultValue: 'Cancel Withdrawal'
            })}
            variant="danger"
            className="w-[50%]"
            isLoading={isCreatingCancelOrder}
            onClick={async () => {
              clearWithdraw()
              createCancelOrder({
                orderId: orderData?.orderId,
                userId: orderData?.userId!,
                walletId: orderData?.walletId
              })
            }}
          />
          <CustomButton
            label={t('withdraw.keepRequest', { defaultValue: 'Keep Request' })}
            variant="muted"
            className="w-[50%]"
            onClick={() => {
              setIsOpenCancel(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default WithdrawalCancel
