import ArrowLeft2 from '@/assets/icons/arrowLeft2'
import ArrowRight2 from '@/assets/icons/arrowRight2'
import IconBtn from '@/components/common/icon-button'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import CustomButton from '@/components/common/custom-button'
import { css } from '@emotion/react'

import banerBonusDesMobile from '@/assets/images/bonus/banner-all/yourloot-banner-promotions-mobile-wb03.png'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function PromotionsMobileCarousel({
  // onReadMore,
  key
}: {
  onReadMore: () => void
  key: number
}) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [sliderRef, instanceRef] = useKeenSlider({})
  return (
    <div>
      <div ref={sliderRef} className="relative keen-slider">
        {key < 0 ? (
          <div>
            <IconBtn
              onClick={() => instanceRef.current?.prev()}
              className="absolute bottom-0 left-0 w-10 h-10"
              icon={<ArrowLeft2 />}
            />
            <IconBtn
              onClick={() => instanceRef.current?.next()}
              className="absolute bottom-0 right-0 w-10 h-10"
              icon={<ArrowRight2 />}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className="keen-slider__slide ">
          {/* <div className="relative w-full h-[220px] z-[5] rounded-[20px] overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full z-[2] flex-col justify-start items-start gap-5 inline-flex">
              <div className="text-2xl font-black leading-6 text-white">
                {t('bonus.banner.title')}
              </div>
              <div className="text-[#c5c0d7] text-sm leading-3.5 font-medium">
                {t('bonus.banner.description')}
              </div>
              <CustomButton
                onClick={() => {
                  navigate('/bonus/detail/general')
                }}
                label={t('bonus.banner.readMore')}
                className="w-full"
              />
            </div>
            <img
              src={banerBonusDesMobile}
              className="absolute w-full right-0 left-0 h-full z-[5]"
            />
          </div> */}
          <div
            className={cn(
              `relative border border-[#4d4767] overflow-hidden bg-home-banner rounded-[20px] flex items-center py-[56px] px-10 justify-start h-full w-full `
            )}
          >
            <div className=" z-[2] flex-col justify-start items-start gap-2 inline-flex w-full">
              <div className="text-[20px] font-extrabold leading-[100%] bg-[linear-gradient(135deg,_#bcc9f9_0%,_#e0bfef_50%,_#f1d7d7_100%)] bg-clip-text text-transparent [text-shadow:0px_5.583px_44.662px_rgba(255,255,255,0.5)]">
                {'$1 500'}
              </div>
              <div className="text-[16px] font-extrabold leading-[100%] text-white mt-2 [text-shadow:0px_5.289px_42.309px_rgba(255,255,255,0.5)] lg:w-full w-2/5">
                {t('bonus.detail.firstDeposit')}
              </div>
              <CustomButton
                onClick={() => {
                  navigate('/bonus/detail/general')
                }}
                label={t('bonus.banner.readMore')}
                className="w-fit"
              />
            </div>

            <img
              className="absolute w-full h-full right-0 z-[1] "
              src={banerBonusDesMobile}
            />
          </div>
        </div>
        <div className="keen-slider__slide">
          <div className="w-full">
            <img src="/images/promotions/bg-04.svg" className="w-full h-auto" />
          </div>
        </div>
        <div className="keen-slider__slide">
          <div className="w-full">
            <img src="/images/promotions/bg-04.svg" className="w-full h-auto" />
          </div>
        </div>
      </div>
      <div
        css={styled}
        className="p-5 mt-5 border-app-default rounded-[20px] flex flex-col gap-10 bg-red"
      >
        {/* <div className="flex flex-row items-center gap-5">
          <ProcessPresent className="flex-1" persent={50} />
          <CustomButton className="flex-1" label="1d 14h" variant="muted" />
          <CustomButton className="flex-1" label="x100" variant="muted" />
        </div> */}
        {/* <div className="flex flex-col gap-5">
          <div className="text-white text-app-main-24">Welcome Bonus</div>
          <div className="flex flex-col gap-1 text-app-medium-14 text-app-pale">
            <div>
              Get up to <span className="text-app-white">15FS</span> daily!
            </div>
            <div>
              Duration:{' '}
              <span className="text-app-white">31.01.2025 - 30.06.2025</span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <CustomButton
              label="Read more"
              className="w-fit"
              variant="muted"
              onClick={onReadMore}
            />
            <CustomButton label="Active" className="w-fit" variant="default" />
          </div>
        </div> */}
      </div>
    </div>
  )
}

const styled = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  box-shadow: 6px 6px 16px 0px rgba(22, 28, 22, 0.25);
`
