import WarningIcon from '@/assets/images/warning-icon.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useToast } from '@/hooks/use-toast'
import { orderController } from '@/services/controller/orders'
import { useV2DepositStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const DepositCancel = () => {
  const toast = useToast()
  const { isMobile } = useScreen()
  const { t } = useTranslation()

  const isOpenCancel = useV2DepositStore((s) => s.isOpenCancel)
  const setIsOpenCancel = useV2DepositStore((s) => s.setIsOpenCancel)
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)
  const onBack = useV2DepositStore((s) => s.onBack)
  const orderData = useV2DepositStore((s) => s.orderData)

  const {
    mutate: createCancelOrder,
    isPending: isCreatingCancelOrder,
    isSuccess: isCancelOrderSuccess,
    isError: isCancelOrderError
  } = orderController().useCreateCancelOrder()

  useEffect(() => {
    if (isCancelOrderSuccess || isCancelOrderError) {
      toast.warning(
        t('deposit.cancelled', { defaultValue: 'Deposit canceled.' })
      )
      setIsOpenCancel(false)
      clearDeposit()
    }
  }, [isCancelOrderSuccess, isCancelOrderError])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('deposit.title', { defaultValue: 'Deposit' })}
          </div>
        </div>
      }
      open={isOpenCancel}
      hideHeader
      name="DepositCancel"
      type="deposit"
      contentClassName={'h-[80dvh]'}
      mode={!isMobile ? 'dialog' : 'drawer'}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={WarningIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('deposit.cancelQuestion', { defaultValue: 'Cancel Deposit?' })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('deposit.cancelDescription', {
            defaultValue:
              'This will stop the current transaction. Are you sure you want to cancel?'
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('deposit.cancelAction', {
              defaultValue: 'Cancel Deposit'
            })}
            variant={'muted-danger'}
            className="w-[50%]"
            isLoading={isCreatingCancelOrder}
            onClick={async () => {
              clearDeposit()
              createCancelOrder({
                orderId: orderData?.orderId,
                userId: orderData?.userId!,
                walletId: orderData?.walletId
              })
            }}
          />
          <CustomButton
            label={t('common.goBack', { defaultValue: 'Go Back' })}
            variant="muted"
            className="w-[50%]"
            onClick={() => {
              setIsOpenCancel(false)
              if (onBack) {
                onBack()
              } else {
                setIsOpenDataInfo(true)
              }
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositCancel
