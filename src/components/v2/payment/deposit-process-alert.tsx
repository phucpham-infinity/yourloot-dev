import CloseIcon from '@/assets/icons/close'
import useToast from '@/hooks/use-toast'
import { queryClient } from '@/services'
import { orderController } from '@/services/controller'
import { WALLETS_QUERY_KEYS } from '@/services/controller/wallets'
import { useProfileStore, useV2DepositStore } from '@/store'
import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'
import ClockerCountdown from '@/components/v2/payment/clocker-countdown'
import { useLocation, useNavigate } from 'react-router'
import { useScreen } from '@/hooks'
import DepositCloseDialog from './deposit-close-dialog'

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

export default function DepositProcessAlert() {
  const { isMobile } = useScreen()
  const navigate = useNavigate()

  const location = useLocation()
  const toast = useToast()
  const { t } = useTranslation()
  const status = useV2DepositStore((s) => s.status)
  const orderData = useV2DepositStore((s) => s.orderData)
  const clearDeposit = useV2DepositStore((s) => s.clearDeposit)
  const setConfirmationData = useV2DepositStore((s) => s.setConfirmationData)
  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )
  const isOpenDepositDataInfo = useV2DepositStore(
    (s) => s.isOpenDepositDataInfo
  )
  const isOpenDepositInprogress = useV2DepositStore(
    (s) => s.isOpenDepositInprogress
  )
  const setIsOpenDataInfo = useV2DepositStore((s) => s.setIsOpenDataInfo)
  const setIsOpenDepositSuccessful = useV2DepositStore(
    (s) => s.setIsOpenDepositSuccessful
  )
  const setIsOpenDepositTimeOut = useV2DepositStore(
    (s) => s.setIsOpenDepositTimeOut
  )
  const setIsOpenDepositFailed = useV2DepositStore(
    (s) => s.setIsOpenDepositFailed
  )
  const [isCloseConfirmDialog, setIsCloseConfirmDialog] = useState(false)

  const { profile } = useProfileStore()
  const handleOpenDataInfo = () => {
    navigate('/payment/deposit')
  }

  const handleClose = () => {
    setIsCloseConfirmDialog(true)
  }

  const { useGetOrderStatus } = orderController()

  const { data: orderStatusData } = useGetOrderStatus({
    userId: profile?.userId || '',
    orderId: orderData?.orderId || '',
    isProcessing: status === 'inProgress'
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
      setConfirmationData(null)
      clearDeposit()
      if (
        (isOpenDepositDataInfo || isOpenDepositInprogress) &&
        location.pathname.includes('/payment/deposit')
      ) {
        setOpenDepositInporcess(false)
        setIsOpenDataInfo(false)
        setIsOpenDepositFailed(true)
      } else {
        toast.error(
          t('deposit.processAlert.failedToast', {
            defaultValue: 'Deposit failed, please try again or contact support.'
          })
        )
      }
    }
    if (['WAITING_APPROVAL', 'ACTIVE'].includes(orderStatusData?.status)) {
      // do nothing
      setConfirmationData(null)
    }
    if (orderStatusData?.status === 'COMPLETED_WITH_SUCCESS') {
      setConfirmationData(orderData)
      clearDeposit()
      if (
        (isOpenDepositDataInfo || isOpenDepositInprogress) &&
        location.pathname.includes('/payment/deposit')
      ) {
        setOpenDepositInporcess(false)
        setIsOpenDataInfo(false)
        setIsOpenDepositSuccessful(true)
      } else {
        toast.success(
          t('deposit.v3.depositSuccessful', {
            defaultValue: 'Deposit successful. Balance updated.'
          })
        )
      }
      queryClient.refetchQueries({
        queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS, profile?.userId]
      })
      queryClient.refetchQueries({
        queryKey: [WALLETS_QUERY_KEYS.USER_ORDER_HISTORY_WALLET]
      })
    }
  }, [orderStatusData])

  // useEffect(() => {
  //   if (
  //     !location.pathname.includes('/payment/deposit') &&
  //     !isMobile &&
  //     status === 'inProgress'
  //   ) {
  //     setIsHidden(false)
  //   }
  //   if (
  //     location.pathname.includes('/payment/deposit') &&
  //     !isMobile &&
  //     status === 'inProgress'
  //   ) {
  //     setIsHidden(true)
  //   }
  // }, [location.pathname])

  if (!isMobile) {
    return (
      <AnimatePresence mode="wait">
        {status === 'inProgress' &&
          !location.pathname.includes('/payment/deposit') && (
            <motion.div
              key="deposit-alert-desktop"
              css={styleDesktop}
              className="flex whitespace-nowrap flex-col gap-2 items-left fixed right-[10px] z-[999] top-[70px] text-white overflow-hidden"
              variants={desktopAlertVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="relative w-full">
                <div className="text-app-medium-14">
                  {t('deposit.inProgress', {
                    defaultValue: 'Your payment in progress'
                  })}
                </div>
                <div className="text-app-medium-12 text-[#E3B075]">
                  {t('deposit.timeLeft', { defaultValue: 'Time left:' })}{' '}
                  <ClockerCountdown
                    className="text-app-medium-12 text-[#E3B075]"
                    timeRemainingMinutes={orderData?.orderTimeRemainingMinutes}
                    startTime={orderData?.createdAt}
                    onTimeout={() => {
                      clearDeposit()
                      setIsOpenDepositTimeOut(true)
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
                  label={t('deposit.continueDeposit', {
                    defaultValue: 'Continue Deposit'
                  })}
                />
              </div>
            </motion.div>
          )}
        <DepositCloseDialog
          isOpen={isCloseConfirmDialog}
          onClose={() => setIsCloseConfirmDialog(false)}
        />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'inProgress' && (
        <motion.div
          key="deposit-alert"
          css={style}
          className="flex text-app-medium-12 text-[#9E90CF] justify-between items-center w-full overflow-hidden transition-all duration-300"
          variants={alertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="px-3">
            <div>
              {t('deposit.inProgress', {
                defaultValue: 'Your payment in progress'
              })}
            </div>
            <div>
              {t('deposit.timeLeft', { defaultValue: 'Time left:' })}{' '}
              <ClockerCountdown
                className="text-white text-app-medium-12"
                timeRemainingMinutes={orderData?.orderTimeRemainingMinutes}
                startTime={orderData?.createdAt}
                onTimeout={() => {
                  clearDeposit()
                  setIsOpenDepositTimeOut(true)
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CustomButton
              onClick={handleOpenDataInfo}
              className="w-fit"
              label={t('auth.continue', { defaultValue: 'Continue' })}
            />
            <div className="p-3 cursor-pointer" onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
        </motion.div>
      )}
      <DepositCloseDialog
        isOpen={isCloseConfirmDialog}
        onClose={() => setIsCloseConfirmDialog(false)}
      />
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
