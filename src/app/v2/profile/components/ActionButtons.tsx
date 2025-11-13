import DepositIcon from '@/assets/icons/v2/deposit'
import WithdrawIcon from '@/assets/icons/v2/withdraw'
import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { radialGradientBg } from './styles'

export const ActionButtons = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="flex gap-2 mb-4">
      <div
        onClick={() => {
          navigate('/payment/deposit')
        }}
        css={actionButtonStyles}
        className="flex items-center w-full gap-1 p-3 pl-2 h-11 border-app-default"
      >
        <DepositIcon className=" translate-y-[2px]" />
        <span className="text-white text-[14px] font-medium">
          {t('deposit.title')}
        </span>
      </div>

      <div
        css={actionButtonStyles}
        onClick={() => {
          navigate('/payment/withdraw')
        }}
        className="flex items-center w-full gap-1 p-3 pl-2 h-11 border-app-default"
      >
        <WithdrawIcon className=" translate-y-[2px]" />
        <span className="text-white text-[14px] font-medium">
          {t('withdraw.title')}
        </span>
      </div>
    </div>
  )
}

const actionButtonStyles = css`
  border-radius: 10px;
  ${radialGradientBg};
`
