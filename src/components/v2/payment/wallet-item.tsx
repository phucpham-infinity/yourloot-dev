import CheckboxIcon from '@/assets/icons/checkbox'
import CustomButton from '@/components/common/custom-button'
import { cryptoCurrencyNetwork, FiatCurrencySymbolWallet } from '@/constants'
import { useScreen } from '@/hooks'
import formatAmount from '@/utils/format-amount'
import { css } from '@emotion/react'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface WalletItemProps {
  amount: string | number
  currency: string
  network?: string
  isPrimary?: boolean
  className?: string
  onSetPrimary?: () => void
}

const WalletItem = ({
  amount,
  currency,
  isPrimary = false,
  className = '',
  network,
  onSetPrimary
}: WalletItemProps) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const { isMobile } = useScreen()

  let symbol = cryptoCurrencyNetwork.find((item) => item.currency === currency)
    ?.icon as any

  if (!symbol) {
    symbol =
      FiatCurrencySymbolWallet[
        currency as keyof typeof FiatCurrencySymbolWallet
      ]
  }

  return (
    <div
      css={walletItemStyles}
      className={`w-full relative wallet-item p-4 bg-gray-900 rounded-[10px] inline-flex justify-between items-center overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isMobile && isHovered && (
        <div className="absolute inset-0 bg-app-background/60 backdrop-blur-sm rounded-[10px] z-[0]" />
      )}
      {!isPrimary && !isMobile && isHovered && (
        <motion.div
          key="button-center"
          className="absolute inset-0 flex items-center justify-center z-[2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <CustomButton
            labelStyle={{ fontSize: '12px', lineHeight: '12px' }}
            className="w-fit !py-3"
            variant="muted"
            label={t('wallet.item.makePrimary', 'Make Primary')}
            onClick={onSetPrimary}
          />
        </motion.div>
      )}
      <div
        className={clsx(
          'inline-flex items-center justify-center gap-4 md:flex-col md:justify-start md:items-start relative z-[1]',
          !isMobile && isHovered && 'filter blur-sm'
        )}
      >
        <div className="w-4 h-4 flex items-center justify-center overflow-hidden [&>svg]:w-4 [&>svg]:h-4 [&>img]:w-4 [&>img]:h-4">
          {symbol}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-app-medium-14 md:hidden">
            {formatAmount(amount as number)}
          </div>
          <div className="justify-center text-sm font-medium leading-tight text-white">
            {currency}
            {network && <span> ({network})</span>}
          </div>
        </div>
      </div>
      <div className="relative z-[1]">
        <AnimatePresence mode="wait">
          {isPrimary ? (
            <motion.div
              key="primary-state"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                duration: 0.4
              }}
              className="flex items-center gap-2 pr-1 min-h-[40px]"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <CheckboxIcon className="w-3 h-3" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  delay: 0.2
                }}
                className="text-app-medium-12"
              >
                {t('wallet.item.primary', 'Primary')}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              className="min-h-[40px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
      {isMobile && !isPrimary && (
        <div className="flex items-center justify-end relative z-[1] min-h-[40px]">
          <CustomButton
            labelStyle={{ fontSize: '12px', lineHeight: '12px' }}
            className="w-fit !py-3"
            variant="muted"
            label={t('wallet.item.makePrimary', 'Make Primary')}
            onClick={onSetPrimary}
          />
        </div>
      )}
    </div>
  )
}

export default WalletItem

const walletItemStyles = css`
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(25, 21, 36, 1) 0%,
    rgba(25, 21, 36, 1) 100%
  );
`
