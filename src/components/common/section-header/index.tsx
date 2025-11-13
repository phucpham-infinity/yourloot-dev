import FireIcon from '@/assets/icons/fire'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  className?: string
  title: string
  icon?: React.ReactNode
}

const SectionHeader = ({ className, title, icon }: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        ' w-full   grow shrink basis-0 h-10 justify-start items-center gap-5 flex',
        className
      )}
    >
      {icon ? icon : <FireIcon />}
      <div className="text-white text-[22px] font-black font-['Satoshi']">
        {title}
      </div>
    </div>
  )
}

export default SectionHeader
