import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { css } from '@/lib/utils'
import { useWalletStore } from '@/store'
import CustomButton from '@/components/common/custom-button'
import { useNavigate } from 'react-router-dom'
import PlusIcon from '@/assets/icons/plus'
import ArrowDown from '@/assets/icons/arrowDown'
import { useChangeMainWalletDialog } from '../../../hooks'
import { useToast } from '@/hooks/use-toast'

export const WalletSelect = () => {
  const [open, setOpen] = useState(false)
  const toast = useToast()
  const wallets = useWalletStore((s) => s.wallets)
    ?.filter((w) => !w.isBonus)
    ?.filter((w) => w.currency !== 'BBK')
  const navigate = useNavigate()
  const filteredWallets = wallets
  const handleCreateWallet = () => {
    navigate('/wallets/create')
  }

  const { showConfirmationDialog } = useChangeMainWalletDialog({
    zIndex: 99999,
    onSuccess: () => {
      toast.success('Wallet changed successfully')
    }
  })

  const defaultWallet = wallets.find((wallet) => wallet.isDefault)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <CustomButton
          suffixIcon={<ArrowDown />}
          variant="muted"
          label={
            defaultWallet?.network
              ? `Primary Wallet: ${defaultWallet?.currency} (${defaultWallet?.network})`
              : `Primary Wallet: ${defaultWallet?.currency}`
          }
          className="text-sm text-left text-gray-400 w-[256px]"
        />
      </PopoverTrigger>
      <PopoverContent
        align={'end'}
        sideOffset={10}
        className="bg-transparent w-[256px] border-0 shadow-none p-0 overflow-y-hidden"
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
                  onClick={() => {
                    showConfirmationDialog({
                      id: wallet.id,
                      currency: wallet.currency
                    })
                  }}
                  label={
                    wallet.network
                      ? `${wallet.currency} ${wallet.network}`
                      : wallet.currency
                  }
                  className="text-left"
                  variant={
                    defaultWallet?.currency === wallet.currency
                      ? 'muted'
                      : 'invisible'
                  }
                />
              ))}
          </div>
          <CustomButton
            onClick={handleCreateWallet}
            className="text-left"
            label={'Create new wallet'}
            prefixIcon={<PlusIcon />}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const styled = css`
  width: 256px;
  border-radius: 20px;
  border: 1px solid #534577;
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
