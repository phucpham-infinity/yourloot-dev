import React from 'react'
import styled from '@emotion/styled'
import { Spring, SpringConfig, animated } from 'react-spring'

const SlideContainerDiv = styled.div`
  position: absolute;
  height: 70%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
`

const SlideContainer = animated(SlideContainerDiv)

const SlideCard = styled.div<{ backgroundImage?: string }>`
  position: relative;
  width: 800px;
  height: 350px;
  background: transparent;
  background-image: ${(props) => props.backgroundImage || 'none'};
  background-size: cover;
  background-position: center;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  color: white;
`

interface SlideProps {
  content: React.ReactNode
  backgroundImage?: string
  offsetRadius: number
  index: number
  animationConfig: SpringConfig
  moveSlide: (offset: number) => void
  delta: [number, number]
  down: boolean
  up: boolean
}

function Slide({
  content,
  backgroundImage,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down
}: SlideProps) {
  const offsetFromMiddle = index - offsetRadius
  const totalPresentables = 2 * offsetRadius + 1
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 5))

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1))
  let translateY = -50

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0
    } else if (index === totalPresentables - 1) {
      translateY = -100
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1)
    if (translateY > -40) {
      moveSlide(-1)
    }
    if (translateY < -100) {
      moveSlide(1)
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset
  }

  return (
    <Spring
      to={{
        transform: `translateX(0%) translateY(${translateY}%) scale(${distanceFactor})`,
        top: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromMiddle * 0) / offsetRadius
        }%`,
        filter: `blur(${(1 - distanceFactor) * 50}px)`
      }}
      config={animationConfig}
    >
      {(props) => (
        <SlideContainer
          style={{
            ...props,
            zIndex: Math.abs(Math.abs(offsetFromMiddle) - 2)
          }}
        >
          <SlideCard
            backgroundImage={backgroundImage}
            onClick={() => moveSlide(offsetFromMiddle)}
          >
            {content}
          </SlideCard>
        </SlideContainer>
      )}
    </Spring>
  )
}

export default Slide
