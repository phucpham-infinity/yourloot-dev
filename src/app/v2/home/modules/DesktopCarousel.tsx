import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import CustomButton from '@/components/common/custom-button'
import SmallBanner from './small-banner'
import BannerSlide from './BannerSlide'
import { BannerItem } from './banner'
import useDimensions from 'react-cool-dimensions'

interface DesktopCarouselProps {
  listL: BannerItem[]
  listM: BannerItem[]
  listS: BannerItem[]
  smallTopIdx: number
  setSmallTopIdx: (index: number) => void
  smallBottomIdx: number
  setSmallBottomIdx: (index: number) => void
}

export default function DesktopCarousel({
  listL,
  listM,
  listS,
  smallTopIdx,
  setSmallTopIdx,
  smallBottomIdx,
  setSmallBottomIdx
}: DesktopCarouselProps) {
  const { observe: observeBanner, height: bannerHeight } = useDimensions()
  return (
    <div className={`w-full grid grid-cols-[70%_30%] gap-2`}>
      {/* Left big banner: 70% */}
      <div
        ref={observeBanner}
        className="relative rounded-[10px] overflow-hidden aspect-[100/30]"
      >
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          swipeable
          renderArrowPrev={
            listL.length > 1
              ? (onClickHandler) => (
                  <CustomButton
                    label={<ArrowLeftIcon fill="#FFFFFF" />}
                    onClick={onClickHandler}
                    variant="custom"
                    className="absolute !w-fit !h-fit !rounded-[10px] z-10 right-[56px] bottom-[12px] cursor-pointer bg-[#FFFFFF33] hover:bg-[#FFFFFF4D]"
                  />
                )
              : undefined
          }
          renderArrowNext={
            listL.length > 1
              ? (onClickHandler) => (
                  <CustomButton
                    label={<ArrowRightIcon fill="#FFFFFF" />}
                    onClick={onClickHandler}
                    variant="custom"
                    className="absolute !w-fit !h-fit !rounded-[10px] z-10 right-3 bottom-[12px] cursor-pointer bg-[#FFFFFF33] hover:bg-[#FFFFFF4D]"
                  />
                )
              : undefined
          }
          className="relative w-full aspect-[100/30] rounded-[10px]"
        >
          {listL.map((item: BannerItem, index: number) => (
            <BannerSlide
              key={index}
              item={item}
              index={index}
              desktopHeightClass="h-full"
            />
          ))}
        </Carousel>
      </div>

      {/* Right side: two small identical banners stacked */}
      <div className="h-full  grid grid-rows-2 gap-[8px]">
        {/* Top small banner */}
        <SmallBanner
          items={listM}
          index={smallTopIdx}
          onChange={setSmallTopIdx}
          interval={4000}
          className="h-full"
          style={{ height: (bannerHeight - 8.2) / 2 }}
        />

        {/* Bottom small banner */}
        <SmallBanner
          items={listS}
          index={smallBottomIdx}
          onChange={setSmallBottomIdx}
          interval={5000}
          className="h-full"
          style={{ height: (bannerHeight - 8.2) / 2 }}
        />
      </div>
    </div>
  )
}
