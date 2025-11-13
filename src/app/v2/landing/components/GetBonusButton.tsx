// import React from 'react'
import CustomButton from '@/components/common/custom-button'
import GiftIcon from "@/assets/images/landing/gift.svg";
import { useTranslation } from 'react-i18next'

interface GetBonusButtonProps {
  onClick: () => void
  isAuthenticated?: boolean
}

export default function GetBonusButton({ onClick, isAuthenticated = false }: GetBonusButtonProps) {
    const { t, i18n } = useTranslation()
    const isRu = i18n.language?.toLowerCase().startsWith('ru')
    const tEn = i18n.getFixedT('en')
    
    return (
        <div className="w-full inline-flex flex-col justify-start items-center gap-4">
            <CustomButton
                onClick={onClick}
                label={isAuthenticated 
                    ? (isRu ? t('bonusLanding.buttons.getBonusNow') : tEn('bonusLanding.buttons.getBonusNow'))
                    : (isRu ? t('bonusLanding.buttons.signUpToClaim') : tEn('bonusLanding.buttons.signUpToClaim'))
                }
                prefixIcon={<img src={GiftIcon} alt="gift" className="w-5 h-5" />}
                className="w-fit !px-[32px] !py-[16px] bg-[#5940a2] !text-[14px] font-medium font-['Inter'] leading-tight transition-all duration-200 transform hover:scale-105"
                variant="default"
            />
            <div className="self-stretch text-center justify-start text-slate-300 text-sm font-medium font-['Inter'] leading-tight">
                {isAuthenticated 
                    ? (isRu ? t('bonusLanding.descriptions.activateBonusGetBonus') : tEn('bonusLanding.descriptions.activateBonusGetBonus'))
                    : (isRu ? t('bonusLanding.descriptions.signUpForBonus') : tEn('bonusLanding.descriptions.signUpForBonus'))
                }
            </div>
        </div>
    )
}