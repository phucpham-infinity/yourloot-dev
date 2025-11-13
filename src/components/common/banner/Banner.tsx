import { cn } from '@/lib/utils'

import { CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
// import CustomButton from '../custom-button'
import { isMobile } from 'react-device-detect'
import CustomButton from '../custom-button'

interface BannerProps {
  className?: string
  buttonClassName?: string
  onClick?: () => void
  listData?: {
    title: string
    description: string
    imageMobile: string
    imageDesktop: string
    buttonLabel?: string
    buttonClassName?: string
  }[]
}

export default function Banner({ className, listData, onClick }: BannerProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!carouselApi) return

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap())
    }

    updateCarouselState()

    carouselApi.on('select', updateCarouselState)

    return () => {
      carouselApi.off('select', updateCarouselState) // Clean up on unmount
    }
  }, [carouselApi])

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index)
  }

  return (
    <div
      className={cn(
        'relative w-full bg-transparent shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] border-solid border-[#423d4c]',
        className
      )}
    >
      <div className="absolute top-[40%] left-[40px] -translate-x-1/2 -translate-y-1/ hidden lg:flex flex-col gap-2.5  z-20">
        {Array.from({ length: listData?.length ?? 0 }).map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                ' w-[5px] h-[5px] rounded-full cursor-pointer transition-colors ',
                currentIndex === index ? 'bg-[#372864]' : 'bg-[#605E68]'
              )}
            />
          )
        })}
      </div>

      <Carousel
        opts={{
          align: 'start'
        }}
        orientation="vertical"
        className="w-full h-[230px] lg:h-[274px]"
        setApi={setCarouselApi}
      >
        <CarouselContent className="w-full h-[230px] lg:h-[274px] rounded-[20px]">
          {listData?.map((item, index) => (
            <CarouselItem
              key={index}
              className="h-full w-full overflow-hidden "
            >
              <CardContent className="relative bg-home-banner flex items-center px-[20px] lg:px-[65px] justify-start h-full w-full rounded-[20px] overflow-hidden">
                {' '}
                {/* <--- Ensure this has overflow-hidden */}
                <div className="block lg:hidden absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
                <div className="max-h-[108px] flex-col justify-start items-start gap-5 inline-flex z-10">
                  <div className="text-white text-2xl leading-6 font-black">
                    {item?.title}
                  </div>
                  <div className="text-[#c5c0d7] text-sm leading-3.5 font-medium">
                    {item?.description}
                  </div>
                  {item?.buttonLabel && (
                    <CustomButton
                      onClick={onClick}
                      label={item?.buttonLabel}
                      className={item?.buttonClassName}
                    />
                  )}
                </div>
                {/* The image itself */}
                <img
                  className="absolute rounded-[20px] z-[5] bottom-0 right-0 w-full object-cover"
                  style={{
                    maxHeight: isMobile ? '230px' : '274px', // Set explicit max-height
                    height: '100%' // Ensure it tries to fill the height as much as possible
                  }}
                  src={isMobile ? item?.imageMobile : item?.imageDesktop}
                />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
