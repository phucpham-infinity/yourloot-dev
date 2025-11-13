import WarningIcon from '@/assets/images/waring-process.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2WithdrawStore } from '@/store'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const WithdrawalRequested = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const isOpenWithdrawUnavailable = useV2WithdrawStore(
    (s) => s.isOpenWithdrawUnavailable
  )
  const setIsOpenWithdrawUnavailable = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawUnavailable
  )
  const setIsOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawRequested
  )

  const orderData = useV2WithdrawStore((s) => s.orderData)

  const handleCancel = () => {
    setIsOpenWithdrawUnavailable(false)
  }

  const handleFinish = () => {
    setIsOpenWithdrawUnavailable(false)
    setIsOpenWithdrawRequested(true)
  }

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('withdraw.unavailable.title', {
              defaultValue: 'Withdrawal Unavailable'
            })}
          </div>
        </div>
      }
      open={isOpenWithdrawUnavailable}
      onOpenChange={(open) => setIsOpenWithdrawUnavailable(open)}
      name="WithdrawalUnavailable"
      type="withdraw"
      mode={!isMobile ? 'dialog' : 'drawer'}
      contentClassName={'h-[80dvh]'}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={WarningIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('withdraw.unavailable.cannotNow', {
            defaultValue: 'Can’t Withdraw Right Now'
          })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('withdraw.unavailable.description', {
            defaultValue:
              'You have a deposit in progress. Please wait until it’s complete to withdraw funds.'
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          {!isEmpty(orderData) && (
            <CustomButton
              label={t('common.finish', { defaultValue: 'Finish' })}
              variant="default"
              className="w-[50%]"
              onClick={handleFinish}
            />
          )}
          <CustomButton
            label={t('common.cancel', { defaultValue: 'Cancel' })}
            variant="muted"
            className={clsx(!isEmpty(orderData) ? 'w-[50%]' : 'w-[100%]')}
            onClick={handleCancel}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default WithdrawalRequested
