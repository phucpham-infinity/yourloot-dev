import { init } from '@sumsub/fisherman'
import { useAuthStore } from '@/store'
import objectHash from 'object-hash'
import { userController } from '@/services/controller'
import { destroy } from '@sumsub/fisherman'
import { PlatformEventType } from '@/services/controller/users'

export const useUserPlatformEvent = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  const { mutateAsync: generateDeviceIdToken } =
    userController().useGetUserDeviceIdToken()

  const { mutateAsync: userPlatformEvents } =
    userController().useUserPlatformEvents()

  const currentUserId = useAuthStore((s) => s.userId)

  const postUserPlatformEvent = async ({
    eventType,
    userId,
    token
  }: {
    eventType: PlatformEventType
    userId?: string
    token?: string
  }) => {
    if (import.meta.env.VITE_APP_MODE === 'production') return
    try {
      const sessionId = objectHash({ accessToken: token || accessToken })
      if (!sessionId) return
      const deviceIdToken = await generateDeviceIdToken(sessionId)
      if (!deviceIdToken) return
      const fishermanInstance = await init({ token: deviceIdToken })
      if (fishermanInstance) {
        await fishermanInstance.fingerprint?.()
        await userPlatformEvents({
          userId: userId || currentUserId || '',
          diToken: deviceIdToken,
          eventType
        })
        destroy()
      }
    } catch (error) {
      console.log('Error getting fingerprint', error)
    }
  }

  return { postUserPlatformEvent }
}
