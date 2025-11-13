import CheckIcon from '@/assets/images/check-done.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2DepositStore } from '@/store'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const DepositSuccessful = () => {
  const { isMobile } = useScreen()
  const { t } = useTranslation()
  const isOpenDepositSuccessful = useV2DepositStore(
    (s) => s.isOpenDepositSuccessful
  )
  const setIsOpenDepositSuccessful = useV2DepositStore(
    (s) => s.setIsOpenDepositSuccessful
  )
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)
  const selectedMethod = useV2DepositStore((s) => s.selectedMethod)

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
      open={isOpenDepositSuccessful}
      name="DepositSuccessful"
      onOpenChange={(open) => {
        setIsOpenDepositSuccessful(open)
        if (!open) {
          clearDeposit()
        }
      }}
      mode={!isMobile ? 'dialog' : 'drawer'}
      type="deposit"
      contentClassName="h-[80dvh]"
    >
      <div className="flex flex-col items-center gap-4">
        <img src={CheckIcon} className="w-20 h-20" />
        <div className="text-app-bold-14 leading-0">
          {t('deposit.successful.title', {
            defaultValue: 'Payment successful'
          })}
        </div>
        <div className="text-app-medium-14 w-[90%] text-center text-[#9E90CF]">
          {t('deposit.successful.description', {
            defaultValue: 'Funds will appear in your balance soon.'
          })}
        </div>

        <div className="flex flex-col w-full gap-2 pt-4">
          <CustomButton
            label={t('deposit.v3.home', 'Home')}
            className={clsx('w-[100%]')}
            variant="default"
            onClick={() => {
              clearDeposit()
              setIsOpenDepositSuccessful(false)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositSuccessful
