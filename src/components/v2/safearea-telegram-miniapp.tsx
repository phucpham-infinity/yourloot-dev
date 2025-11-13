import { useTelegramMiniApp } from '@/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { requestFullscreen, isFullscreen } from '@telegram-apps/sdk';

interface SafeAreaTelegramMiniAppProps {
  children: React.ReactNode
  className: string
  style?: React.CSSProperties
}

export default function SafeAreaTelegramMiniApp(
  props: SafeAreaTelegramMiniAppProps
) {
  const { children, className = '', style = {}, ...rest } = props
  const {
    isTelegramMiniApp,
    safeAreaInsets,
    viewport,
    isCheckingTelegramMiniApp,
    backButton,
    launchParams,
  } = useTelegramMiniApp()

  const navigate = useNavigate()

  const handleBackButtonClick = async () => {
    if (backButton.onClick.isAvailable()) {
      function listener() {
        navigate(-1)
      }
      const offClick = backButton.onClick(listener)
      offClick()
      backButton.onClick(listener)
    }
  }

  useEffect(() => {
    if (isTelegramMiniApp) {
      handleBackButtonClick()
    }
  }, [isTelegramMiniApp])

  useEffect(() => {
    if (!isTelegramMiniApp) {
      console.log('[SafeArea] Not Telegram Mini App, skipping fullscreen check')
      return
    }

    const platform = launchParams?.tgWebAppPlatform
    console.log('[SafeArea] Platform:', platform)

    console.log('isFullscreen() 0', isFullscreen());

    if (platform !== 'macos') {
      console.log('[SafeArea] Not macOS platform, skipping fullscreen check')
      return
    }

    console.log('[SafeArea] Starting fullscreen check interval for macOS')
    // let attemptCount = 0
    // const maxAttempts = 10

    if (!isFullscreen()) {
      try {
        requestFullscreen()
      } catch (error) {
        console.log('error', error)
      }
    }

    // const intervalId = setInterval(() => {
    //   attemptCount++
    //   console.log(`[SafeArea] Attempt ${attemptCount}/${maxAttempts}`)
    //   console.log('isFullscreen() 1', isFullscreen());

    //   if (isFullscreen()) {
    //     console.log('[SafeArea] Already fullscreen, stopping interval')
    //     clearInterval(intervalId)
    //     return
    //   }

    //   if (attemptCount >= maxAttempts) {
    //     console.log('[SafeArea] Max attempts reached, stopping interval')
    //     clearInterval(intervalId)
    //     return
    //   }

    //   const isAvailable = requestFullscreen.isAvailable()
    //   console.log('[SafeArea] requestFullscreen available:', isAvailable)

    //   if (isAvailable) {
    //     console.log('[SafeArea] Calling requestFullscreen()')
    //     requestFullscreen()
    //   }
    // }, 1000)

    return () => {
      console.log('[SafeArea] Cleaning up fullscreen check interval')

    }
  }, [isTelegramMiniApp, launchParams, isFullscreen()])

  const safeAreaClassName = (): string => {
    if (isTelegramMiniApp && isFullscreen()) {
      return className?.replace(/\bmin-h-screen\b/g, '').trim() || ''
    }
    return className || ''
  }

  const safeAreaStyle = (): React.CSSProperties => {
    const baseStyle = {
      ...(style || {}),
      opacity: isCheckingTelegramMiniApp ? 0 : 1
    }

    // Apply safe area padding when:
    if (isTelegramMiniApp && isFullscreen()) {
      baseStyle.paddingTop = `${safeAreaInsets.top + 52}px`
      // baseStyle.paddingBottom = `${safeAreaInsets.bottom + 24}px`

      // Handle min-h-screen with adjusted height
      if (className.includes('min-h-screen') || style.minHeight === '100vh') {
        const totalSafeAreaHeight = safeAreaInsets.top + safeAreaInsets.bottom
        const viewportHeight = viewport?.height || window.innerHeight
        baseStyle.minHeight = `calc(${viewportHeight}px - ${totalSafeAreaHeight}px)`
      }
    }

    return baseStyle
  }

  if (isTelegramMiniApp && isFullscreen()) {
    return (
      <div className={safeAreaClassName()} style={safeAreaStyle()} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{ ...(style || {}), opacity: isCheckingTelegramMiniApp ? 0 : 1 }}
      {...rest}
    >
      {children}
    </div>
  )
}
