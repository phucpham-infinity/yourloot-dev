import { css } from '@/lib/utils'

import ArrowLeftIcon from '@/assets/icons/arrowLeft.tsx'
import CloseIcon from '@/assets/icons/close.tsx'
import ExchangeIcon from '@/assets/icons/home/exchange'
import CustomButton from '@/components/common/custom-button'
import IconButton from '@/components/common/icon-button'
import { isMobile } from 'react-device-detect'
import { useHomeStore } from '@/store/slices/home'
import { useNavigate, Outlet, useSearchParams } from 'react-router-dom'
import PageModal from '@/components/common/page-modal'

export default function ExchangeLayout() {
  const { setIsScroll } = useHomeStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handleBack = () => {
    navigate(-1)
  }
  const handleClose = () => {
    setIsScroll(false)
    const closeBack = searchParams.get('close-back') ?? '/'
    navigate(closeBack)
  }

  return (
    <PageModal onClose={handleClose}>
      <div className="w-full flex items-center justify-between mb-[20px]">
        <div className="flex items-center gap-5">
          <ExchangeIcon className="w-[40px] h-[40px]" />
          <div className="text-white text-2xl font-black">
            Your Loot Coin Exchange
          </div>
        </div>
        <div className="flex gap-[10px]">
          <CustomButton
            onClick={handleBack}
            variant={'muted'}
            prefixIcon={<ArrowLeftIcon className="mr-0 lg:mr-[10px]" />}
            className="w-fit lg:w-[90px]"
            label={isMobile ? '' : 'Back'}
          />
          <IconButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
      </div>
      <div className="w-full p-10 rounded-tr-[20px]" css={styles}>
        <Outlet />
      </div>
    </PageModal>
  )
}

const styles = css`
  border-radius: 20px;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
