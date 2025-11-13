import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils'
import { useAuthStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CryptoDepositNow = () => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div
      className="relative w-full h-[100px] rounded-[8px] my-[24px] "
      style={{
        background:
          'linear-gradient(0deg, rgba(154, 103, 255, 0.20) 0%, rgba(154, 103, 255, 0.20) 100%), radial-gradient(103.94% 265.37% at 59.95% -118.74%, #654EC8 0%, #372864 100%)'
      }}
    >
      <img
        src="/images/v2/deposit/deposit-now-new.png"
        className="absolute top-1/2 -translate-y-1/2 left-[14px] w-[149px] h-[148px]"
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-[175px] right-[180px] text-v2-app-medium-24 text-white text-center flex justify-center items-center">
        {t(
          'depositWithdrawV2.cryptoBonusMessage',
          'Get a + 7% bonus on crypto deposits!'
        )}
      </div>
      <div css={customButtonStyle()}>
        <CustomButton
          onClick={() => {
            if (!isAuthenticated) {
              navigate('/auth/login')
            } else {
              navigate('/payment/deposit')
            }
          }}
          label={t('common.topUp', 'Top Up')}
          color="#000000"
          variant="CTA"
          style={{
            background: '#6EF51A',
            border: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5CE51A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#6EF51A'
          }}
          className="absolute top-1/2 -translate-y-1/2 w-fit text-v2-app-medium-14 h-[40px] cursor-pointer right-[56px] rounded-[10px]!"
        />
      </div>
    </div>
  )
}

const customButtonStyle = () => {
  return css`
    button {
      background: #6ef51a !important;
      border: 1px #c3a2f1 !important;

      &:hover {
        background: #5dd015 !important;
      }

      .label {
        color: var(--YourLoot-Brand-Darkest, #0b0a11) !important;
        leading-trim: both;
        text-edge: cap;
        font-family: Inter !important;
        font-size: 14px !important;
        font-style: normal !important;
        font-weight: 600 !important;
        line-height: 20px !important;
      }
    }
  `
}
export default CryptoDepositNow
