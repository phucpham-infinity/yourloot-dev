import clsx from 'clsx'
import Gift from '@/assets/icons/v2/gift'
interface GiftLabelProps {
  text?: string
  className?: string
}

export function GiftLabel({ text = '+7%', className }: GiftLabelProps) {
  return (
    <div
      style={{
        background:
          'radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)'
      }}
      className={clsx(
        `w-fit box-border content-stretch flex gap-[4px] items-center justify-center p-[4px] rounded-[4px] relative`,
        className
      )}
    >
      <Gift />
      <div className="whitespace-pre text-app-bold-10 text-app-white">
        {text}
      </div>
    </div>
  )
}
