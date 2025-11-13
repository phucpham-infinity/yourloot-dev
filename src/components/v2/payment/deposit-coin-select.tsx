import { CustomDrawer } from '@/components/common/dw-drawer'
import { DepositCoinGrid } from '@/components/v2/payment/deposit-coin-grid'
import { useV2DepositStore } from '@/store'
import { useTranslation } from 'react-i18next'

const DepositCoinSelect = () => {
  const { t } = useTranslation()
  const isOpenCoinSelect = useV2DepositStore((s) => s.isOpenCoinSelect)
  const setIsOpenCoinSelect = useV2DepositStore((s) => s.setIsOpenCoinSelect)

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('deposit.title', { defaultValue: 'Deposit' })}
          </div>
        </div>
      }
      showBackButton
      onBackButtonClick={() => {
        setIsOpenCoinSelect(false)
      }}
      open={isOpenCoinSelect}
      onOpenChange={(open) => setIsOpenCoinSelect(open)}
      name="DepositCoinSelect"
      type="deposit"
    >
      <div data-name="DepositCoinSelect" className="w-full h-full">
        <DepositCoinGrid />
      </div>
    </CustomDrawer>
  )
}

export default DepositCoinSelect
