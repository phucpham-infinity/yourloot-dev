import WarningIcon from '@/assets/images/waring-process.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useV2WithdrawStore } from '@/store'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks'

const WithdrawalFailed = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const isOpenWithdrawFailed = useV2WithdrawStore((s) => s.isOpenWithdrawFailed)
  const setIsOpenWithdrawFailed = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawFailed
  )

  const beforeMethod = useV2WithdrawStore((s) => s.beforeMethod)
  const setIsOpenInputInfo = useV2WithdrawStore((s) => s.setIsOpenInputInfo)

  const handleCancel = () => {
    setIsOpenWithdrawFailed(false)
  }

  const handleTryAgain = () => {
    setIsOpenInputInfo(true, beforeMethod)
    setIsOpenWithdrawFailed(false)
  }

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('withdraw.failed.title', { defaultValue: 'Withdrawal Failed' })}
          </div>
        </div>
      }
      open={isOpenWithdrawFailed}
      onOpenChange={(open) => setIsOpenWithdrawFailed(open)}
      name="WithdrawalFailed"
      mode={!isMobile ? 'dialog' : 'drawer'}
      contentClassName={'h-[80dvh]'}
      type="withdraw"
    >
      <div className="flex flex-col items-center gap-4">
        <img src={WarningIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('withdraw.failed.somethingWrong', {
            defaultValue: 'Something went wrong'
          })}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('withdraw.failed.description', {
            defaultValue: 'Please try again or contact support.'
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            onClick={handleTryAgain}
            className="w-[48%] text-[10px] "
            label={t('withdraw.failed.tryAgain', { defaultValue: 'Try Again' })}
          />
          <CustomButton
            variant="muted"
            onClick={handleCancel}
            className="w-[48%] text-[10px] "
            label={t('withdraw.failed.contactSupport', {
              defaultValue: 'Contact Support'
            })}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default WithdrawalFailed
