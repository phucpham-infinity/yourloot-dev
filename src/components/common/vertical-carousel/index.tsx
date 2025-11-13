import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Slide from './slide'
import IconBtn from '../icon-button'
import ArrowDown2 from '@/assets/icons/arrowDown2'
import ArrowUp2 from '@/assets/icons/arrowUp2'
interface SlideItem {
  key: string | number
  content: React.ReactNode
  backgroundImage?: string
}

interface VerticalCarouselProps {
  slides: SlideItem[]
  offsetRadius?: number
  animationConfig?: { tension: number; friction: number }
  showNavigation?: boolean
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const NavBtn = styled.div<{ top?: string }>`
  position: absolute;
  z-index: 999;
  top: ${(props) => props.top || '-80px'};
  left: 50%;
  transform: translateX(-50%);
`

function mod(a: number, b: number): number {
  return ((a % b) + b) % b
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  slides,
  offsetRadius = 2,
  animationConfig = { tension: 120, friction: 14 },
  showNavigation = false
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing || event.keyCode === 229) {
        return
      }
      if (event.keyCode === 38) {
        moveSlide(-1)
      }
      if (event.keyCode === 40) {
        moveSlide(1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const modBySlidesLength = (index: number): number => {
    return mod(index, slides.length)
  }

  const moveSlide = (direction: number): void => {
    setIndex(modBySlidesLength(index + direction))
  }

  const clampOffsetRadius = (radius: number): number => {
    const upperBound = Math.floor((slides.length - 1) / 2)

    if (radius < 0) {
      return 0
    }
    if (radius > upperBound) {
      return upperBound
    }

    return radius
  }

  const getPresentableSlides = (): SlideItem[] => {
    const clampedOffsetRadius = clampOffsetRadius(offsetRadius)
    const presentableSlides: SlideItem[] = []

    for (let i = -clampedOffsetRadius; i < 1 + clampedOffsetRadius; i++) {
      presentableSlides.push(slides[modBySlidesLength(index + i)])
    }

    return presentableSlides
  }

  const navigationButtons = showNavigation ? (
    <div className="relative">
      <NavBtn top="-70px" onClick={() => moveSlide(1)}>
        <IconBtn className="w-10 h-10" icon={<ArrowDown2 />} />
      </NavBtn>
      <NavBtn top="-475px" onClick={() => moveSlide(-1)}>
        <IconBtn className="w-10 h-10" icon={<ArrowUp2 />} />
      </NavBtn>
    </div>
  ) : null

  return (
    <React.Fragment>
      <Wrapper>
        {getPresentableSlides().map((slide, presentableIndex) => (
          <Slide
            key={slide.key}
            content={slide.content}
            backgroundImage={slide.backgroundImage}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={presentableIndex}
            animationConfig={animationConfig}
            delta={[0, 0]}
            down={false}
            up={false}
          />
        ))}
      </Wrapper>
      {navigationButtons}
    </React.Fragment>
  )
}

export default VerticalCarousel
