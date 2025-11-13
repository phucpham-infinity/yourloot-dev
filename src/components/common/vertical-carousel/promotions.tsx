import React, { useState } from 'react'
import { config } from 'react-spring'
import VerticalCarousel from './index'
import styled from '@emotion/styled'
import CustomButton from '../custom-button'
interface Slide {
  key: number
  content: React.ReactNode
}

const Slide1 = () => (
  <SlideStyled className="slide-content relative pt-10">
    <div className="text-white z-1 flex pl-20  flex-col gap-4">
      <div className="font-bold text-app-main-24">Daily Free Spins!</div>
      <div className="flex flex-col gap-1 text-app-medium-14 text-app-pale">
        <div>
          Get up to <span className="text-app-white">15FS</span> daily!
        </div>
        <div>
          Duration:{' '}
          <span className="text-app-white">31.01.2025 - 30.06.2025</span>
        </div>
      </div>
      <CustomButton className="w-[148px]" label="Read more" />
    </div>

    <img
      src="/images/promotions/background-01.svg"
      alt="logo"
      className="absolute top-0 left-0 w-full h-full"
    />
    <div className="absolute top-0 lett-0 flex gap-5">
      <CustomButton
        className="min-w-fit w-[93px]"
        variant="muted"
        label="Time left: 1d 14h"
      />
      <CustomButton
        variant="muted"
        className="min-w-fit w-[93px]"
        label="Wager: x100"
      />
    </div>
    <div className="absolute bottom-0 right-0">
      <CustomButton className="min-w-fit w-[93px]" label="Activate" />
    </div>
  </SlideStyled>
)

const slides: Slide[] = [
  {
    key: 1,
    content: <Slide1 />
  },
  {
    key: 2,
    content: <Slide1 />
  },
  {
    key: 3,
    content: <Slide1 />
  },
  {
    key: 4,
    content: <Slide1 />
  },
  {
    key: 5,
    content: <Slide1 />
  },
  {
    key: 6,
    content: <Slide1 />
  },
  {
    key: 7,
    content: <Slide1 />
  },
  {
    key: 8,
    content: <Slide1 />
  }
]

const PromotionsCarousel: React.FC = () => {
  const [state] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  })

  return (
    <PromotionsCarouselStyled height={'500px'}>
      <BgStyled top={0}>
        <img src="/images/promotions/background-02.svg" alt="logo" />
      </BgStyled>
      <VerticalCarousel
        slides={slides}
        offsetRadius={state.offsetRadius}
        showNavigation={state.showNavigation}
        animationConfig={state.config}
      />
      <BgStyled top={310}>
        <img src="/images/promotions/background-03.svg" alt="logo" />
      </BgStyled>
    </PromotionsCarouselStyled>
  )
}

export default PromotionsCarousel

const PromotionsCarouselStyled = styled.div<{ height?: number | string }>`
  width: 100%;
  height: ${(props) => props.height};
  margin: 0 auto;
  position: relative;
`

const BgStyled = styled.div<{ top: number | string }>`
  left: 50%;
  transform: translateX(-50%);
  top: ${(props) =>
    typeof props.top === 'number' ? `${props.top}px` : props.top};
  width: 550px;
  filter: blur(5px);
  position: absolute;
  z-index: 0;
`

const SlideStyled = styled.div`
  width: 800px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
