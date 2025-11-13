import { useAuthStore, useProfileStore } from '@/store'
import DefaultAvatar from '@/assets/images/header/avatar.png'

export const UserAvatar = () => {
  const { profile } = useProfileStore()
  const { user } = useAuthStore()

  const anyProfile = (profile || {}) as any
  const fromResponse =
    anyProfile?.avatar ||
    anyProfile?.avatarUrl ||
    anyProfile?.image ||
    anyProfile?.imageUrl ||
    ''
  const src =
    fromResponse && typeof fromResponse === 'string'
      ? fromResponse
      : DefaultAvatar

  return (
    <div className="relative">
      <div className="h-[64px] w-[64px] rounded-[50px] border border-[#C3A2F1]/50 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.10)_100%)] shadow-[3px_3px_6px_0_rgba(22,20,24,0.50),-3px_-3px_12px_0_rgba(148,95,255,0.15)] overflow-hidden">
        <img
          src={user?.photo_url ?? src}
          alt="user-avatar"
          className="w-full h-full object-cover rounded-[50px]"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement
            if (img.src !== DefaultAvatar) img.src = DefaultAvatar
          }}
        />
      </div>
    </div>
  )
}
