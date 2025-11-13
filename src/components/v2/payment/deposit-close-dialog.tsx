import { Dialog, DialogContent } from '@/components/ui/dialog'
import WarningIcon from '@/assets/images/warning-icon.svg'
import { useToast } from '@/hooks/use-toast'
import { orderController } from '@/services/controller/orders'
import { useV2DepositStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'

interface DepositCloseDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function DepositCloseDialog(props: DepositCloseDialogProps) {
  const { isOpen, onClose } = props

  const toast = useToast()
  const { t } = useTranslation()

  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)
  const orderData = useV2DepositStore((s) => s.orderData)

  const {
    mutate: createCancelOrder,
    isPending: isCreatingCancelOrder,
    isSuccess: isCancelOrderSuccess,
    isError: isCancelOrderError
  } = orderController().useCreateCancelOrder()

  useEffect(() => {
    if (isCancelOrderSuccess || isCancelOrderError) {
      toast.warning(t('deposit.cancelled', 'Deposit canceled.'))
      clearDeposit()
      onClose?.()
    }
  }, [isCancelOrderSuccess, isCancelOrderError])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B0A11] text-white border-app-default p-0">
        <div className="px-4 py-6">
          <div className="flex flex-col items-center gap-4">
            <img src={WarningIcon} className="w-20 h-20" />
            <div className="text-app-medium-14">
              {t('deposit.cancelQuestion', 'Cancel Deposit?')}
            </div>
            <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
              {t(
                'deposit.cancelDescription',
                'This will stop the current transaction. Are you sure you want to cancel?'
              )}
            </div>
            <div className="flex flex-row w-full gap-2 pt-4">
              <CustomButton
                label={t('deposit.cancelAction', 'Cancel Deposit')}
                variant={'muted-danger'}
                className="w-[50%]"
                isLoading={isCreatingCancelOrder}
                onClick={async () => {
                  createCancelOrder({
                    orderId: orderData?.orderId,
                    userId: orderData?.userId!,
                    walletId: orderData?.walletId
                  })
                }}
              />
              <CustomButton
                label={t('common.cancel', 'Cancel')}
                variant="muted"
                className="w-[50%]"
                onClick={() => {
                  onClose?.()
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
