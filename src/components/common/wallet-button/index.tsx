import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import IconButton from '@/components/common/icon-button'
import WalletIcon from '@/assets/icons/wallet.tsx'
import { css } from '@/lib/utils'
import { Separator } from '@/components/ui/separator.tsx'
import CustomButton from '@/components/common/custom-button'
import { useWalletStore } from '@/store'
import { useDepositStore, WalletCurrency } from '@/store/slices/deposit'
import { useNavigate } from 'react-router-dom'

interface InputProperty {
  disabled?: boolean
  onChange?: (currency: WalletCurrency) => void
  showWallets?: WalletCurrency[]
}

export function WalletButton({
  disabled = false,
  onChange,
  showWallets = []
}: InputProperty) {
  const [open, setOpen] = useState(false)
  const { wallets } = useWalletStore()
  const setCurrency = useDepositStore((state) => state.setCurrency)
  const navigate = useNavigate()

  const handleWalletSelect = (currency: WalletCurrency) => {
    setOpen(false)
    setCurrency(currency)
    onChange?.(currency)
  }

  const handleCreateWallet = () => {
    setOpen(false)
    navigate(`/new-wallet?close-back=${location.pathname}`)
  }

  const filteredWallets =
    showWallets.length > 0
      ? wallets.filter((wallet) =>
          showWallets.includes(wallet.currency as WalletCurrency)
        )
      : wallets

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconButton
          onClick={() => setOpen(!open)}
          icon={<WalletIcon />}
          disabled={disabled}
        />
      </PopoverTrigger>
      <PopoverContent
        align={'end'}
        sideOffset={10}
        className="bg-transparent border-0 shadow-none p-0 overflow-y-hidden"
      >
        <div
          css={styled}
          className="flex flex-col max-h-[400px] items-start gap-2.5 p-2.5 relative bg-white border border-solid border-transparent"
        >
          <div className="w-full h-full flex flex-col gap-2.5 overflow-y-auto">
            {wallets.length > 0 &&
              filteredWallets.map((wallet) => (
                <CustomButton
                  key={wallet.currency}
                  onClick={() =>
                    handleWalletSelect(wallet.currency as WalletCurrency)
                  }
                  label={`Switch to ${wallet.currency} Wallet`}
                  variant={'invisible'}
                />
              ))}
          </div>
          <Separator className="bg-[#4b3f69]" />
          <CustomButton
            onClick={handleCreateWallet}
            label={'Create new wallet'}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const styled = css`
  border-radius: 20px;
  border: 1px solid #534577;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
