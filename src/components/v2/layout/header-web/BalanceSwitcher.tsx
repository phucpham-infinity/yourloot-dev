import { useAuthStore, useWalletStore } from '@/store'
import { useTranslation } from 'react-i18next'

import { getWalletIcon } from '@/app/v2/new-wallet/common'
import ArrowDown from '@/assets/icons/arrowDown'
import CloseIcon from '@/assets/icons/close'
import BalanceHeaderV2 from '@/components/common/header-footer/BalanceHeaderV2'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { walletsController } from '@/services/controller'
import formatAmount from '@/utils/format-amount'
import { useMemo, useState } from 'react'

export default function BalanceSwitcher() {
  const { wallets } = useWalletStore()
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  const [openDropdown, setOpenDropdown] = useState(false)

  const { useCheckUserActiveBalanceWallet } = walletsController()
  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const isBonusActiveBalance = useMemo(
    () => userActiveBalanceWallet?.content?.isBonus,
    [userActiveBalanceWallet]
  )

  const accounts = useMemo(
    () => [
      {
        id: 'gold',
        icon: getWalletIcon(
          isBonusActiveBalance
            ? wallets.find((x) => x.isBonus)?.currency || ''
            : wallets.find((x) => x.isDefault)?.currency || '',
          { className: 'w-4 h-4' }
        ),
        total: isBonusActiveBalance
          ? wallets.find((x) => x.isBonus)?.amount
          : wallets.find((x) => x.isDefault)?.amount,
        currency: isBonusActiveBalance
          ? wallets.find((x) => x.isBonus)?.currency
          : wallets.find((x) => x.isDefault)?.currency
      }
    ],
    [isBonusActiveBalance, wallets]
  )
  return (
    <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
      <PopoverTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setOpenDropdown(true)
        }}
      >
        <div className="w-fit h-[40px] cursor-pointer rounded-[10px] border border-app-default flex items-center justify-between gap-2 px-3 py-1">
          <div
            key={accounts[0]?.id}
            className="inline-flex items-center justify-center h-3 gap-2"
          >
            <div>
              {getWalletIcon(accounts[0]?.currency || '', {
                className: 'w-4 h-4'
              })}
            </div>
            <div className="text-center text-[#9d90cf] flex flex-col items-start justify-start">
              {/* <div className="text-xs text-[#9E90CF] font-bold">
                {isBonusActiveBalance
                  ? t('header.bonus', 'Bonus')
                  : t('header.primary', 'Primary')}
              </div> */}

              <div className="text-[14px] text-white font-medium leading-[12px] flex items-center gap-1">
                {formatAmount(accounts[0]?.total || 0)}
                {/* {renderCurrencyIcon(accounts[0]?.currency || '')} */}
              </div>
            </div>

            <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-fit bg-[#0B0A11] z-[9999] p-0 rounded-[10px] border-1 border-[#2d253b] overflow-hidden"
        autoFocus={false}
        side="bottom"
        align="end"
      >
        <div className="relative flex bg-[#0B0A11] h-[48px] border-b border-[#2A2242] flex-row items-center justify-center w-full">
          <div className="text-base font-medium text-white">
            {t('header.balance', 'Balance')}
          </div>
          <CloseIcon
            className="absolute right-[24px] w-3 h-3 cursor-pointer text-[#9E90CF] hover:text-gray-300 transition-colors"
            onClick={() => setOpenDropdown(false)}
          />
        </div>
        <BalanceHeaderV2 onClose={() => setOpenDropdown(false)} />
      </PopoverContent>
    </Popover>
  )
}
