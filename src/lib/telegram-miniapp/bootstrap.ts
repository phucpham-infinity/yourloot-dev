import { init } from '@/lib/telegram-miniapp/init'
import {
  isTMA,
  swipeBehavior,
  closingBehavior,
  backButton
} from '@telegram-apps/sdk-react'

export async function bootstrapTelegramApp() {
  if (!(await isTMA('complete'))) {
    return
  }

  try {
    const debug = import.meta.env.VITE_TELEGRAM_DEBUG === 'true'

    try {
      await init({
        debug
      })

      swipeBehavior.mount()
      closingBehavior.mount()
      backButton.mount()

      if (swipeBehavior.disableVertical.isAvailable()) {
        swipeBehavior.disableVertical()
      }

      if (closingBehavior.enableConfirmation.isAvailable()) {
        closingBehavior.enableConfirmation()
      }

      return null
    } catch (error) {
      console.error('Telegram Mini App Bootstrap Error:', error)
      return null
    }
  } catch (error) {
    console.error('retrieveLaunchParams error:', error)
    return null
  }
}
