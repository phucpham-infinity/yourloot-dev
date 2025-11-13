import SmallBanner from './small-banner'
import { BannerItem } from './banner'

interface MobileLayoutProps {
  listL: BannerItem[]
  listM: BannerItem[]
  listS: BannerItem[]
  mBigIdx: number
  setMBigIdx: (index: number) => void
  mLeftIdx: number
  setMLeftIdx: (index: number) => void
  mRightIdx: number
  setMRightIdx: (index: number) => void
}

export default function MobileLayout({
  listL,
  listM,
  listS,
  mBigIdx,
  setMBigIdx,
  mLeftIdx,
  setMLeftIdx,
  mRightIdx,
  setMRightIdx
}: MobileLayoutProps) {
  return (
    <div className="inline-flex flex-col w-full gap-2">
      {/* Top: biggest banner using SmallBanner */}
      <SmallBanner
        items={listL}
        index={mBigIdx}
        onChange={setMBigIdx}
        interval={4000}
        className="h-full"
      />

      {/* Bottom: two small parts with 60% / 40% split */}
      <div className="inline-flex w-full gap-2">
        <div className="w-[60%]">
          <SmallBanner
            items={listM}
            index={mLeftIdx}
            onChange={setMLeftIdx}
            interval={4500}
            className="h-[100px]"
            hideIndicators={true}
          />
        </div>
        <div className="w-[40%]">
          <SmallBanner
            items={listS}
            index={mRightIdx}
            onChange={setMRightIdx}
            interval={5000}
            className="h-[100px]"
            hideIndicators={true}
          />
        </div>
      </div>
    </div>
  )
}