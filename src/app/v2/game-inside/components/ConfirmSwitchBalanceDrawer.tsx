import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScreen } from '@/hooks'
import { CustomDrawer } from '@/components/common/dw-drawer'
import CustomButton from '@/components/common/custom-button'
import RectangleSvg from '@/assets/images/warning-icon.svg'

interface ConfirmSwitchBalanceDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirmSwitch: () => Promise<void>
  onCancelSwitch: () => void
}

const ConfirmSwitchBalanceDrawer: React.FC<ConfirmSwitchBalanceDrawerProps> = ({
  isOpen,
  onClose,
  onConfirmSwitch,
  onCancelSwitch
}) => {
  const { t } = useTranslation()
  const { isMobile } = useScreen()

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('gameInside.warning', 'Warning')}
          </div>
        </div>
      }
      onOpenChange={onClose}
      open={isOpen}
      hideHeader
      contentClassName={isMobile ? 'h-[80dvh]' : 'z-[9999]'}
      contentClassNameDialog="!z-[9999]"
      mode={!isMobile ? 'dialog' : 'drawer'}
    >
      <div className="flex flex-col items-center gap-4">
        <img src={RectangleSvg} className="w-20 h-20" />
        <div className="text-app-medium-14 text-white">
          {t('gameInside.areYouSure', 'Are you sure?')}
        </div>
        <div className="text-app-medium-12 text-center text-[#9E90CF]">
          {t(
            'gameInside.switchingWalletsWarning',
            'Switching wallets can cancel active bonuses. Make sure to use any bonuses before changing.'
          )}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('gameInside.cancelSwitch', 'Cancel switch')}
            variant={'muted-danger'}
            className="w-[50%]"
            onClick={onCancelSwitch}
          />
          <CustomButton
            label={t('gameInside.switch', 'Switch')}
            variant="muted"
            className="w-[50%]"
            onClick={onConfirmSwitch}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default ConfirmSwitchBalanceDrawer
