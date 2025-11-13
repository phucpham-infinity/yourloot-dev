import {
  viewport,
  isTMA,
  closingBehavior,
  swipeBehavior,
  retrieveLaunchParams
} from '@telegram-apps/sdk-react'
import { on } from '@telegram-apps/bridge'
import { useEffect, useState } from 'react'
import { disableVerticalSwipes, backButton } from '@telegram-apps/sdk'

export const useTelegramMiniApp = () => {
  const [isTelegramMiniApp, setIsTelegramMiniApp] = useState<boolean>(false)
  const [isCheckingTelegramMiniApp, setIsCheckingTelegramMiniApp] =
    useState<boolean>(true)
  const [launchParams, setLaunchParams] = useState<any>(null)

  useEffect(() => {
    try {
      const params = retrieveLaunchParams()
      setLaunchParams(params)
      console.log('LaunchParams =>>>>', params)
    } catch (error) {
      console.log('Not in Telegram Mini App environment', error)
      setLaunchParams(null)
    }
  }, [])

  useEffect(() => {
    setIsCheckingTelegramMiniApp(true)
    isTMA('complete')
      .then(async (res) => {
        setIsTelegramMiniApp(res)
      })
      .finally(async () => {
        setIsCheckingTelegramMiniApp(false)
      })
  }, [])

  return {
    isCheckingTelegramMiniApp,
    isTelegramMiniApp,
    launchParams,
    isFullscreen: viewport.isFullscreen,
    expand: viewport.expand,
    closingBehavior,
    swipeBehavior,
    disableVerticalSwipes,
    onEvent: on,
    backButton,
    viewport: {
      height: viewport.height(),
      width: viewport.width()
    },
    requestFullscreen: viewport.requestFullscreen,
    safeAreaInsets: {
      top: viewport.safeAreaInsets()?.top,
      bottom: viewport.safeAreaInsets()?.bottom,
      left: viewport.safeAreaInsets()?.left,
      right: viewport.safeAreaInsets()?.right
    }
  }
}
