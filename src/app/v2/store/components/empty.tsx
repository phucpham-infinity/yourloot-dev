import { clsx } from 'clsx'

interface EmptyStoreStateProps {
  className?: string
  title: string
}

export default function EmptyStore({ className, title }: EmptyStoreStateProps) {
  return (
    <div
      className={clsx(
        'h-[74px] py-8 bg-[#191524] rounded-[10px] inline-flex flex-col justify-center items-center gap-4 overflow-hidden',
        className
      )}
    >
      <div className="text-app-medium-14 text-[#9E90CF] text-center leading-[20px]">
        {title}
      </div>
    </div>
  )
}
