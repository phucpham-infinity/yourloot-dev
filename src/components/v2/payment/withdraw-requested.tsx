import WarningIcon from '@/assets/images/process-icon.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2WithdrawStore } from '@/store'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'
import clsx from 'clsx'

const WithdrawalRequested = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const isOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.isOpenWithdrawRequested
  )
  const setIsOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawRequested
  )
  const setIsOpenWithdrawCancel = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawCancel
  )
  const method = useV2WithdrawStore((s) => s.method)

  const handleCancel = () => {
    setIsOpenWithdrawRequested(false)
    setIsOpenWithdrawCancel(true)
  }

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
      open={isOpenWithdrawRequested}
      onOpenChange={(open) => setIsOpenWithdrawRequested(open)}
      name="WithdrawalRequested"
      mode={!isMobile ? 'drawer' : 'dialog'}
      contentClassName={'h-[80dvh]'}
      type="withdraw"
    >
      <div>
        {!isMobile && (
          <div className="text-app-main-20 pb-6 flex items-center gap-1">
            <div>
              {method === 'cryptocurrency'
                ? 'Crypto withdrawal'
                : 'Bank withdrawal'}
            </div>
          </div>
        )}
        <div
          className={clsx('flex flex-col items-center gap-4', {
            'px-[24px] pt-[24px] pb-[20px] border-app-v2 rounded-[10px]':
              !isMobile
          })}
        >
          <img src={WarningIcon} className="w-20 h-20" />
          <div className="text-app-medium-14 leading-[14px]">
            {t('withdraw.requested.submitted', {
              defaultValue: 'Your withdrawal has been submitted'
            })}
          </div>
          <div className="text-app-medium-12 leading-[12px] w-full text-center text-[#9E90CF]">
            {t('withdraw.requested.processingInfo', {
              defaultValue:
                "Processing time varies by method. We'll notify you when it's complete."
            })}
          </div>
          <div className="flex flex-row w-full gap-2 pt-4">
            <CustomButton
              variant="invisible"
              onClick={handleCancel}
              color="#D94244"
              className="w-full text-[10px] text-[#D94244]!"
              label={t('withdraw.cancelAction', {
                defaultValue: 'Cancel Withdrawal'
              })}
            />
          </div>
        </div>
      </div>
    </CustomDrawer>
  )
}

export default WithdrawalRequested
