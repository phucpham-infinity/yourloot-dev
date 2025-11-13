import { useState } from 'react'
import { useBannerData } from './useBannerData'
import DesktopCarousel from './DesktopCarousel'
import MobileLayout from './MobileLayout'
import { useScreen } from '@/hooks'

export interface BannerItem {
  title: string
  description?: string
  src: string
  isShowText?: boolean
  to?: string
}

export default function BannerCarousel() {
  // Get banner data from custom hook
  const { listL, listM, listS } = useBannerData()

  // indices for small right-side carousels
  const [smallTopIdx, setSmallTopIdx] = useState(0)
  const [smallBottomIdx, setSmallBottomIdx] = useState(0)
  // mobile indices
  const [mBigIdx, setMBigIdx] = useState(0)
  const [mLeftIdx, setMLeftIdx] = useState(0)
  const [mRightIdx, setMRightIdx] = useState(0)
  const { isMobile } = useScreen()

  return (
    <>
      {isMobile ? (
        <MobileLayout
          listL={listL}
          listM={listM}
          listS={listS}
          mBigIdx={mBigIdx}
          setMBigIdx={setMBigIdx}
          mLeftIdx={mLeftIdx}
          setMLeftIdx={setMLeftIdx}
          mRightIdx={mRightIdx}
          setMRightIdx={setMRightIdx}
        />
      ) : (
        <DesktopCarousel
          listL={listL}
          listM={listM}
          listS={listS}
          smallTopIdx={smallTopIdx}
          setSmallTopIdx={setSmallTopIdx}
          smallBottomIdx={smallBottomIdx}
          setSmallBottomIdx={setSmallBottomIdx}
        />
      )}
    </>
  )
}
