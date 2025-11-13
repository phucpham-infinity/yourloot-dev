import { BasicDialog } from '@/components/common/basic-dialog'
import { CustomDialog } from '@/components/common/custom-dialog'
import { MobileRedirectGuard } from '@/components/v2/mobile-redirect-guard'
import { css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const authRoutes = ['/auth/forgot-password', '/auth/restore-password']

export default function AuthLayout() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { pathname } = useLocation()
  return (
    <MobileRedirectGuard replace>
      <div
        css={styles}
        style={{
          backgroundImage: `url('/images/overlay.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <Outlet />
        <CustomDialog />
        {!authRoutes.includes(pathname) && (
          <div className="h-10 pt-[40px] justify-center items-center gap-5 inline-flex">
            <div className=" h-10 p-5 justify-between items-center flex">
              <div className="justify-start items-center flex">
                <div
                  className="text-center text-[#605e68] text-xs font-medium underline cursor-pointer"
                  onClick={() => navigate('/terms-and-conditions')}
                >
                  {t('auth.terms')}
                </div>
              </div>
            </div>
            <div className="h-10 p-5 justify-between items-center flex">
              <div className="justify-start items-center flex">
                <div
                  className="text-center text-[#605e68] text-xs font-medium underline cursor-pointer"
                  onClick={() => navigate('/privacy-policy')}
                >
                  {t('auth.privacyPolicy')}
                </div>
              </div>
            </div>
          </div>
        )}
        <BasicDialog />
      </div>
    </MobileRedirectGuard>
  )
}

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
`
