import StatusFailed from '@/assets/icons/status-failed.tsx'
import StatusSuccess from '@/assets/icons/status-success.tsx'
import StatusWait from '@/assets/icons/status-wait.tsx'
import CustomButton from '@/components/common/custom-button'
import Loader from '@/components/common/loader'
import { css } from '@/lib/utils.ts'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

interface Props {
  isHidden: boolean
  data: any[]
  onClose: () => void
  onDeposit: () => void
  onWithDraw: () => void
  onLoadMore?: () => void
  hasMore?: boolean
  label: string
  firstButtonLabel: string
  secondButtonLabel: string
  currency: string
  isLoading: boolean
}
export default function DataTableV2(props: Props) {
  const {
    label,
    firstButtonLabel,
    secondButtonLabel,
    isHidden = false,
    data = [],
    onClose,
    onDeposit,
    onWithDraw,
    onLoadMore,
    hasMore,
    currency,
    isLoading
  } = props

  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView && hasMore) {
      onLoadMore && onLoadMore()
    }
  }, [inView])

  return (
    <div
      className={
        isHidden
          ? 'w-0 hidden overflow-hidden flex-col p-5 pb-0'
          : 'lg:w-1/2 max-lg:w-full overflow-hidden flex-col p-5 pb-0 max-lg:p-0'
      }
    >
      <div className="inline-flex items-center justify-between w-full pt-3 mx-auto">
        <div className="text-white text-2xl text- font-black font-['Satoshi']">
          {label}
        </div>
        <div className="inline-flex items-center justify-between gap-3">
          <CustomButton
            label={firstButtonLabel}
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            variant="muted"
            onClick={() => {
              onDeposit()
            }}
          />
          <CustomButton
            label={secondButtonLabel}
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            variant="muted"
            onClick={() => {
              onWithDraw()
            }}
          />
          <CustomButton
            label={t('common.close', 'Close')}
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            onClick={() => {
              onClose.call(null)
            }}
            variant="muted"
          />
        </div>
      </div>

      {isLoading && data.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <Loader />
        </div>
      ) : (
        <div
          className="w-full h-115 border border-[#403b4a] rounded-2xl mt-2 mb-3 p-3 pt-0 self-stretch overflow-auto"
          css={cssFn()}
        >
          <table className="w-full border-collapse">
            <thead className="h-6 sticky top-0 bg-[#1a1522] w-full z-1">
              <tr>
                <th className="items-center p-5 pr-0 text-center"></th>
                <th className="justify-start text-[#9d90cf] text-xs font-black font-['Satoshi'] text-left p-0">
                  {t('balance.history.action', 'Action')}
                </th>
                <th className="justify-start text-[#9d90cf] text-xs font-black font-['Satoshi'] text-left p-0 overflow-hidden">
                  {t('balance.history.date', 'Date')}
                </th>
                <th className="justify-start text-[#9d90cf] text-xs font-black font-['Satoshi'] text-left lg:pr-6">
                  {t('balance.history.currency', 'Currency')}
                </th>
                <th className="justify-start text-[#9d90cf] text-xs font-black font-['Satoshi'] text-left p-0">
                  {t('balance.history.amount', 'Amount')}
                </th>
                {!isMobile ? (
                  <th className="justify-start text-[#9d90cf] text-xs font-black font-['Satoshi'] text-left p-0">
                    {t('balance.history.status', 'Status')}
                  </th>
                ) : (
                  ''
                )}
              </tr>
            </thead>
            <tbody>
              {renderDataRecords(data, currency)}
              <tr>
                <td>
                  <div
                    ref={ref}
                    className="flex items-center justify-center w-full h-5"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    // </div>
  )
}

const capitalizeFirstLetter = (val: string): string => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1)
}

const renderDataRecords = (data: any[], currency: string) => {
  const CURRENCY_SIGN: any = {
    BTC: '₿',
    ETH: 'ETH',
    LTC: 'Ł',
    BNB: 'BNB',
    USDT: '₮',
    TRX: 'TRX',
    TON: 'TON',
    USD: '$',
    RUB: '₽',
    EUR: '€',
    GBP: '£',
    AMD: '֏',
    AZN: '₼',
    BYN: 'Br',
    KZT: '₸',
    KGS: 'KGS',
    TJS: 'TJS',
    BBK: 'BBK'
  }
  return data.map((item, index) => {
    const { status, orderType, createdAt, amount } = item

    const statusIcon =
      status.toLowerCase() === 'succeed' ? (
        <StatusSuccess />
      ) : status.toLowerCase() === 'accepted' ? (
        <StatusWait />
      ) : (
        <StatusFailed />
      )
    return (
      <tr key={index} className="items-center justify-center w-full">
        <td className="items-center justify-center">{statusIcon}</td>
        <td className="relative justify-center text-[#c5c0d8] text-xs font-black font-['Satoshi']">
          {capitalizeFirstLetter(orderType.toLowerCase())}
        </td>
        <td className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {dayjs(createdAt).format('HH:mm DD.MM.YYYY')}
        </td>
        <td className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {currency}
        </td>
        <td className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          {CURRENCY_SIGN[currency]} {amount}
        </td>
        {!isMobile ? (
          <td className="relative justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {status}
          </td>
        ) : (
          ''
        )}
      </tr>
    )
  })
}

const cssFn = () => {
  return css`
    background-image: linear-gradient(140deg, #1a1522 60%, #2a1f42 80%);
  `
}
