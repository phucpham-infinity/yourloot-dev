import { css } from '@emotion/react'
import { BannerItem } from './banner'
import { useBannerClick } from './useBannerClick'

interface BannerSlideProps {
  item: BannerItem
  index: number
  desktopHeightClass: string
}

const style = css`
  border-radius: 6px;
  box-shadow: 6px 6px 16px 0 rgba(22, 28, 22, 0.25);
`

export default function BannerSlide({
  item,
  index,
  desktopHeightClass
}: BannerSlideProps) {
  const { handleBannerClick } = useBannerClick()

  return (
    <div
      css={style}
      key={index}
      className={`relative w-full ${desktopHeightClass} rounded-[10px] overflow-hidden ${item?.to ? 'cursor-pointer' : ''}`}
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
      {item?.isShowText && (
        <div className="flex flex-col items-start gap-2 absolute top-[3vw] left-[2.8vw]">
          <div className="text-[#F9F7FF] text-[1.7vw] leading-6 font-black">
            {item?.title}
          </div>
          <div
            className="text-[#F9F7FF] text-[1vw] leading-3.5 font-medium text-left"
            dangerouslySetInnerHTML={{
              __html: item?.description ?? ''
            }}
          />
        </div>
      )}
      <img
        alt={item.title}
        src={item.src}
        className={`w-full ${desktopHeightClass} object-fill rounded-[10px]`}
      />
    </div>
  )
}
