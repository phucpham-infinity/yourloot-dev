import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface ClockerCountdownProps {
  startTime?: number
  className?: string
  timeRemainingMinutes?: number
  onTimeout?: () => void
  dense?: boolean
}

const ClockerCountdown = ({
  startTime,
  className = '',
  timeRemainingMinutes = 15,
  onTimeout,
  dense = false
}: ClockerCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>(dense ? '00:00' : '0m 0sec')

  useEffect(() => {
    if (!startTime) return

    const endTime = startTime + timeRemainingMinutes * 60 * 1000 // Convert minutes to milliseconds

    const updateTimer = () => {
      const now = Date.now()
      const difference = endTime - now

      if (difference <= 0) {
        setTimeLeft(dense ? '00:00' : '0m 0sec')
        onTimeout?.()
        return
      }

      const minutes = Math.floor(difference / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      if (dense) {
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')
        setTimeLeft(`${formattedMinutes}:${formattedSeconds}`)
      } else {
        setTimeLeft(`${minutes}m ${seconds}sec`)
      }
    }

    updateTimer()

    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [startTime, timeRemainingMinutes, onTimeout])

  return (
    <span className={clsx('text-app-medium-12 text-[#E3B075]', className)}>
      {timeLeft}
    </span>
  )
}

export default ClockerCountdown
