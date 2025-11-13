import Loader from '@/components/common/loader'
import { forwardRef, useEffect, useState } from 'react'
import { useTelegramMiniApp } from '@/hooks'
import { useSearchParams } from 'react-router-dom'
import { useScreen } from '@/hooks'

interface GameScreenProps {
  launchUrl?: string
  isPostingGame: boolean
}

const GameScreen = forwardRef<HTMLIFrameElement, GameScreenProps>(
  ({ launchUrl, isPostingGame }, ref) => {
    const { isTelegramMiniApp, safeAreaInsets, viewport } = useTelegramMiniApp()
    const { isMobile } = useScreen()
    const [searchParams] = useSearchParams()
    const [finalHeight, setFinalHeight] = useState(0)
    const [paddingTop, setPaddingTop] = useState('0')
    const [iframeSrc, setIframeSrc] = useState<string | undefined>(launchUrl)

    const isFullscreen = searchParams.get('game_mode') === 'fullscreen'

    // Calculate height configuration based on platform and mode
    const getHeightConfig = () => {
      if (isFullscreen) {
        if (!isTelegramMiniApp) {
          return { height: window.innerHeight, paddingTop: '0px' }
        }
        return {
          height: viewport.height - (safeAreaInsets?.top || 0) - 30,
          paddingTop: `${(safeAreaInsets?.top || 0) + 60}px`
        }
      }
      // Default mode
      const containerHeight =
        isTelegramMiniApp && isMobile
          ? window.innerHeight - 160
          : window.innerHeight - 87

      return {
        height: isMobile ? containerHeight : 654,
        paddingTop: '0px'
      }
    }

    useEffect(() => {
      const { height, paddingTop } = getHeightConfig()
      setFinalHeight(height)
      setPaddingTop(paddingTop)
    }, [isFullscreen, isTelegramMiniApp, isMobile, safeAreaInsets?.top])

    // Force iframe reload when launchUrl changes
    useEffect(() => {
      if (launchUrl) {
        // Add cache-busting parameter to force reload
        const cacheBustingUrl = `${launchUrl}${launchUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`
        
        // First clear the src to force unmount
        setIframeSrc(undefined)
        
        // Use a longer delay and set the new URL with cache-busting
        const timeout = setTimeout(() => {
          setIframeSrc(cacheBustingUrl)
        }, 100)
        
        return () => clearTimeout(timeout)
      }
    }, [launchUrl])

    return (
      <div className="w-full h-full relative inline-block">
        {!isPostingGame && iframeSrc && (
          <div className="w-full h-full relative z-[10] self-stretch">
            <iframe
              ref={ref}
              src={iframeSrc}
              className="w-full rounded-[10px] relative md:rounded-[0px]"
              style={{ height: finalHeight, paddingTop }}
            ></iframe>
          </div>
        )}
        <div className="flex min-h-full w-full justify-center items-center h-full absolute top-0 left-0 z-0">
          <Loader />
        </div>
      </div>
    )
  }
)

GameScreen.displayName = 'GameScreen'

export default GameScreen
