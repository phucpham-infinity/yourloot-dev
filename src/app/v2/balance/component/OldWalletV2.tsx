import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import { css } from '@emotion/react'
import WalletHeader from './WalletHeader'
// import CreateWalletButton from './CreateWalletButton'
import ConfirmSwitchBalanceDrawer from '@/app/v2/game-inside/components/ConfirmSwitchBalanceDrawer'
import WalletSpinnerDialog from '@/components/v2/payment/WalletSpinnerDialog'
import { promotionsController } from '@/services/controller/promotions'
import { useAuthStore } from '@/store'
import { useWalletOperations } from '../hooks/useWalletOperations.ts'
import {
  createDisplayWallets,
  DisplayWallet,
  generateCompleteWalletList,
  WalletItem
} from './utils/walletUtils'
import WalletList from './WalletList'

interface PropsData {
  mainWallet: any
  oldWallets: WalletItem[]
  isLoading: boolean
  isHome?: boolean
}

export default function OldWalletV2(props: PropsData) {
  const { oldWallets = [], isLoading = false, isHome = false } = props
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  const [showAll, setShowAll] = useState(false)
  // const [showAllMobile, setShowAllMobile] = useState(false)
  const [page, setPgae] = useState(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
  const [pendingWalletSwitch, setPendingWalletSwitch] = useState<{
    walletId: string
    currency: string
  } | null>(null)

  const { useGetActivePromotions } = promotionsController()
  const { data: activePromotionsData } = useGetActivePromotions('', 0, 20, {
    enabled: !!userId,
    refetchOnMount: 'always',
    staleTime: 0
  })

  // Generate complete wallet list with placeholders
  const allAvailableWallets = useMemo(
    () => generateCompleteWalletList(oldWallets),
    [oldWallets]
  )

  // Create display wallets with "See More" functionality (10 wallets max)
  const displayWallets: DisplayWallet[] = useMemo(
    () => createDisplayWallets(allAvailableWallets, showAll, 11),
    [allAvailableWallets, showAll]
  )

  // Create mobile display wallets with "Show More" functionality (10 wallets max)
  const displayWalletsMobile: DisplayWallet[] = useMemo(
    () => createDisplayWallets(allAvailableWallets, false, 10, page),
    [allAvailableWallets, page]
  )

  // Check if there are active promotions
  const hasActivePromotions = useMemo(() => {
    // @ts-ignore
    return activePromotionsData?.content?.length > 0
  }, [activePromotionsData])

  // Initialize wallet operations hook
  const { spinnerDialog, handleSetPrimary } = useWalletOperations({
    allAvailableWallets
  })

  // New function to handle wallet switching with promotion check
  const handleWalletSwitchWithPromotionCheck = (
    walletId: string,
    currency: string
  ) => {
    if (hasActivePromotions) {
      // Store the pending wallet switch data
      setPendingWalletSwitch({ walletId, currency })
      // Show confirmation dialog
      setShowConfirmDialog(true)
    } else {
      // No active promotions, switch immediately
      handleSetPrimary(walletId, currency)
    }
  }

  // Handle confirmed wallet switch
  const handleConfirmWalletSwitch = async () => {
    if (pendingWalletSwitch) {
      handleSetPrimary(
        pendingWalletSwitch.walletId,
        pendingWalletSwitch.currency
      )
    }
    setShowConfirmDialog(false)
    setPendingWalletSwitch(null)
  }

  // Handle cancelled wallet switch
  const handleCancelWalletSwitch = () => {
    setShowConfirmDialog(false)
    setPendingWalletSwitch(null)
  }
  return (
    <div className="relative w-full">
      <WalletSpinnerDialog
        isOpen={spinnerDialog.isOpen}
        message={spinnerDialog.message}
      />
      {/* Mobile/simple header */}
      <WalletHeader isHome={isHome} className="md:hidden" />

      {/* Desktop: single merged block with title "Available Wallets" */}
      <div className="hidden md:block w-full rounded-[10px] p-4 md:bg-transparent md:outline md:outline-offset-[-1px] md:outline-[#322a3e]">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white text-v2-app-medium-16">
            {t('balance.oldWallets.title', 'Available Wallets')}
          </div>
        </div>
        {/* Content inside the desktop block */}
        <div className="flex flex-col w-full gap-2">
          {/*<CreateWalletButton isHome={isHome} className="w-full" />*/}

          <WalletList
            wallets={displayWallets}
            isLoading={isLoading}
            onSetPrimary={handleWalletSwitchWithPromotionCheck}
            onSeeMore={() => setShowAll(true)}
          />
        </div>
      </div>

      {/* Mobile/tablet: original simple layout (no desktop merging) */}
      <div className="relative w-full md:hidden">
        <div className="flex flex-col w-full gap-2">
          {/*<CreateWalletButton isHome={isHome} />*/}
          <WalletList
            wallets={displayWalletsMobile}
            isLoading={isLoading}
            onSetPrimary={handleWalletSwitchWithPromotionCheck}
            onSeeMore={() => setPgae(page + 1)}
          />
        </div>
      </div>

      <ConfirmSwitchBalanceDrawer
        isOpen={showConfirmDialog}
        onClose={handleCancelWalletSwitch}
        onConfirmSwitch={handleConfirmWalletSwitch}
        onCancelSwitch={handleCancelWalletSwitch}
      />
    </div>
  )
}

// const seeMoreButtonStyles = css`
//   border-radius: 10px;
//   background: linear-gradient(
//     180deg,
//     rgba(25, 21, 36, 1) 0%,
//     rgba(25, 21, 36, 1) 100%
//   );
//   box-shadow: 6px 6px 16px 0 rgba(22, 28, 22, 0.25);
// `
