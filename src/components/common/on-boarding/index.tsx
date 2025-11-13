import Joyride, { Step } from 'react-joyride'
import clsx from 'clsx'

import TourContent from '@/components/common/tour'
import { useWalletStore } from '@/store/slices/wallet'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/auth'
import { useOnBoardingStore } from '@/store/slices/on-boarding'
import { isMobile } from 'react-device-detect'
import { userController, UserEventType } from '@/services/controller/users'
import { useGetOnboardingStatus } from '@/services/controller/loyalty'

export const OnBoarding = () => {
  const navigate = useNavigate()
  const walletDefault = useWalletStore((state) => state.wallets[0])

  const { userId } = useAuthStore()
  const { currentStep, setCurrentStep, isOpen, setIsOpen } =
    useOnBoardingStore()

  const { useUserEvent } = userController()
  const { mutate: userEvent } = useUserEvent()

  const { data: onBoardingStatus } = useGetOnboardingStatus()

  useEffect(() => {
    if (onBoardingStatus) {
      if (onBoardingStatus.content) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    // setIsOpen(true)
    // setCurrentStep(0)
  }, [onBoardingStatus])

  const steps: Step[] = [
    {
      target: '.first-step',
      content: (
        <TourContent
          step={1}
          title="1/4 Welcome to Your Loot!"
          des1="Here is a quick guide, how to use Your Loot to maximum!"
          des2="Click here to access my profile!"
          className={clsx('pb-[260px]', isMobile && 'pb-[0px]')}
          onNextStep={() => {
            setCurrentStep(1)
          }}
          onSkip={() => {
            userEvent({
              userEvent: UserEventType.OBG_SKIP_1
            })
            setCurrentStep(5)
          }}
          onClick={() => {
            setIsOpen(false)
            navigate('/profile')
          }}
        />
      ),
      offset: 0,
      hideFooter: true,
      disableBeacon: true,
      hideCloseButton: true,
      isFixed: true,
      placement: isMobile ? 'top-start' : 'right-end',
      styles: {
        tooltip: {
          padding: 0,
          height: 'fit-content',
          width: 'fit-content'
        }
      }
    },
    {
      target: '.second-step',
      content: (
        <TourContent
          step={2}
          title="2/4 Welcome to Your Loot!"
          des1="See your bonuses and active promotions by clicking here."
          des2="Click here to visit promotions page!"
          className={clsx('pb-[120px]', isMobile && 'pb-[0px]')}
          actionsPosition={'left'}
          onNextStep={() => {
            setCurrentStep(2)
          }}
          onSkip={() => {
            userEvent({
              userEvent: UserEventType.OBG_SKIP_2
            })
            setCurrentStep(5)
          }}
          onClick={() => {
            setIsOpen(false)
            navigate('/bonus')
          }}
          arrowPosition={'right'}
        />
      ),
      offset: 0,
      hideFooter: true,
      disableBeacon: true,
      hideCloseButton: true,
      isFixed: true,
      placement: isMobile ? 'top-start' : 'left-end',
      styles: {
        tooltip: {
          padding: 0,
          height: 'fit-content',
          width: 'fit-content'
        }
      }
    },
    {
      target: '.third-step',
      content: (
        <TourContent
          step={3}
          title="3/4 Welcome to Your Loot!"
          des1="Unlock exclusive perks."
          des2="Click here to visit our store!"
          className={clsx('pb-[330px]', isMobile && 'pb-[0px]')}
          arrowPosition="right"
          actionsPosition={'left'}
          onNextStep={() => {
            setCurrentStep(3)
          }}
          onSkip={() => {
            userEvent({
              userEvent: UserEventType.OBG_SKIP_3
            })
            setCurrentStep(5)
          }}
          onClick={() => {
            setIsOpen(false)
            navigate('/store')
          }}
        />
      ),
      offset: 0,
      hideFooter: true,
      disableBeacon: true,
      hideCloseButton: true,
      isFixed: true,
      placement: isMobile ? 'top-start' : 'left-end',
      styles: {
        tooltip: {
          padding: 0,
          height: 'fit-content',
          width: 'fit-content'
        }
      }
    },
    {
      target: '.fourth-step',
      content: (
        <TourContent
          step={4}
          title="4/4 Welcome to Your Loot!"
          des1="Make your first deposit!"
          des2="Click here to visit Deposit page!"
          className={clsx('pb-[60px]', isMobile && 'pb-[0px]')}
          arrowPosition={isMobile ? 'left-sm' : 'right'}
          onNextStep={() => {
            userEvent({
              userEvent: UserEventType.OBG_SKIP_4
            })
            setCurrentStep(4)
          }}
          onSkip={() => {
            setCurrentStep(5)
          }}
          onClick={() => {
            setIsOpen(false)
            navigate(
              `/deposit/${walletDefault?.currency}/cryptocurrency?close-back=${location.pathname}`
            )
          }}
        />
      ),
      offset: 0,
      hideFooter: true,
      disableBeacon: true,
      hideCloseButton: true,
      isFixed: true,
      placement: isMobile ? 'top-start' : 'left-end',
      styles: {
        tooltip: {
          padding: 0,
          height: 'fit-content',
          width: 'fit-content'
        }
      }
    }
  ]

  return (
    <div>
      {userId && (
        <Joyride
          run={isOpen}
          scrollOffset={isMobile ? 400 : 500}
          callback={(data) => {
            if (data.action === 'update') {
              userEvent({
                userEvent:
                  UserEventType[
                    `OBG_NEXT_${data.index + 1}` as keyof typeof UserEventType
                  ]
              })
            }
            if (data.action === 'close' && data.lifecycle === 'init') {
              setIsOpen(false)
            }
          }}
          stepIndex={currentStep?.[userId ?? ''] ?? 0}
          floaterProps={{
            hideArrow: true,
            styles: {
              floater: {
                padding: 0
              }
            }
          }}
          styles={{
            options: {
              arrowColor: 'transparent',
              backgroundColor: 'transparent',
              overlayColor: 'rgba(0, 0, 0, 0.7)'
            },
            spotlight: {
              borderRadius: '20px'
            }
          }}
          spotlightPadding={0}
          steps={steps}
        />
      )}
    </div>
  )
}
