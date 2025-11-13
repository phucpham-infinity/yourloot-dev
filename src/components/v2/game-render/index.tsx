import { cn } from '@/lib/utils'
import { isDesktop, isMobile } from 'react-device-detect'

const GameRender = (children: React.ReactNode) => {
  return (
    <div
      className={cn(
        isDesktop && 'flex flex-wrap justify-start gap-4',
        isMobile && 'grid grid-cols-3 gap-2 '
      )}
    >
      {children}
    </div>
  )
}

export default GameRender
