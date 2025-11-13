import CountdownTimer from '@/components/common/countdow-timer'
import { cryptoCurrencyNetwork } from '@/constants'
import { css } from '@/lib/utils.ts'
import clsx from 'clsx'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useDepositStore } from '@/store/slices/deposit'
interface BankCardAmountProps {
  title?: string
  description?: string
  children?: React.ReactNode
  showLeftContent?: boolean
  hiddenTitle?: boolean
  hiddenTimer?: boolean
}

const CryptocurrencyLayout = (props: BankCardAmountProps) => {
  const {
    title,
    description,
    showLeftContent = false,
    hiddenTitle = false,

    children,
    hiddenTimer = false
  } = props
  const { walletName, cryptocurrencyName, networkName } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const networkIcon = cryptoCurrencyNetwork
    .find((item) => item.currency === cryptocurrencyName)
    ?.networks.find((item) => item.network === networkName)?.icon
  const setIsSuccess = useDepositStore((s) => s.setIsSuccess)
  const orderCrypto = useDepositStore((state) => state.orderCrypto)

  return (
    <div css={style} className="w-full flex flex-col content-container">
      <div className="px-10 pt-10 pb-5">
        {!hiddenTitle && (
          <div className="w-full justify-between items-start inline-flex">
            <div className="w-[500px] flex-col justify-start items-start gap-5 leading-normal inline-flex">
              {title && (
                <div className="w-full text-white text-xl font-black">
                  {title}
                </div>
              )}
              {description && (
                <div
                  className={clsx('text-[#c5c0d8] text-xs font-medium', {
                    'pt-0!': isMobile
                  })}
                >
                  {description}
                </div>
              )}
            </div>
            {showLeftContent && (
              <div
                className={clsx(
                  ' flex-col justify-between items-end inline-flex',
                  {
                    'w-1/2 max-w-1/2 min-w-1/2': isMobile,
                    'w-2/5 max-w-2/5 min-w-2/5': !isMobile
                  }
                )}
              >
                <div className="relative">{networkIcon}</div>
                <div className="justify-start items-center gap-2.5 inline-flex pt-2">
                  <div className="text-right text-[#c5c0d8] text-xs font-medium">
                    {cryptocurrencyName} ({networkName})
                  </div>
                </div>
                <div
                  style={{ opacity: hiddenTimer ? 0 : 1 }}
                  className="justify-start items-center gap-2.5 inline-flex pt-2"
                >
                  <div className="text-right text-[#c5c0d8] text-xs font-medium">
                    {t('deposit.timeLeft')}
                  </div>
                  <div className="text-right text-[#c5c0d8] text-xs font-black">
                    <CountdownTimer
                      onTimeout={() => {
                        setIsSuccess(false)
                        navigate(
                          `/deposit/${orderCrypto?.walletName || walletName}/cryptocurrency/${orderCrypto?.cryptocurrencyName}/network/${orderCrypto?.network}/done${location.search}`
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

export default CryptocurrencyLayout
