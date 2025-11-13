import CustomButton from '@/components/common/custom-button'
import historyIcon from '@/assets/icons/history.svg'
import StatusSuccess from '@/assets/icons/status-success'
import IconBtn from '@/components/common/icon-button'
import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import { css } from '@emotion/react'

interface WalletCardProps {
  wallet: {
    amount: number
    currency: string
    sign: string
    id: string
  }
  walletType: 'primary' | 'bonus'
  icon: ReactNode
  isActive: boolean
  showHistoryButton?: boolean
  onActivate?: () => void
  onHistoryClick?: () => void
  isMobile?: boolean
}

export default function WalletCard({
  wallet,
  walletType,
  icon,
  isActive,
  showHistoryButton = false,
  onActivate,
  onHistoryClick,
  isMobile = false
}: WalletCardProps) {
  const { t } = useTranslation()

  const walletLabel =
    walletType === 'primary'
      ? t('balance.primary', 'Primary')
      : t('balance.bonus', 'Bonus')

  if (isMobile) {
    return (
      <div className="inline-flex md:hidden items-center justify-between w-full py-2.5 px-3">
        <div className="inline-flex items-center justify-center gap-2">
          <div data-svg-wrapper className="relative">
            {icon}
          </div>
          <div className="flex flex-col justify-start">
            <div className="text-[#FFFFFF] text-v2-app-medium-14 font-['Satoshi']">
              {formatAmount(wallet.amount)} {wallet.currency}
            </div>
            <div className="text-[#C5C0D8] text-v2-app-medium-12 font-['Satoshi']">
              {walletLabel}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-column">
          {isActive && <IconBtn icon={<StatusSuccess />} />}
          {!isActive && onActivate && walletType === 'bonus' && (
            <CustomButton
              label={t('balance.activeBalance', 'Activate')}
              onClick={onActivate}
              labelStyle={{
                fontSize: '14px',
                lineHeight: '14px',
                color: '#9d90cf'
              }}
              className="inline-flex items-center justify-start gap-1 text-xs font-medium text-center w-fit !py-3"
              variant="muted"
            />
          )}
          {showHistoryButton && onHistoryClick && (
            <IconBtn
              icon={<img src={historyIcon} className="w-[12px] h-[12px]" />}
              onClick={onHistoryClick}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div css={styles} className="w-full flex justify-between items-center p-4">
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-center w-4 h-4">{icon}</div>
        <div className="inline-flex flex-col items-start justify-start gap-1">
          <div className="text-white text-v2-app-medium-14 font-['Satoshi']">
            {formatAmount(wallet.amount)} {wallet.currency}
          </div>
          <div className="text-[#C5C0D8] text-v2-app-medium-12 font-['Satoshi']">
            {walletLabel}
          </div>
        </div>
      </div>
      <div className="items-center justify-start hidden gap-2 h-9 md:flex">
        {isActive && walletType === 'bonus' ? (
          <CustomButton
            aria-label="Bonus wallet status"
            className="w-auto px-3 mr-0 !py-3"
            height={36}
            variant="muted"
            labelStyle={{ fontSize: '14px', lineHeight: '14px' }}
            label={<StatusSuccess />}
          />
        ) : !isActive && onActivate ? (
          <CustomButton
            aria-label={t('balance.activeBalance', 'Activate') as string}
            label={t('balance.activeBalance', 'Activate')}
            onClick={onActivate}
            labelStyle={{
              color: '#9d90cf',
              fontSize: '14px',
              lineHeight: '14px'
            }}
            className="!w-auto px-3 !py-3 h-[36px]"
            height={36}
            variant="muted"
            textAlign="center"
          />
        ) : isActive && walletType === 'primary' ? (
          <IconBtn
            aria-label="Primary wallet status"
            className="!w-[36px] h-[36px]! rounded-[10px] min-w-[36px]!"
            height={36}
            icon={<StatusSuccess />}
          />
        ) : null}
        {showHistoryButton && onHistoryClick && (
          <CustomButton
            aria-label={t('profile.history', 'History') as string}
            className="!w-auto !px-3 !py-3"
            height={36}
            variant="muted"
            onClick={onHistoryClick}
            prefixIcon={<img src={historyIcon} className="w-[12px] h-[12px]" />}
            label={t('profile.history', 'History')}
            textAlign="center"
            labelStyle={{ fontSize: '14px', lineHeight: '14px' }}
          />
        )}
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(25, 21, 36, 1) 0%,
    rgba(25, 21, 36, 1) 100%
  );
`
