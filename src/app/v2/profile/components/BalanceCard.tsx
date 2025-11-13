import { getWalletIcon } from '@/app/v2/new-wallet/common'
import Bonus2Icon from '@/assets/icons/v2/bonus2'
import Primary2Icon from '@/assets/icons/v2/primary'
import YLIcon from '@/assets/icons/v2/YLIcon.tsx'
import { css } from '@emotion/react'

interface BalanceCardProps {
  icon: 'primary' | 'bonus' | 'loot'
  amount: string
  label: string
  className?: string
  currency?: string
}

const getIconComponent = (type: string, currency?: string) => {
  switch (type) {
    case 'primary':
      return (
        <div className="w-4 h-4">
          {currency ? (
            getWalletIcon(currency, { size: 'md' })
          ) : (
            <Primary2Icon className="w-[18px]" />
          )}
        </div>
      )
    case 'bonus':
      return (
        <div className="w-4 h-4">
          <Bonus2Icon className="w-[18px]" />
        </div>
      )
    case 'loot':
      return (
        <div className="w-4 h-4">
          <YLIcon className="w-[18px]" />
        </div>
      )
    default:
      return null
  }
}

export const BalanceCard = ({
  icon,
  amount,
  label,
  className,
  currency
}: BalanceCardProps) => {
  return (
    <div
      css={styles}
      className={`md:flex-col p-3 min-h-[51px] flex items-center gap-2 rounded-[10px] bg-[#191524FF] ${className || ''}`}
    >
      {getIconComponent(icon, currency)}
      <div className="flex flex-col gap-[8px]">
        <span className="text-white text-[14px] leading-[14px]">{amount}</span>
        <span className="text-[12px] items-center leading-[12px] text-[#C5C0D8]">
          {label}
        </span>
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 10px;
`
