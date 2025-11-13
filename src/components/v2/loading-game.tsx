import { cn } from '@/lib/utils'
import { isDesktop, isMobile } from 'react-device-detect'

interface LoadingGameProps {
  count?: number
  className?: string
}

function LoadingGame({ count, className }: LoadingGameProps) {
  const defaultCount = 24
  const itemCount = count || defaultCount

  return (
    <div
      className={cn(
        isDesktop && 'flex flex-wrap justify-start gap-4',
        isMobile && 'grid grid-cols-3 gap-2',
        className
      )}
    >
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="min-w-[115px] min-h-[151px] w-full h-[151px] md:min-w-[146px] md:min-h-[202px] md:w-[146px] md:h-[202px] bg-gray-50 rounded-[10px] animate-pulse"
        />
      ))}
    </div>
  )
}

export default LoadingGame
