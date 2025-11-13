import CloseIcon from '@/assets/icons/close'
import useToast from '@/hooks/use-toast'
import { queryClient } from '@/services'
import { orderController } from '@/services/controller'
import { WALLETS_QUERY_KEYS } from '@/services/controller/wallets'
import { useProfileStore, useV2WithdrawStore } from '@/store'
import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomButton from '@/components/common/custom-button'
import ClockerCountdown from '@/components/v2/payment/clocker-countdown'
import { useScreen } from '@/hooks'

const alertVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

const desktopAlertVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  visible: {
    opacity: 1,
    y: 0,
    width: 250,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
}

export default function WithdrawProcessAlert() {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  const toast = useToast()
  const navigate = useNavigate()

  const status = useV2WithdrawStore((s) => s.status)
  const selectedMethod = useV2WithdrawStore((s) => s.selectedMethod)
  const setIsOpenInputInfo = useV2WithdrawStore((s) => s.setIsOpenInputInfo)

  const orderData = useV2WithdrawStore((s) => s.orderData)
  const setIsOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawRequested
  )
  const isOpenWithdrawRequested = useV2WithdrawStore(
    (s) => s.isOpenWithdrawRequested
  )
  const clearWithdraw = useV2WithdrawStore((s) => s.clearWithdraw)
  const setIsOpenWithdrawFailed = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawFailed
  )

  const [isHidden, setIsHidden] = useState(false)
  const { profile } = useProfileStore()

  const handleOpenDataInfo = () => {
    if (!isMobile) {
      navigate('/payment/withdraw')
    }
    setIsOpenWithdrawRequested(true)
  }

  const handleClose = () => {
    setIsHidden(true)
  }

  const { useGetOrderStatus } = orderController()

  const { data: orderStatusData } = useGetOrderStatus({
    userId: profile?.userId || '',
    orderId: orderData?.orderId || '',
    isProcessing: true
  })

  useEffect(() => {
    if (
      [
        'CANCELED_ON_TIMEOUT',
        'DENIED',
        'COMPLETED_WITH_FAILURE',
        'CANCELED_BY_USER'
      ].includes(orderStatusData?.status)
    ) {
      clearWithdraw()
      if (isOpenWithdrawRequested) {
        setIsOpenWithdrawRequested(false)
        setIsOpenWithdrawFailed(true)
      } else {
        toast.warning(
          t('withdraw.processAlert.failedToast', {
            defaultValue:
              'Withdrawal failed, please try again or contact support.'
          })
        )
      }
    }
    if (['WAITING_APPROVAL', 'ACTIVE'].includes(orderStatusData?.status)) {
      // clearDeposit() do nothing
    }
    if (orderStatusData?.status === 'COMPLETED_WITH_SUCCESS') {
      clearWithdraw()
      toast.success(
        t('withdraw.processAlert.successToast', {
          defaultValue: 'Withdrawal complete. Funds will appear shortly.'
        })
      )
      queryClient.refetchQueries({
        queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS, profile?.userId]
      })
      queryClient.refetchQueries({
        queryKey: [WALLETS_QUERY_KEYS.USER_ORDER_HISTORY_WALLET]
      })
      if (!isMobile) {
        setIsOpenInputInfo(true, selectedMethod)
      }
    }
  }, [orderStatusData])

  if (!isMobile) {
    return (
      <AnimatePresence mode="wait">
        {status === 'inProgress' && !isHidden && (
          <motion.div
            key="withdraw-alert-desktop"
            css={styleDesktop}
            className="flex whitespace-nowrap flex-col gap-2 items-left fixed right-[10px] z-[999] top-[70px] text-white overflow-hidden"
            variants={desktopAlertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative w-full">
              <div className="text-app-medium-14">
                {t('withdraw.processAlert.inProgress', {
                  defaultValue: 'Withdrawal still in progress.'
                })}
              </div>
              <div className="text-app-medium-12 text-[#E3B075]">
                {t('withdraw.processAlert.timeLeft', {
                  defaultValue: 'Time left:'
                })}{' '}
                <ClockerCountdown
                  className="text-app-medium-12 text-[#E3B075]"
                  timeRemainingMinutes={orderData?.orderTimeRemainingMinutes}
                  startTime={orderData?.createdAt}
                  onTimeout={() => {
                    clearWithdraw()
                  }}
                />
              </div>
              <div
                className="cursor-pointer p-3 absolute right-[-10px] top-[-10px]"
                onClick={handleClose}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CustomButton
                onClick={handleOpenDataInfo}
                className="w-fit"
                label={t('withdraw.processAlert.continueWithdraw', {
                  defaultValue: 'Continue Withdraw'
                })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'inProgress' && (
        <motion.div
          key="withdraw-alert"
          css={style}
          className="flex text-app-medium-12 text-[#9E90CF] justify-between items-center w-full overflow-hidden transition-all duration-300"
          style={{
            height: isHidden ? '0px' : 'auto',
            opacity: isHidden ? 0 : 1,
            padding: isHidden ? '0px' : '8px 16px',
            width: isHidden ? '0px' : '100%'
          }}
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div>
            <div>
              {t('withdraw.processAlert.inProgress', {
                defaultValue: 'Withdrawal still in progress.'
              })}
            </div>
            <div>
              {t('withdraw.processAlert.timeLeft', {
                defaultValue: 'Time left:'
              })}{' '}
              <ClockerCountdown
                className="text-white text-app-medium-12"
                timeRemainingMinutes={orderData?.orderTimeRemainingMinutes}
                startTime={orderData?.createdAt}
                onTimeout={() => {
                  clearWithdraw()
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CustomButton
              onClick={handleOpenDataInfo}
              className="w-fit"
              label={t('withdraw.processAlert.continue', {
                defaultValue: 'Continue'
              })}
            />
            <div className="p-3 cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const style = css`
  background: var(
    --YourLoot-Brand-Outline,
    linear-gradient(
      180deg,
      rgba(195, 162, 241, 0.25) 0%,
      rgba(102, 78, 171, 0.25) 100%
    )
  );
  backdrop-filter: blur(15px);
`

const styleDesktop = css`
  border-radius: 10px;
  background:
    radial-gradient(
      237.29% 116.82% at 60.95% -22.92%,
      #362c5a 0%,
      #181526 100%
    ),
    #1d1b28;

  backdrop-filter: blur(15px);
`
