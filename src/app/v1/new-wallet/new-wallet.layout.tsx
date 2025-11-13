import { css } from '@/lib/utils'

import CustomButton from '@/components/common/custom-button'
import IconButton from '@/components/common/icon-button'
import ArrowLeftIcon from '@/assets/icons/arrowLeft.tsx'
import CloseIcon from '@/assets/icons/close.tsx'
import CoinWallet from '@/assets/images/wallet.svg'
import { Outlet } from 'react-router-dom'
import PageModal from '@/components/common/page-modal'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BasicDialog } from '@/components/common/basic-dialog'

export default function NewWalletLayout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handleBack = () => {
    navigate(-1)
  }

  const handleClose = () => {
    const closeBack = searchParams.get('close-back') ?? '/'
    navigate(closeBack)
  }

  return (
    <PageModal onClose={handleClose}>
      <div className="w-full flex items-center justify-between mb-[20px]">
        <div className="flex items-center">
          <div data-svg-wrapper className="relative">
            <img src={CoinWallet} alt="Logo" className="w-[82px]" />
          </div>
          <div className="text-white text-2xl font-black">
            Create new wallet
          </div>
        </div>
        <div className="flex gap-[10px]">
          <CustomButton
            onClick={handleBack}
            variant={'muted'}
            prefixIcon={<ArrowLeftIcon className="mr-[10px]" />}
            className="w-[90px]"
            label="Back"
          />
          <IconButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
      </div>
      <div className="w-full rounded-[20px]" css={cssFn()}>
        <Outlet />
      </div>
      <BasicDialog />
    </PageModal>
  )
}

const cssFn = () => {
  return css`
    background-image: linear-gradient(150deg, #2e2a51 20%, #171526 96%);
  `
}
