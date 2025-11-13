import { create } from 'zustand'

export type ActiveTabType =
  | 'all'
  | 'available'
  | 'tournament'
  | 'loyalty'
  | 'promotion'

interface BonusState {
  activeTab: ActiveTabType
  setActiveTab: (value: ActiveTabType) => void
}

export const useBonusStore = create<BonusState>()((set) => ({
  activeTab: 'all',
  setActiveTab: (value) => set({ activeTab: value })
}))
