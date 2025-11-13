import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useHistoryTracker() {
  const location = useLocation()
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    setHistory((prev) => [
      ...prev,
      {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
        state: location.state,
        timestamp: new Date().toISOString()
      }
    ])
  }, [location])

  return {
    history,
    currentLocation: location,
    historyCount: history.length
  }
}
