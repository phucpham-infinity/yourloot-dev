import styled from '@emotion/styled'
import React, { useState } from 'react'
import { config } from 'react-spring'

import CustomButton from '@/components/common/custom-button'
import VerticalCarousel from '@/components/common/vertical-carousel'
import { useTranslation } from 'react-i18next'

import banerBonusDes from '@/assets/images/bonus/yourlooBannerPromotionsDesktopFtdbonus.svg'

const Slide1 = ({ onReadMore }: { onReadMore: () => void }) => {
  const { t } = useTranslation()
  return (
    <SlideStyled className="slide-content relative pt-10">
      <div className="text-white z-1 flex pl-20  flex-col gap-4 upper text-white text-center font-extrabold text-3xl uppercase font-sans">
        <div>
          Get <span className="text-[#E0BFEF]">$1500 </span>
        </div>
        <div className="text-xl ">
          <div>On the 1st deposit</div>
        </div>
        <CustomButton
          className="w-[148px]"
          label={t('bonus.banner.readMore')}
          onClick={onReadMore}
        />
      </div>

      <img
        src={banerBonusDes}
        alt="logo"
        className="absolute top-0 left-0 w-full h-full"
      />
      {/* <div className="absolute top-0 lett-0 flex gap-5">
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
      </div> */}
      {/* <div className="absolute bottom-0 right-0">
        <CustomButton className="min-w-fit w-[93px]" label="Activate" />
      </div> */}
    </SlideStyled>
  )
}

const slides = (onReadMore: () => void) => [
  {
    key: 1,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 2,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 3,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 4,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 5,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 6,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 7,
    content: <Slide1 onReadMore={onReadMore} />
  },
  {
    key: 8,
    content: <Slide1 onReadMore={onReadMore} />
  }
]

const PromotionsCarousel: React.FC<{ onReadMore: () => void }> = ({
  onReadMore
}) => {
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
        slides={slides(onReadMore)}
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
