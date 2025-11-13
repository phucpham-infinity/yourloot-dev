import clsx from 'clsx'
import Loader from '../common/loader'

interface PaymentMethodItemProps {
  id: string
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  rightBanner?: React.ReactNode
  col: number
  onClick: () => void
  className?: string
  isLoading?: boolean
  isShowMoreButton?: boolean
}

export function PaymentMethodItem({
  id,
  title,
  subtitle,
  col,
  onClick,
  rightBanner,
  className,
  isLoading,
  isShowMoreButton
}: PaymentMethodItemProps) {
  return (
    <div
      key={id}
      onClick={isLoading ? undefined : onClick}
      style={{
        gridColumn: `span ${col}`,
        height: '88px',
        opacity: isLoading ? 0.5 : 1,
        border: isShowMoreButton ? '2px solid  #2A2242' : 'none',
        background: isShowMoreButton
          ? 'none'
          : 'linear-gradient(270deg, #310062 -0.22%, #17002D 99.92%), #191524'
      }}
      className={clsx(
        `bg-[#191524] rounded-[10px] p-4 cursor-pointer flex flex-row justify-between h-full overflow-hidden relative`,
        className
      )}
    >
      <div className="flex flex-col justify-between items-start gap-2 h-full overflow-hidden">
        <div className="text-app-medium-14 !leading-[17px] whitespace-nowrap">
          {title}
        </div>
        <div className="text-app-medium-12 text-[#9E90CF] whitespace-nowrap">
          {subtitle}
        </div>
      </div>
      {rightBanner && <div className="relative">{rightBanner}</div>}
      {isLoading && (
        <Loader
          size={20}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  )
}
