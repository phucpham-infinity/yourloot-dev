import RUBICon from '@/assets/icons/fiat/rub'
import YLIcon from '@/assets/icons/v2/YLIcon'
import { clsx } from 'clsx'
import { lazy } from 'react'

const CustomButton = lazy(() => import('@/components/common/custom-button'))

interface PaymentOptionProps {
  price: string
  iconType: 'coin' | 'cash'
  buttonLabel: string
  className?: string
  onClick?: () => void
}

export default function PaymentOption({
  price,
  iconType,
  buttonLabel,
  className,
  onClick
}: PaymentOptionProps) {
  const renderIcon = () => {
    if (iconType === 'coin') {
      return <YLIcon className="w-4 h-4 text-white" />
    }

    return (
      <div className="w-4 h-4 relative overflow-hidden">
        <RUBICon className="w-4 h-4 text-white" />
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'flex-1 px-1 pt-2 pb-1 rounded-[10px] outline-1 outline-offset-[-1px] outline-[rgba(92,70,123,0.5)] inline-flex flex-col justify-center items-center gap-2',
        className
      )}
    >
      <div className="inline-flex justify-center items-center gap-1">
        {renderIcon()}
        <div className="text-center justify-start text-white text-xs font-medium leading-none">
          {price}
        </div>
      </div>
      <CustomButton
        onClick={onClick}
        variant="default"
        label={buttonLabel}
        className="self-stretch"
        height={40}
      />
    </div>
  )
}
