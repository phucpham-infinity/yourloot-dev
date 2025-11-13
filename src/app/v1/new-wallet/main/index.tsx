import { cn, css } from '@/lib/utils.ts'
import Moneys from '@/assets/images/group.svg'
import Coingold from '@/assets/images/homes/coingold.tsx'
import CustomButton from '@/components/common/custom-button'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Main() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string>('')
  const [searchParams] = useSearchParams()
  const currentCloseBack = searchParams.get('close-back')
  const selectWalletType = (selectedPage: string) => {
    setSelected(selectedPage)
  }

  const handleCancelAction = () => {
    navigate('/')
  }

  return (
    <div className="flex-col justify-start items-start gap-3 overflow-hidden">
      <div className="w-full flex-col justify-center p-7 pb-2">
        <div className="relative justify-center text-white text-xl font-black font-['Satoshi'] pb-5">
          Choose type of the wallet
        </div>
        <div className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          Choose crypto - choose the best!
        </div>
      </div>
      <div
        className="w-full inline-flex max-lg:flex-col justify-between items-center gap-5 p-7"
        css={cssForCard()}
      >
        <div
          className={cn(
            'card-item w-1/2 max-lg:w-full flex-col items-center justify-start rounded-[20px] border-1 p-5',
            { active: selected === 'fiat' }
          )}
          onClick={() => selectWalletType('fiat')}
        >
          <div data-svg-wrapper className="relative">
            <img src={Moneys} alt="Logo" className="w-[82px]" />
          </div>
          <div className="relative justify-center text-white text-xl font-black font-['Satoshi']">
            Currency Wallet
          </div>
          <div className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            Normal Currency Wallet account
          </div>
        </div>
        <div
          className={cn(
            'card-item w-1/2 max-lg:w-full flex-col items-center justify-start rounded-[20px] border-1 p-5',
            { active: selected === 'coin' }
          )}
          onClick={() => selectWalletType('coin')}
        >
          <div data-svg-wrapper className="relative p-[14px]">
            <Coingold />
          </div>
          <div className="relative justify-center text-white text-xl font-black font-['Satoshi']">
            Cryptocurrency
          </div>
          <div className="relative justify-center text-[#48e364] text-xs font-medium font-['Satoshi']">
            +5% Per Deposit
          </div>
        </div>
      </div>
      <div className="w-full inline-flex justify-between items-center gap-5 p-7 max-lg:gap-2">
        <CustomButton
          variant={'muted'}
          className="w-1/4 max-lg:w-2/3"
          label="Cancel"
          onClick={handleCancelAction}
        />
        <CustomButton
          variant={'default'}
          className="w-3/4 max-lg:w-1/3"
          label="Confirm"
          onClick={() =>
            navigate(`/new-wallet/${selected}?close-back=${currentCloseBack}`)
          }
        />
      </div>
    </div>
  )
}

const cssForCard = () => {
  return css`
    .card-item {
      cursor: pointer;
      border-radius: 15px;
      border: 1px solid #493965;

      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow:
        6px 6px 12px 0 rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0 rgba(148, 95, 255, 0.15);

      :hover {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }

      &.active {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    }
  `
}
