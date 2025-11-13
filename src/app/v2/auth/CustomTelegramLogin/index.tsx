// @ts-ignore
import TelegramLoginButton from 'react-telegram-login'
import './index.css'
import TelegramIcon from '@/assets/icons/social/telegram'

const CustomTelegramLogin = ({
  registerTelegram,
  botName,
  isTelegramMiniApp,
  launchParams
}: {
  registerTelegram: (user: any) => void
  botName: string
  isTelegramMiniApp: boolean
  launchParams: any
}) => {
  if (isTelegramMiniApp) return null
  return (
    <div className="custom-telegram-wrapper flex items-center justify-center">
      <div
        onClick={() => {
          if (isTelegramMiniApp && launchParams) {
            registerTelegram({
              first_name: launchParams?.user?.first_name,
              last_name: launchParams?.user?.last_name,
              username: launchParams?.user?.username,
              photo_url: launchParams?.user?.photo_url,
              id: launchParams?.user?.id,
              hash: launchParams?.hash,
              auth_date:
                launchParams.auth_date.getTime() / 1000 ||
                launchParams.auth_date
            })
          }
        }}
        className="telegram-click-area"
      >
        <TelegramIcon />
        {!isTelegramMiniApp && !launchParams && (
          <TelegramLoginButton
            dataOnauth={registerTelegram}
            botName={botName || 'ylauthtestbot'}
            className="telegram-login-button"
          />
        )}
      </div>
    </div>
  )
}

export default CustomTelegramLogin
