import SessionIcon from '@/assets/icons/v2/session'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAuthStore, useV2DialogStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface SessionEndedDrawerProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

export default function SessionEndedDrawer({ open }: SessionEndedDrawerProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { logout, setSessionNotActive } = useAuthStore()
  const dialog = useV2DialogStore()
  const isMobile = useIsMobile()

  const handleLogin = () => {
    setSessionNotActive(false)
    logout()
    navigate('/auth/login')
  }

  const handleOpenChange = () => {
    setSessionNotActive(false)
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (!isMobile) {
      if (open) {
        dialog.open({
          title: t('session.endedTitle', 'Session Ended'),
          content: (
            <div className="flex flex-col items-center w-full pb-2">
              <div className="flex flex-col items-center self-stretch justify-center gap-4 pb-8">
                <SessionIcon />
                <div className="self-stretch text-center text-app-white text-app-medium-14">
                  {t('session.endedTitle', 'Session Ended')}
                </div>
                <div className="self-stretch text-center text-app-pale text-app-medium-14">
                  {t(
                    'session.endedDesc',
                    'Your session is over due to inactivity. Log in to continue.'
                  )}
                </div>
              </div>
              <div className="flex w-full gap-3">
                <CustomButton
                  className="w-full"
                  label={t('common.login', 'Log In')}
                  onClick={handleLogin}
                />
              </div>
            </div>
          ),
          closeCallback: () => {
            setSessionNotActive(false)
            logout()
            navigate('/')
          },
          className: '!w-[400px]'
        })
      } else {
        dialog.close()
      }
    }
  }, [open])

  if (!isMobile) {
    return null
  }

  return (
    <CustomDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={t('session.endedTitle', 'Session Ended')}
      contentClassName="w-full"
      bodyClassName="px-4 py-6"
    >
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center self-stretch justify-center gap-4 pb-8">
          <SessionIcon />
          <div className="self-stretch text-center text-app-white text-app-medium-14">
            {t('session.endedTitle', 'Session Ended')}
          </div>
          <div className="self-stretch text-center text-app-pale text-app-medium-14">
            {t(
              'session.endedDesc',
              'Your session is over due to inactivity. Log in to continue.'
            )}
          </div>
        </div>
        <CustomButton
          className="w-full"
          label={t('common.login', 'Log In')}
          onClick={handleLogin}
        />
      </div>
    </CustomDrawer>
  )
}
