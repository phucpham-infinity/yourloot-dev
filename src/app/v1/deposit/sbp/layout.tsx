import SBPLogo from '@/assets/images/deposit/sbp-logos.svg'
import CountdownTimer from '@/components/common/countdow-timer'
import { css } from '@/lib/utils.ts'
import React from 'react'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'
import { useParams, useNavigate } from 'react-router-dom'
import { useDepositStore } from '@/store/slices/deposit'

interface BankCardAmountProps {
  title?: string
  description?: string
  children?: React.ReactNode
  showLeftContent?: boolean
  hiddenTitle?: boolean
  hiddenTimer?: boolean
}

const SBPLayout = (props: BankCardAmountProps) => {
  const {
    title,
    description,
    showLeftContent = false,
    hiddenTitle = false,
    hiddenTimer = false,
    children
  } = props
  const { walletName, bankName } = useParams()
  const orderSbp = useDepositStore((state) => state.orderSbp)

  const navigate = useNavigate()
  return (
    <div css={style} className="w-full flex flex-col">
      <div className="px-10 pt-10 pb-5">
        {!hiddenTitle && (
          <div className="w-full justify-between items-start inline-flex">
            <div className="flex-col justify-start items-start gap-5 leading-normal inline-flex">
              {title && (
                <div className="self-stretch text-white text-xl leading-0 font-black">
                  {title}
                </div>
              )}
              {description && (
                <div
                  className={clsx('pt-5 text-[#c5c0d8] text-xs font-medium', {
                    'pt-0!': isMobile
                  })}
                >
                  {description}
                </div>
              )}
            </div>
            {showLeftContent && (
              <div className="h-full w-1/2  flex-col justify-between items-end inline-flex">
                <div className="relative">
                  <img
                    alt={'BankCardLogo'}
                    className={'w-[55px]'}
                    src={SBPLogo}
                  />
                </div>
                <div
                  style={{ opacity: hiddenTimer ? 0 : 1 }}
                  className="justify-start items-center gap-2.5 inline-flex pt-2"
                >
                  <div className="text-right text-[#c5c0d8] text-xs font-medium">
                    Time left:
                  </div>
                  <div className="text-right text-[#c5c0d8] text-xs font-black">
                    <CountdownTimer
                      onTimeout={() => {
                        navigate(
                          `/deposit/${walletName}/sbp/${orderSbp?.bankName || bankName}/done${location.search}`
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="px-10 pb-10 pt-5 self-stretch flex-col justify-start items-start gap-5 flex">
        {children}
      </div>
    </div>
  )
}

const style = css`
  max-height: ${isMobile ? '45vh' : '62vh'};
  overflow-y: auto;

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

export default SBPLayout
