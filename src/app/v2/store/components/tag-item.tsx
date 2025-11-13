import Clock2Icon from '@/assets/icons/v2/Clock2'
import Clock3Icon from '@/assets/icons/v2/Clock3'
import { clsx } from 'clsx'
import { useMemo } from 'react'

interface TagItemProps {
  icon?: React.ReactNode
  title: string
  className?: string
}

export default function TagItem({ icon, title, className }: TagItemProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'clock':
        return <Clock2Icon className="w-4 h-4 text-white" />
      case 'history':
        return <Clock3Icon className="w-4 h-4 text-white" />
    }
  }

  const backgroundColor = useMemo(() => {
    if (icon === 'clock') {
      return 'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)'
    }
    return '#6C6395'
  }, [icon])

  return (
    <div
      style={{ background: backgroundColor }}
      className={clsx(
        'h-[25px] px-2.5 py-1.5 rounded-[10px] flex justify-center items-center gap-1',
        className
      )}
    >
      {renderIcon()}
      <div className="text-center justify-center text-white text-xs font-medium leading-none">
        {title}
      </div>
    </div>
  )
}
