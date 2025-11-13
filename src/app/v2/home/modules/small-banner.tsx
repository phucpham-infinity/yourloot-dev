import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useBannerClick } from './useBannerClick'

export interface BannerItem {
  title: string
  description?: string
  src: string
  isShowText?: boolean
  to?: string
}

const SmallSliderBar = ({
  total,
  index,
  progress,
  hideIndicators = false
}: {
  total: number
  index: number
  progress: number
  hideIndicators?: boolean
}) => {
  if (hideIndicators || total <= 1) return null

  const items = Array.from({ length: total }, (_, i) => i)

  return (
    <div className="absolute left-3 bottom-3 p-1 bg-black/30 rounded-xl inline-flex flex-col justify-start items-start">
      <div className="inline-flex justify-start items-center gap-1">
        {items.map((i) => (
          <div key={i} className="relative">
            {i === index ? (
              <div className="w-5 h-1.5 relative bg-white/30 rounded-3xl overflow-hidden">
                <div
                  className="h-full bg-white rounded-3xl transition-all duration-100 ease-linear"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>
            ) : (
              <div className="w-1.5 h-1.5 bg-black/30 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SmallBanner({
  items,
  index,
  onChange,
  interval,
  className,
  hideIndicators = false,
  style
}: {
  items: BannerItem[]
  index: number
  onChange: (idx: number) => void
  interval: number
  className?: string
  hideIndicators?: boolean
  style?: React.CSSProperties
}) {
  const { handleBannerClick } = useBannerClick()
  const [progress, setProgress] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(index)
  const [isAnimating, setIsAnimating] = useState(false)
  const [fadeDirection, setFadeDirection] = useState<'in' | 'out'>('in')
  const [isInitial, setIsInitial] = useState(true)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isManualChange = useRef(false)

  // Reset progress when index changes with fade animation
  useEffect(() => {
    if (currentIndex !== index) {
      // Start both animations simultaneously
      setCurrentIndex(index)
      setIsAnimating(true)
      setFadeDirection('in')
      setIsInitial(true)

      // Start new banner slide-in immediately
      setTimeout(() => {
        setIsInitial(false)
      }, 0)

      // Start old banner slide-out at the same time
      setTimeout(() => {
        setFadeDirection('out')
      }, 0)

      // Complete animation after duration
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }

    if (isMobile && !isManualChange.current) {
      setProgress(0)
    }
    isManualChange.current = false
  }, [index, currentIndex])

  // Progress timer for mobile
  useEffect(() => {
    if (items.length <= 1) return

    // Clear existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    setProgress(0)
    const progressStep = 100 / (interval / 100) // Update every 100ms

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressStep
        if (newProgress >= 100) {
          // Progress complete, advance to next slide
          const nextIndex = (currentIndex + 1) % items.length
          onChange(nextIndex)
          return 0
        }
        return newProgress
      })
    }, 100)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentIndex, interval, items.length, onChange])

  // Handle manual change (swipe/click)
  const handleManualChange = (newIndex: number) => {
    isManualChange.current = true
    setProgress(0)
    onChange(newIndex)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`relative h rounded-[10px] overflow-hidden ${className ?? 'h-[8vw]'}`}
    >
      <div
        className={`transition-all duration-300 ease-in-out ${
          isAnimating
            ? fadeDirection === 'out'
              ? 'opacity-0 translate-x-[20px]' // old banner slides right
              : isInitial
                ? 'opacity-100 translate-x-[20px]' // new banner starts from right
                : 'opacity-100 translate-x-0' // new banner slides to center
            : 'opacity-100 translate-x-0'
        }`}
      >
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          infiniteLoop
          swipeable
          autoPlay // Disable autoPlay for mobile, we handle it manually
          interval={interval}
          onChange={handleManualChange}
          className={`w-full ${className ?? 'h-full'}`}
        >
          {items.map((item: any, i: number) => (
            <div
              key={i}
              style={style}
              className={`w-full object-cover ${item?.to ? 'cursor-pointer' : ''} ${className ?? 'h-full'}`}
              role={item?.to ? 'button' : undefined}
              aria-label={item?.to ? item?.title || 'Banner' : undefined}
              tabIndex={item?.to ? 0 : -1}
              onClick={item?.to ? () => handleBannerClick(item.to) : undefined}
              onKeyDown={
                item?.to
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleBannerClick(item.to)
                      }
                    }
                  : undefined
              }
            >
              <img
                alt={item.title}
                src={item.src}
                className={`w-full object-cover ${className ?? 'h-full'}`}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <SmallSliderBar
        total={items.length}
        index={currentIndex}
        progress={progress}
        hideIndicators={hideIndicators}
      />
    </div>
  )
}
