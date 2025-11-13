import ProcessIcon from '@/assets/images/process-icon.svg'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { useV2DepositStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'

const DepositCancel = () => {
  const { t } = useTranslation()
  const isOpenProcess = useV2DepositStore((s) => s.isOpenProcess)
  const setIsOpenProcess = useV2DepositStore((s) => s.setIsOpenProcess)
  const orderData = useV2DepositStore((s) => s.orderData)

  useEffect(() => {
    if (isOpenProcess && orderData?.successUrl) {
      const newWindow = window.open(orderData?.successUrl, '_blank')
      if (!newWindow) {
        window.open(orderData?.successUrl)
      }
    }
  }, [orderData, isOpenProcess])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('deposit.title', { defaultValue: 'Deposit' })}
          </div>
        </div>
      }
      open={isOpenProcess}
      contentClassName={'h-[80dvh]'}
      onOpenChange={(open) => setIsOpenProcess(open)}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={ProcessIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('deposit.process.waiting', {
            defaultValue: 'Waiting for Transaction...'
          })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('deposit.process.checking', {
            defaultValue: "We're checking your transaction..."
          })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('deposit.process.youCanLeave', {
            defaultValue:
              "You can leave this page — we'll update your balance automatically once detected."
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('gameInside.backToLobby', { defaultValue: 'Go to Lobby' })}
            variant="default"
            onClick={() => {
              setIsOpenProcess(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositCancel
