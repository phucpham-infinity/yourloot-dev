import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { TypeState } from '@/store/slices/home'
import { SerializedStyles } from '@emotion/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Provider from '../Provider'
import ProviderCard from '../ProviderCard'
import { CardContent } from '@/components/ui/card'

interface ProviderUIProps {
  className?: string
  gameProviders: string[] | null
  setType: (type: TypeState) => void
  updateQueryParam: (name: string, value: string) => void
  lightProvidertext: string
  stylesProvidertext: SerializedStyles
}

const ProviderUI: React.FC<ProviderUIProps> = ({
  className,
  gameProviders,
  setType,
  updateQueryParam,
  lightProvidertext,
  stylesProvidertext
}) => {
  const [search, setSearch] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearch = (value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      setSearch(value)
    }, 500)
  }

  const filteredGameProviders = useMemo(
    () =>
      gameProviders?.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      ),
    [gameProviders, search]
  )

  // NOTE: Carousel API scroll to next and previous provider
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

  const scrollToNextIndex = (index: number) => {
    carouselApi?.scrollTo(index + 1)
  }

  const scrollToPreviousIndex = (index: number) => {
    carouselApi?.scrollTo(index - 1)
  }

  return (
    <>
      <Provider
        className="w-full"
        handleSearch={handleSearch}
        scrollToNextIndex={() => scrollToNextIndex(currentIndex)}
        scrollToPreviousIndex={() => scrollToPreviousIndex(currentIndex)}
      />

      {isMobile ? (
        <div className={cn('w-full overflow-hidden', className)}>
          <div className="w-full grid grid-cols-2 gap-5 overflow-hidden">
            {gameProviders?.map((item, index) => (
              <ProviderCard
                onClick={() => {
                  setType('gamesoft')
                  updateQueryParam('gamesoft', item)
                  window.scrollTo(0, 0)
                }}
                key={`${index}-${item?.toLowerCase()}`}
                // icon={item?.icon}
                name={item}
                // className="w-full lg:w-[180px] h-full lg:h-[151px]"
                className="w-full lg:w-[190px] h-[160px]"
                css={stylesProvidertext}
                imgPosition={
                  <img
                    src={lightProvidertext}
                    className="absolute bottom-0 right-0 w-full"
                  />
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <Carousel setApi={setCarouselApi} className="">
          <CarouselContent className="rounded-[20px]">
            {filteredGameProviders?.map((item, index) => (
              <CarouselItem
                className="basis-1/4 !ml-0"
                key={`${index}-${item?.toLowerCase()}`}
              >
                <CardContent className="w-full h-full">
                  <ProviderCard
                    onClick={() => {
                      setType('gamesoft')
                      updateQueryParam('gamesoft', item)
                      window.scrollTo(0, 0)
                    }}
                    // icon={item?.icon}
                    name={item}
                    // className="w-full lg:w-[180px] h-full lg:h-[151px]"
                    className="w-full lg:w-[190px] h-[160px]"
                    css={stylesProvidertext}
                    imgPosition={
                      <img
                        src={lightProvidertext}
                        className="absolute bottom-0 right-0 w-full"
                      />
                    }
                  />
                </CardContent>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </>
  )
}

export default ProviderUI
