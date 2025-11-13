import Icon from '@/assets/images/time-up.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2DepositStore } from '@/store'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const DepositTimeOut = () => {
  const { isMobile } = useScreen()
  const { t } = useTranslation()
  const selectedMethod = useV2DepositStore((s) => s.selectedMethod)
  const isOpenDepositTimeOut = useV2DepositStore((s) => s.isOpenDepositTimeOut)
  const setIsOpenDepositTimeOut = useV2DepositStore(
    (s) => s.setIsOpenDepositTimeOut
  )
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {selectedMethod === 'cryptocurrency'
              ? t('deposit.v3.cryptocurrencyPayment', 'Cryptocurrency Payment')
              : t('deposit.v3.bankPayment', 'Bank payment')}
          </div>
        </div>
      }
      mode={!isMobile ? 'dialog' : 'drawer'}
      open={isOpenDepositTimeOut}
      onOpenChange={(open) => {
        setIsOpenDepositTimeOut(open)
        if (!open) {
          clearDeposit()
        }
      }}
      name="DepositTimeOut"
      type="deposit"
      contentClassName="h-[80dvh]"
    >
      <div className="flex flex-col items-center gap-4">
        <img src={Icon} className="w-20 h-20" />
        <div className="text-app-bold-14 leading-0">
          {t('deposit.timeIsUp', { defaultValue: 'Time is up' })}
        </div>
        <div className="text-app-medium-14 w-full text-center text-[#9E90CF]">
          {t('deposit.v3.transactionTimeout', {
            defaultValue:
              "We didn't receive your transaction in time. If the funds were sent, please contact support."
          })}
        </div>
        <div className="flex flex-col w-full gap-2 pt-3">
          <CustomButton
            label={t('deposit.v3.contactSupport', 'Contact Support')}
            className={clsx('w-[100%]')}
            onClick={() => {
              clearDeposit()
              setIsOpenDepositTimeOut(false)
            }}
          />
          <CustomButton
            label={t('deposit.v3.home', 'Home')}
            variant="muted"
            className={clsx('w-[100%]')}
            onClick={() => {
              clearDeposit()
              setIsOpenDepositTimeOut(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositTimeOut
