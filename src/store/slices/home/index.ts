import { create } from 'zustand'

export type TypeState =
  | 'provider'
  | 'category'
  | 'search'
  | 'gamesoft'
  | 'liveGame'
  | 'favorite'
  | ''

export type ActiveTabType = 'dashboard' | 'game'

export type LayoutActiveType = 'left' | 'right'

interface HomeState {
  type: TypeState
  setType: (type: TypeState) => void
  isScroll: boolean
  setIsScroll: (isScroll: boolean) => void

  activeTab: ActiveTabType
  setActiveTab: (value: ActiveTabType) => void

  layoutActive: LayoutActiveType
  setLayoutActive: (value: LayoutActiveType) => void

  
}

export const useHomeStore = create<HomeState>()((set) => ({
  type: '',
  setType: (type) => set({ type }),
  isScroll: true,
  setIsScroll: (isScroll) => set({ isScroll }),

  activeTab: 'dashboard',
  setActiveTab: (value) => set({ activeTab: value }),

  layoutActive: 'left',
  setLayoutActive: (value) => set({ layoutActive: value }),

  
}))
