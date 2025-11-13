import { css } from '@/lib/utils.ts'
import React from 'react'
import { cryptoCurrencyNetwork } from '@/constants'

interface BankCardAmountProps {
  title?: string
  description?: string
  children?: React.ReactNode
  showLeftContent?: boolean
  hiddenTitle?: boolean
  cryptocurrencyName?: string
  networkName?: string
}

const CryptocurrencyLayout = (props: BankCardAmountProps) => {
  const {
    title,
    description,
    showLeftContent = false,
    hiddenTitle = false,
    cryptocurrencyName,
    networkName,
    children
  } = props

  const icon = cryptoCurrencyNetwork.find(
    (x) => x.currency === cryptocurrencyName
  )?.icon

  return (
    <div
      css={style}
      className="p-10 w-full  flex flex-col items-center justify-between gap-10"
    >
      {!hiddenTitle && (
        <div className="self-stretch  justify-between items-center gap-10 inline-flex">
          <div className="flex-col w-3/4 max-w-3/4 justify-start items-start gap-5 inline-flex">
            {title && (
              <div className="self-stretch text-white text-xl leading-none font-black">
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
            <div className="h-full  w-1/4 max-w-1/4  flex-col justify-between items-end inline-flex">
              <div className="relative">{icon}</div>
              <div className="justify-start items-center gap-2.5 inline-flex pt-2">
                <div className="text-right text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                  {cryptocurrencyName} ({networkName})
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="self-stretch flex-col justify-start items-start gap-5 flex">
        {children}
      </div>
    </div>
  )
}

const style = css`
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

export default CryptocurrencyLayout
