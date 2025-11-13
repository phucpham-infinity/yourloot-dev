import { Dialog, DialogContent } from '@/components/ui/dialog'
import WarningIcon from '@/assets/images/time-up.svg'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import { useScreen } from '@/hooks/use-screen'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { useV2DepositStore } from '@/store'
import { useEffect, useState } from 'react'

export default function DepositCloseDialog() {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const isRateLimitError = useV2DepositStore((s) => s.isRateLimitError)
  const setIsRateLimitError = useV2DepositStore((s) => s.setIsRateLimitError)
  const rateLimitStartedAt = useV2DepositStore((s) => s.rateLimitStartedAt)
  const setRateLimitStartedAt = useV2DepositStore(
    (s) => s.setRateLimitStartedAt
  )
  const [countDown, setCountDown] = useState(0)

  useEffect(() => {
    if (!isRateLimitError || !rateLimitStartedAt) {
      return
    }

    const calculateCountDown = () => {
      const now = Date.now()
      const elapsedTime = now - rateLimitStartedAt
      const thirtyMinutes = 30 * 60 * 1000

      if (elapsedTime >= thirtyMinutes) {
        setRateLimitStartedAt(0)
        setIsRateLimitError(false)
        return 0
      }

      const remainingTime = thirtyMinutes - elapsedTime
      return Math.max(0, Math.floor(remainingTime / 1000))
    }

    setCountDown(calculateCountDown())

    const interval = setInterval(() => {
      const newCountDown = calculateCountDown()
      setCountDown(newCountDown)
      if (newCountDown === 0) {
        clearInterval(interval)
        setRateLimitStartedAt(0)
        setIsRateLimitError(false)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isRateLimitError, rateLimitStartedAt, setRateLimitStartedAt])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const DepositLimitContent = () => {
    return (
      <div className="px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          <img src={WarningIcon} className="w-20 h-20" />
          <div className="text-app-bold-14">
            {t('deposit.rateLimit.title', 'Deposit limit reached')}
          </div>
          <div className="text-app-medium-14 leading-[16px] w-[70%] text-center text-[#9E90CF]">
            {t(
              'deposit.rateLimit.description',
              "You've reached your limit of 3 deposit attempts within the past 30 minutes."
            )}
            <br />
            <span className="pt-4 block">
              {t(
                'deposit.rateLimit.tryAgain',
                'You can try again in {{time}}',
                {
                  time: formatTime(countDown)
                }
              )}
            </span>
          </div>
          <div className="flex flex-row w-full gap-2 pt-4">
            <CustomButton
              label={t('common.cancel', 'Cancel')}
              variant="default"
              className="w-full"
              onClick={() => {
                setIsRateLimitError(false)
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return isMobile ? (
    <CustomDrawer
      hideHeader
      open={isRateLimitError}
      onOpenChange={setIsRateLimitError}
      title=""
      contentClassName="border-none h-[80dvh]"
      bodyClassName="py-6 px-0 min-w-[400px]"
    >
      <DepositLimitContent />
    </CustomDrawer>
  ) : (
    <Dialog open={isRateLimitError} onOpenChange={setIsRateLimitError}>
      <DialogContent className="bg-[#0B0A11] text-white border-app-default p-0 w-[400px]">
        <DepositLimitContent />
      </DialogContent>
    </Dialog>
  )
}
