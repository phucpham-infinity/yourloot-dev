import React from 'react'
import { css } from '@/lib/utils.ts'
import BankCardLogo from '@/assets/images/deposit/bank-card-logo.svg'
import { isMobile } from 'react-device-detect'

interface BankCardAmountProps {
  title?: string
  description?: string
  children?: React.ReactNode
  showLeftContent?: boolean
  hiddenTitle?: boolean
}

const BankCardLayout = (props: BankCardAmountProps) => {
  const {
    title,
    description,
    showLeftContent = false,
    hiddenTitle = false,
    children
  } = props
  return (
    <div css={style} className="flex flex-col">
      <div className="px-10 pt-10 pb-5">
        {!hiddenTitle && (
          <div className="self-stretch justify-between items-center gap-10 inline-flex">
            <div className="flex-col justify-start items-start gap-5 leading-normal inline-flex">
              {title && (
                <div className="self-stretch text-white text-xl leading-0 font-black">
                  {title}
                </div>
              )}
              {description && (
                <div className="text-[#c5c0d8] text-xs font-medium">
                  {description}
                </div>
              )}
            </div>
            {showLeftContent && (
              <div className="h-full flex-col justify-between items-end inline-flex">
                <div className="relative">
                  <img
                    alt={'BankCardLogo'}
                    className={'w-[55px]'}
                    src={BankCardLogo}
                  />
                </div>
                <div className="justify-start items-center gap-2.5 inline-flex pt-2">
                  <div className="text-right text-[#c5c0d8] text-xs font-medium">
                    Time left:
                  </div>
                  <div className="text-right text-[#c5c0d8] text-xs font-black">
                    15m : 14s
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="content-container px-10 pb-10 pt-5 self-stretch flex-col justify-start items-start gap-5 flex">
        {children}
      </div>
    </div>
  )
}

const style = css`
  width: 100%;
  .content-container {
    max-height: ${isMobile ? '30vh' : '50vh'};
    overflow-y: auto;
  }
  .item {
    cursor: pointer;
    width: 140px;
    border-radius: 15px;
    border: 1px solid #40385a;
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
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
    }
  }
`

export default BankCardLayout
