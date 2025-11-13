import ArrowUpScroll from '@/assets/icons/arrowUp-scroll'
// import { css } from '@emotion/react'
import { useScreen, useTelegramMiniApp } from '@/hooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ScrollToTopButtonProps {
  className?: string
}

// const jumpAnimationStyles = css`
//   @keyframes normalJump {
//     0%, 100% {
//       transform: translateY(0);
//     }
//     50% {
//       transform: translateY(-8px);
//     }
//   }
//   animation: normalJump 2s ease-in-out infinite;
// `

export default function ScrollToTopButton({
  className = ''
}: ScrollToTopButtonProps) {
  const [isJumping, setIsJumping] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { isMobile } = useScreen()
  const { isTelegramMiniApp } = useTelegramMiniApp()
  const { t } = useTranslation()

  useEffect(() => {
    const checkScrollTop = () => {
      if (isMobile) {
        setIsVisible(window.pageYOffset > 300)
      } else {
        const desktopContainer = document.querySelector('.home-page')
        if (desktopContainer) {
          setIsVisible(desktopContainer.scrollTop > 300)
        }
      }
    }

    if (isMobile) {
      window.addEventListener('scroll', checkScrollTop)
    } else {
      const desktopContainer = document.querySelector('.home-page')
      if (desktopContainer) {
        desktopContainer.addEventListener('scroll', checkScrollTop)
      }
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', checkScrollTop)
      } else {
        const desktopContainer = document.querySelector('.home-page')
        if (desktopContainer) {
          desktopContainer.removeEventListener('scroll', checkScrollTop)
        }
      }
    }
  }, [])

  const scrollToTop = () => {
    // Trigger jump animation
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 300)

    if (isMobile) {
      // On mobile, scroll the window
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      // On desktop, find and scroll the main scrollable container
      const desktopScrollContainer = document.querySelector('.home-page')
      if (desktopScrollContainer) {
        desktopScrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        // Fallback to window scroll if container not found
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      // css={jumpAnimationStyles}
      className={`fixed md:bottom-6 bottom-22 right-6 z-50 transition-transform duration-300 ease-in-out ${
        isJumping
          ? 'transform -translate-y-2 scale-105'
          : 'transform translate-y-0 scale-100'
      } ${className}`}
      aria-label="Scroll to top"
      style={{
        bottom: isTelegramMiniApp ? '110px' : ''
      }}
    >
      <div className="p-3 bg-[#2A2242] rounded-[10px] inline-flex justify-start items-center gap-2 overflow-hidden">
        <div className="relative w-4 h-4">
          <ArrowUpScroll className="w-4 h-4" />
        </div>
        <div className="flex-col justify-start items-start gap-2.5 md:block hidden lg:block">
          <div className="justify-start text-[#EAE3FF] text-sm font-medium font-['Inter'] leading-tight">
            {t('common.scrollToTop', 'Scroll to Top')}
          </div>
        </div>
      </div>
    </button>
  )
}
