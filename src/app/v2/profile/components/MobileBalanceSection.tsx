import ManageFundIcon from '@/assets/icons/v2/ManageFund'
import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BalanceCard } from './BalanceCard'

interface Wallet {
  isDefault?: boolean
  isBonus?: boolean
  currency?: string
  amount?: number
}

interface MobileBalanceSectionProps {
  wallets: Wallet[]
}

const MobileBalanceSection = ({ wallets }: MobileBalanceSectionProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const primaryWallet = wallets.find((x) => x.isDefault)
  const bonusWallet = wallets.find((item) => item?.isBonus)
  const lootAmount =
    wallets.find((item) => item?.currency === 'BBK')?.amount ?? 0

  return (
    <>
      {/* Balance Cards */}
      <div className="mb-2 space-y-3">
        <BalanceCard
          className="bg-gradient-to-b from-[#0f0c13] to-[#050305] outline outline-offset-[-1px] outline-[#322a3e] !inline-flex w-full gap-3"
          icon="primary"
          amount={`${formatAmount(primaryWallet?.amount ?? 0)} ${primaryWallet?.currency ?? ''}`}
          label={t('profile.primary')}
          currency={primaryWallet?.currency}
        />
        <div className="flex gap-2">
          <BalanceCard
            className="w-1/2 bg-gradient-to-b from-[#0f0c13] to-[#050305] outline outline-offset-[-1px] outline-[#322a3e]"
            icon="bonus"
            amount={`${formatAmount(bonusWallet?.amount ?? 0)} ${bonusWallet?.currency ?? ''}`}
            label={t('profile.bonus')}
          />
          <BalanceCard
            className="w-1/2 bg-gradient-to-b from-[#0f0c13] to-[#050305] outline outline-offset-[-1px] outline-[#322a3e]"
            icon="loot"
            amount={`${formatAmount(lootAmount)}`}
            label={t('profile.yourLootCoin')}
          />
        </div>
      </div>

      {/* Manage Funds Button */}
      <div
        className="flex items-center justify-center gap-2 py-3 pb-6"
        onClick={() => navigate('/manage-funds')}
      >
        <ManageFundIcon width="12px" height="12px" />
        <span className="text-[#9E90CF] text-xs font-medium">
          {t('profile.manage', 'Manage')}
        </span>
      </div>
    </>
  )
}

export default MobileBalanceSection
