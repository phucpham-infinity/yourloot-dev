import Loader from '@/components/common/loader'
import WalletItem from '@/components/v2/payment/wallet-item'
// import { sortBy } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import SeeMore from '@/assets/images/see_more.png'

interface WalletListProps {
  wallets: any[]
  isLoading: boolean
  onSetPrimary: (walletId: string, currency: string) => void
  onSeeMore?: () => void
  className?: string
}

export default function WalletList({
  wallets,
  isLoading,
  onSetPrimary,
  onSeeMore,
  className = ''
}: WalletListProps) {
  const { t } = useTranslation()

  return (
    <div
      className={`flex w-full md:grid md:grid-cols-3 flex-col gap-2 md:max-h-[70vh] text-white overflow-y-auto scrollbar-hide ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : wallets.length > 0 ? (
        wallets
          .filter((w) => !w.isSeeMoreButton)
          .concat(wallets.filter((w) => w.isSeeMoreButton))
          .map((wallet, index) => {
            if (wallet.isSeeMoreButton) {
              return (
                <button
                  key={wallet.id}
                  onClick={onSeeMore}
                  css={seeMoreButtonStyles}
                  className="w-full p-4 bg-gray-900 rounded-[10px] grid grid-cols-2 justify-center items-center overflow-hidden text-white text-sm font-medium hover:opacity-80 transition-opacity"
                >
                  <div className="flex-col gap-4 flex items-start justify-start">
                    <span>{t('balance.seeMore', 'See more')}</span>
                    <span className="justify-center text-[#9E90CF] text-xs font-medium font-['Inter'] leading-none">
                      +{wallet.remainingCount} currency
                    </span>
                  </div>
                  <div className="inline-flex items-end justify-end">
                    <img src={SeeMore} alt="See more" width={50} height={50} />
                  </div>
                </button>
              )
            }

            // Check if this wallet should have slide down animation (wallets after index 11)
            const shouldAnimate = index > 11

            if (shouldAnimate) {
              return (
                <motion.div
                  key={wallet.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (index - 12) * 0.05,
                    ease: 'easeOut'
                  }}
                >
                  <WalletItem
                    amount={wallet.amount || 0}
                    currency={wallet.currency}
                    network={wallet.network}
                    isPrimary={wallet.isDefault}
                    onSetPrimary={() => {
                      onSetPrimary(wallet.id, wallet.currency)
                    }}
                  />
                </motion.div>
              )
            }

            return (
              <WalletItem
                key={wallet.id}
                amount={wallet.amount || 0}
                currency={wallet.currency}
                network={
                  !wallet.id.includes('placeholder') ? '' : wallet.network
                }
                isPrimary={wallet.isDefault}
                onSetPrimary={() => {
                  onSetPrimary(wallet.id, wallet.currency)
                }}
              />
            )
          })
      ) : (
        <div className="text-center text-white">
          {t('balance.oldWallets.noWallets', 'No wallets found')}
        </div>
      )}
    </div>
  )
}

const seeMoreButtonStyles = css`
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(25, 21, 36, 1) 0%,
    rgba(25, 21, 36, 1) 100%
  );
  box-shadow: 6px 6px 16px 0 rgba(22, 28, 22, 0.25);
`
