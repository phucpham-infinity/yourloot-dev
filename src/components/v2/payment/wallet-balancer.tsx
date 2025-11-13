import { useWalletStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { getWalletIcon } from '@/app/v2/new-wallet/common'
import InfiniteDropdown from '@/components/common/custom-dropdown/InfiniteDropdown'
import { useWalletOperations } from '@/app/v2/balance/hooks/useWalletOperations'
import { useMemo } from 'react'
import { generateCompleteWalletList } from '@/app/v2/balance/component/utils/walletUtils'
import WalletSpinnerDialog from '@/components/v2/payment/WalletSpinnerDialog.tsx'
import ArrowDown from '@/assets/icons/arrowDown.tsx'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store.tsx'
import { useScreen } from '@/hooks'

interface WalletBalancerProps {
  className?: string
}

const WalletBalancer = ({ className = '' }: WalletBalancerProps) => {
  const { t } = useTranslation()
  const { setOpenManageFunds } = useHomeStoreV2()
  const { isMobile } = useScreen()
  const wallets = useWalletStore((s) => s.wallets)
    ?.filter((w) => !w.isBonus)
    ?.filter((w) => w.currency !== 'BBK')

  const allAvailableWallets = useMemo(
    () => generateCompleteWalletList(wallets || []),
    [wallets]
  )

  const walletOptions = useMemo(() => {
    const opts = allAvailableWallets.map((w) => {
      let network = w.network ? `(${w.network})` : ''
      if (!w.id.includes('placeholder')) {
        network = ''
      }
      return {
        label: `${w.currency}${network}`,
        value: w.id,
        currency: w.currency,
        network: w.network || ''
      }
    })

    const defCur = wallets.find((x) => x.isDefault)?.currency
    if (!defCur) return opts

    const preferred = opts.filter((o) => o.currency === defCur)
    const others = opts.filter((o) => o.currency !== defCur)
    return [...preferred, ...others]
  }, [allAvailableWallets, wallets])

  const { handleSetPrimary, spinnerDialog } = useWalletOperations({
    allAvailableWallets
  })

  const defaultWalletId = useMemo(() => {
    return wallets.find((x) => x.isDefault)?.id
  }, [wallets])

  return !isMobile ? (
    <div className={`wallet-balancer ${className}`}>
      <InfiniteDropdown
        value={defaultWalletId}
        placeholder={t('wallet.balancer.primaryWallet', 'Primary Wallet')}
        options={walletOptions}
        triggerClassName="w-[153px] h-[40px] !px-3"
        contentClassName="w-[200px] -translate-x-12 !p-3"
        optionRender={(opt) => (
          <div className="flex items-center gap-[10px]">
            {getWalletIcon(String(opt.currency) || '', {
              className: 'w-4 h-4'
            })}
            <div className="text-[14px] text-white font-medium leading-[12px]">
              {typeof opt.label === 'string' ? opt.label : opt.label}
            </div>
          </div>
        )}
        onValueChange={(val) => {
          const opt = walletOptions.find(
            (o) => o.value?.toString() === val?.toString()
          )
          handleSetPrimary(String(opt?.value), opt?.currency || '')
        }}
      />
      <WalletSpinnerDialog
        isOpen={spinnerDialog.isOpen}
        message={spinnerDialog.message}
      />
    </div>
  ) : (
    <div
      onClick={() => {
        setOpenManageFunds(true)
      }}
      className="w-[103px] h-[40px] rounded-[10px] border border-app-default flex items-center justify-end gap-4 px-3 py-1"
    >
      <div className="flex items-center gap-[10px]">
        {getWalletIcon(wallets.find((x) => x.isDefault)?.currency || '', {
          className: 'w-4 h-4'
        })}
        <div className="text-[14px] text-white font-medium leading-[12px]">
          {wallets.find((x) => x.isDefault)?.currency}
        </div>
      </div>

      <ArrowDown className="w-3 h-3 text-[#9E90CF]" />
    </div>
  )
}

export default WalletBalancer
