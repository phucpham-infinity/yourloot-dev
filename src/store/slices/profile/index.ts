import { create } from 'zustand'
import { UserProfile } from '@/services/controller/users'
import { LevelProgress } from '@/services/controller'
import { Achievement } from '@/services/controller/achivements'
interface ProfileStore {
  userId: string | null
  profile: UserProfile | null
  isEdit: boolean
  ip: string | null

  //level progress
  levelProgress: LevelProgress | null

  //achievements
  achievements: Achievement[] | null

  isEditEmail: boolean
  isLoadingEmail: boolean
  isEditBirthDate: boolean
  isLoadingBirthDate: boolean
  isEditPhoneNumber: boolean
  isLoadingPhoneNumber: boolean

  // actions
  setProfile: (profile: UserProfile) => void
  setUserId: (userId: string) => void
  setIsEdit: (isEdit: boolean) => void
  setIp: (ip: string) => void
  setIsEditEmail: (isEditEmail: boolean) => void
  setIsEditBirthDate: (isEditBirthDate: boolean) => void
  setIsEditPhoneNumber: (isEditPhoneNumber: boolean) => void
  setIsLoadingEmail: (isLoadingEmail: boolean) => void
  setIsLoadingBirthDate: (isLoadingBirthDate: boolean) => void
  setIsLoadingPhoneNumber: (isLoadingPhoneNumber: boolean) => void

  setLevelProgress: (levelProgress: LevelProgress) => void
  setAchievements: (achievements: Achievement[]) => void
}

export const useProfileStore = create<ProfileStore>()((set) => ({
  // State
  userId: null,
  profile: null,
  isEdit: false,

  levelProgress: null,
  achievements: null,

  isEditEmail: true,
  isLoadingEmail: false,
  isEditBirthDate: true,
  isLoadingBirthDate: false,
  isEditPhoneNumber: true,
  isLoadingPhoneNumber: false,
  ip: null,

  // Actions
  setProfile: (profile) => set({ profile }),
  setIsEdit: (isEdit) => set({ isEdit }),
  setUserId: (userId) => set({ userId }),

  setIsEditEmail: (isEditEmail) => set({ isEditEmail }),
  setIsEditBirthDate: (isEditBirthDate) => set({ isEditBirthDate }),
  setIsEditPhoneNumber: (isEditPhoneNumber) => set({ isEditPhoneNumber }),
  setIsLoadingEmail: (isLoadingEmail) => set({ isLoadingEmail }),
  setIsLoadingBirthDate: (isLoadingBirthDate) => set({ isLoadingBirthDate }),
  setIsLoadingPhoneNumber: (isLoadingPhoneNumber) =>
    set({ isLoadingPhoneNumber }),
  setIp: (ip) => set({ ip }),

  setLevelProgress: (levelProgress) => set({ levelProgress }),
  setAchievements: (achievements) => set({ achievements })
}))
