import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useScreen } from '@/hooks'
import { CustomDrawer } from '@/components/common/dw-drawer'
import CustomButton from '@/components/common/custom-button'
import BonusAlertSvg from '@/assets/images/bonus-alert.svg'

interface BonusWalletErrorDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSwitchBalance: () => void
  hideCloseButton?: boolean
}

const BonusWalletErrorDrawer: React.FC<BonusWalletErrorDrawerProps> = ({
  isOpen,
  onClose,
  onSwitchBalance,
  hideCloseButton = false
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile } = useScreen()

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('gameInside.bonusBalanceAlert', 'Bonus Balance Alert')}
          </div>
        </div>
      }
      onOpenChange={onClose}
      open={isOpen}
      contentClassName={'h-[80dvh]'}
      mode={!isMobile ? 'dialog' : 'drawer'}
      hideCloseButton={hideCloseButton}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={BonusAlertSvg} className="w-20 h-20" />
        <div className="text-app-medium-14 text-white">
          {t(
            'gameInside.activeBonusBalance',
            'You have an active bonus balance'
          )}
        </div>
        <div className="text-app-medium-12 text-center text-[#9E90CF]">
          {t(
            'gameInside.notBonusGame',
            "This game isn't a bonus game. Play bonus games or switch to primary balance to continue."
          )}
        </div>
        <div className="flex flex-col w-full gap-2 pt-4">
          <CustomButton
            label={t('gameInside.playBonusGames', 'Play Bonus Games')}
            variant="default"
            className="w-full"
            onClick={() => {
              onClose()
              navigate('/game-category?category=bonus&title=Bonus')
            }}
          />
          <CustomButton
            label={t('gameInside.switchBalance', 'Switch Balance')}
            variant="muted"
            className="w-full"
            onClick={onSwitchBalance}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default BonusWalletErrorDrawer
