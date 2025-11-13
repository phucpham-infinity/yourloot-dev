import { cn } from '@/lib/utils'
import { css } from '@emotion/react'
import clsx from 'clsx'
import arrow1 from '@/assets/images/ob/arrow-1.svg'
import arrow2 from '@/assets/images/ob/arrow-2.svg'
import arrow3 from '@/assets/images/ob/arrow-3.svg'
import arrow3sm from '@/assets/images/ob/arrow-3-sm.svg'
import arrow4 from '@/assets/images/ob/arrow-4.svg'

import welcomeLight from '@/assets/icons/home/light/welcomeLight.svg'
import { isMobile, isDesktop } from 'react-device-detect'
import CustomButton from '../custom-button'

interface TourContentProps {
  step: number
  title: string
  des1: string
  des2: string
  className?: string
  arrowPosition?: 'left' | 'right' | 'left-sm' | 'right-sm'
  actionsPosition?: 'left' | 'right'
  onClick?: () => void
  onNextStep?: () => void
  onSkip?: () => void
}

export default function TourContent({
  title,
  des1,
  className,
  arrowPosition = 'left',
  onNextStep,
  onSkip,
  actionsPosition = 'right'
}: TourContentProps) {
  return (
    <div onClick={onNextStep} className={cn('', className)}>
      <div
        className={cn(
          'flex justify-between items-start relative',
          isMobile && 'flex-col w-[90vw]! min-w-[90vw] h-fit min-h-fit',
          isDesktop &&
            'flex-row w-[300px] min-w-[300px] max-w-[300px] h-[300px] min-h-[300px] max-h-[300px]'
        )}
      >
        {arrowPosition === 'left' && isDesktop && (
          <div className="flex flex-col justify-end items-end bottom-[-10px] left-[0px] h-full absolute ">
            <img
              src={arrow1}
              alt="arrow"
              className={clsx('z-40 w-[60px]', {
                'left-[-70px]': !isMobile,
                'left-[10px]': isMobile
              })}
            />
          </div>
        )}
        {arrowPosition === 'right' && isDesktop && (
          <div className="flex flex-col justify-end items-end bottom-[-10px] right-[0px] h-full absolute">
            <img
              src={arrow2}
              alt="arrow"
              className={clsx('z-40 w-[60px]', {
                'left-[-70px]': !isMobile,
                'left-[10px]': isMobile
              })}
            />
          </div>
        )}
        <div
          className={clsx(
            'w-[400px] flex flex-col ',
            isDesktop && 'p-[40px] absolute',
            arrowPosition === 'right' &&
              isDesktop &&
              'absolute top-[0px] right-[70px]',
            arrowPosition === 'left' &&
              isDesktop &&
              'absolute  top-[0px] left-[70px]',
            isMobile && 'w-full h-fit min-h-fit p-[30px]'
          )}
          css={styles}
        >
          <img src={welcomeLight} className="absolute top-0 right-0" />
          <img
            className={clsx('w-[40px] h-[40px] mb-10', isMobile && 'mb-5')}
            src="/images/welcome.png"
          />
          <div
            className={clsx('flex flex-col items-start gap-5 relative z-20')}
          >
            <div
              className={clsx(
                'text-white w-full text-start text-2xl font-black leading-[14px] text-nowrap',
                isMobile && 'text-[22px]'
              )}
            >
              {title}
            </div>
            <div className="text-[#c5c0d8] min-h-[40px] w-full text-start text-sm font-medium">
              {des1}
            </div>
            {/*<div*/}
            {/*  onClick={onClick}*/}
            {/*  className={clsx(*/}
            {/*    'cursor-pointer text-white text-sm font-medium w-full text-end leading-[10px]',*/}
            {/*    isMobile && ' text-start'*/}
            {/*  )}*/}
            {/*>*/}
            {/*  {des2}*/}
            {/*</div>*/}
          </div>
          <div
            className={
              `flex justify-end gap-3 items-center w-fit pt-3 absolute bottom-[-50px]  ${actionsPosition}-0`
            }
          >
            <CustomButton
              variant="muted"
              className="w-fit min-w-[100px]"
              label="Skip"
              onClick={(e) => {
                e.stopPropagation()
                onSkip?.()
              }}
            />
            <CustomButton className="w-fit min-w-[100px]" label="Next" />
          </div>
        </div>

        {arrowPosition === 'left' && isMobile && (
          <div className="flex flex-col justify-end items-start w-full">
            <img
              src={arrow3}
              alt="arrow"
              className={clsx('z-40 h-[90px] mt-[30px] ml-[5vw]', {
                'left-[-70px]': !isMobile,
                'left-[10px]': isMobile
              })}
            />
          </div>
        )}
        {arrowPosition === 'left-sm' && isMobile && (
          <div className="flex flex-col justify-end items-start w-full">
            <img
              src={arrow3sm}
              alt="arrow"
              className={clsx('z-40 h-[70px] mt-[30px] ml-[5vw]', {
                'left-[-70px]': !isMobile,
                'left-[10px]': isMobile
              })}
            />
          </div>
        )}
        {arrowPosition === 'right' && isMobile && (
          <div className="flex flex-col justify-end items-end w-full">
            <img
              src={arrow4}
              alt="arrow"
              className={clsx('z-40 h-[90px] mt-[30px] mr-[15vw]', {
                'left-[-70px]': !isMobile,
                'left-[10px]': isMobile
              })}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 20px;
  border: 1px solid #45355f;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12.5px);
  overflow: visible;
`
