import { useEffect, useRef, useState } from 'react'

/**
 * useIdle - detect when the user is idle (no interaction) for a given time
 * @param timeout - idle time in milliseconds (default: 15 minutes)
 * @returns isIdle - true if the user is idle
 */
// export default function useIdle(timeout: number = 15 * 60 * 1000): boolean {
export default function useIdle(timeout: number = 20 * 60 * 1000): boolean {
  const [isIdle, setIsIdle] = useState<boolean>(false)
  const timerRef = useRef<number | undefined>(undefined)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetTimer = () => {
    if (isIdle) setIsIdle(false)
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      setIsIdle(true)
    }, timeout)
  }

  useEffect(() => {
    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll'
    ]

    events.forEach((event) => window.addEventListener(event, resetTimer))

    resetTimer() // Start timer when component mounts

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeout, isIdle, resetTimer])

  return isIdle
}
