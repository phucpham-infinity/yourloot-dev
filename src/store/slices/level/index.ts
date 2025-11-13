import { create } from 'zustand'
import { UserLevel } from '@/services/controller/levels'
interface LevelStore {
  // State
  level: UserLevel | null

  // Actions
  setLevel: (level: UserLevel) => void
  clearLevel: () => void
}

export const useLevelStore = create<LevelStore>()((set) => ({
  // State
  level: null,

  // Actions
  setLevel: (level) => set({ level }),
  clearLevel: () => set({ level: null })
}))
