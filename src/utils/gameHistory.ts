interface GameHistoryItem {
  id: string
  provider: string
  title: string
  visitedAt: string
}

const GAME_HISTORY_KEY_PREFIX = 'gameHistory'
const MAX_HISTORY_ITEMS = 50 // Limit to prevent localStorage from growing too large

/**
 * Get the user-specific game history key
 * @param userId User ID to create specific key for
 * @returns User-specific localStorage key
 */
const getGameHistoryKey = (userId: string | null): string => {
  return userId ? `${GAME_HISTORY_KEY_PREFIX}_${userId}` : GAME_HISTORY_KEY_PREFIX
}

/**
 * Save a game to the history in localStorage
 * @param game Game object with id, provider, and title
 * @param userId Optional user ID to save history for specific user
 */
export const saveGameToHistory = (game: { id: string; provider: string; title: string }, userId: string | null) => {
  try {
    // Get existing history
    const existingHistory = getGameHistory(userId)
    
    // Create new history item
    const newHistoryItem: GameHistoryItem = {
      ...game,
      visitedAt: new Date().toISOString()
    }
    
    // Remove existing entry if it exists (to update visitedAt)
    const filteredHistory = existingHistory.filter(
      item => !(item.id === game.id && item.provider === game.provider)
    )
    
    // Add new item to the beginning
    const updatedHistory = [newHistoryItem, ...filteredHistory]
    
    // Limit the history to MAX_HISTORY_ITEMS
    const limitedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS)
    
    // Save to localStorage with user-specific key
    const historyKey = getGameHistoryKey(userId)
    localStorage.setItem(historyKey, JSON.stringify(limitedHistory))
  } catch (error) {
    console.error('Failed to save game to history:', error)
  }
}

/**
 * Retrieve game history from localStorage
 * @param userId Optional user ID to get history for specific user
 * @returns Array of game history items, most recent first
 */
export const getGameHistory = (userId: string | null): GameHistoryItem[] => {
  try {
    const historyKey = getGameHistoryKey(userId)
    const historyJson = localStorage.getItem(historyKey)
    if (!historyJson) {
      return []
    }
    
    const history: GameHistoryItem[] = JSON.parse(historyJson)
    
    // Validate the data structure
    if (!Array.isArray(history)) {
      return []
    }
    
    // Filter out invalid entries and sort by visitedAt (most recent first)
    return history
      .filter(item => 
        item && 
        typeof item === 'object' && 
        item.id && 
        item.provider && 
        item.visitedAt
      )
      .sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime())
  } catch (error) {
    console.error('Failed to retrieve game history:', error)
    return []
  }
}

/**
 * Clear game history from localStorage
 * @param userId Optional user ID to clear history for specific user
 */
export const clearGameHistory = (userId: string) => {
  try {
    const historyKey = getGameHistoryKey(userId)
    localStorage.removeItem(historyKey)
  } catch (error) {
    console.error('Failed to clear game history:', error)
  }
}

/**
 * Get limited game history for display (default 20 items)
 * @param limit Number of items to return
 * @param userId Optional user ID to get history for specific user
 * @returns Limited array of game history items
 */
export const getGameHistoryForDisplay = (limit: number = 20, userId: string | null): GameHistoryItem[] => {
  const fullHistory = getGameHistory(userId)
  return fullHistory.slice(0, limit)
}