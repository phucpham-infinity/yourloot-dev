import { useEffect, useState } from 'react'
import { useDepositStore } from '@/store/slices/deposit'
interface ICountdownTimer {
  onTimeout?: () => void
}

const CountdownTimer = (props: ICountdownTimer) => {
  const { timeExpires, isProcessing } = useDepositStore()
  const { onTimeout } = props

  const [remainingTime, setRemainingTime] = useState(0)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (!timeExpires || timeExpires <= 0) {
      setIsExpired(true)
      if (isProcessing) {
        onTimeout?.()
      }
      return
    }

    const now = Date.now()
    const initialRemaining = Math.floor((timeExpires - now) / 1000)

    if (initialRemaining <= 0) {
      setIsExpired(true)
      if (isProcessing) {
        onTimeout?.()
      }
      return
    }

    setRemainingTime(initialRemaining)

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1
        if (newTime <= 0) {
          clearInterval(interval)
          setIsExpired(true)
          if (isProcessing) {
            onTimeout?.()
          }
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeExpires, isProcessing, onTimeout])

  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  if (isExpired) {
    return <div style={{ fontSize: '12px', fontWeight: 900 }}>00 : 00</div>
  }

  return (
    <div style={{ fontSize: '12px', fontWeight: 900 }}>
      {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
    </div>
  )
}

export default CountdownTimer
