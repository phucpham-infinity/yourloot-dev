import { cn } from '@/lib/utils'

export interface GameLauncherComponentProps {
  launchUrl: string
  width?: string | number
  height?: string | number
  className?: string
}

const GameLauncherComponent = (props: GameLauncherComponentProps) => {
  const { launchUrl, width, height, className } = props

  return (
    <div className={cn('w-full rounded-[15px] overflow-hidden p-0', className)}>
      <iframe src={launchUrl} style={{ width, height }}></iframe>
    </div>
  )
}

export default GameLauncherComponent
