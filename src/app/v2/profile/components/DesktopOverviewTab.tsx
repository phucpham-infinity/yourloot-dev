import SettingIcon from '@/assets/icons/v2/Setting'
import WalletV2Icon from '@/assets/icons/v2/wallet-v2-icon'
import CustomButton from '@/components/common/custom-button'
import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'
import { BalanceCard } from './BalanceCard'
import { LevelProgress } from './LevelProgress'

interface Wallet {
  isDefault?: boolean
  isBonus?: boolean
  currency?: string
  amount?: number
}

interface DesktopOverviewTabProps {
  wallets: Wallet[]
  onManageClick: () => void
}

const DesktopOverviewTab = ({
  wallets,
  onManageClick
}: DesktopOverviewTabProps) => {
  const { t } = useTranslation()

  const primaryWallet = wallets.find((x) => x.isDefault)
  const bonusWallet = wallets.find((item) => item?.isBonus)
  const lootAmount =
    wallets.find((item) => item?.currency === 'BBK')?.amount ?? 0

  return (
    <div className="space-y-4">
      {/* Balance section */}
      <div className="rounded-[10px] gap-4 p-4  bg-transparent outline outline-offset-[-1px] outline-[#322a3e] flex flex-col ">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <WalletV2Icon className="w-4 h-4 text-app-brand-medium" />
            <div className="text-white v2-app-medium-16">
              {t('profile.balance')}
            </div>
          </div>
          <CustomButton
            height={16}
            variant="invisible"
            color="#9E90CF"
            label={t('profile.manage', 'Manage')}
            onClick={onManageClick}
            className="w-auto !py-0 hover:bg-none! hover:opacity-70 !px-[4px] text-v2-app-medium-12"
            labelStyle={{ fontSize: '12px' }}
            prefixIcon={<SettingIcon className="w-3 h-3" />}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <BalanceCard
            icon="primary"
            amount={`${formatAmount(primaryWallet?.amount ?? 0)} ${primaryWallet?.currency ?? ''}`}
            label={t('profile.primary')}
            className="flex-col h-auto !p-4 !gap-2 items-start"
            currency={primaryWallet?.currency}
          />
          <BalanceCard
            icon="bonus"
            amount={`${formatAmount(bonusWallet?.amount ?? 0)} ${bonusWallet?.currency ?? ''}`}
            label={t('profile.bonus')}
            className="flex-col h-auto !p-4 !gap-2 items-start"
          />
          <BalanceCard
            icon="loot"
            amount={`${lootAmount}`}
            label={t('profile.yourLootCoin')}
            className="flex-col h-auto !p-4 !gap-2 items-start"
          />
        </div>
      </div>

      {/* Level Progress */}
      <LevelProgress />
    </div>
  )
}

export default DesktopOverviewTab
