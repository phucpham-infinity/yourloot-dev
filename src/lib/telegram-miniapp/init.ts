import {
  setDebug,
  mountBackButton,
  restoreInitData,
  init as initSDK,
  bindThemeParamsCssVars,
  mountViewport,
  bindViewportCssVars,
  miniApp,
  requestFullscreen
} from '@telegram-apps/sdk-react'

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(options: { debug: boolean }): Promise<void> {
  setDebug(options.debug)
  initSDK()

  mountBackButton.ifAvailable()
  restoreInitData()

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync()
    bindThemeParamsCssVars()
  }

  const isAvailable = mountViewport.isAvailable()

  if (isAvailable) {
    try {
      await mountViewport()
      bindViewportCssVars()
      requestFullscreen()
    } catch (error) {
      console.error('Error mounting viewport:', error)
    }
  }
}
