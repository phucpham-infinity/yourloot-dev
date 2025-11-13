// import React from 'react'
import CustomButton from '@/components/common/custom-button'
import GiftIcon from '@/assets/images/landing/gift.svg'
import { useTranslation } from 'react-i18next'

interface SignUpButtonProps {
  onClick: () => void
  isAuthenticated?: boolean
}

export default function SignUpButton({ onClick, isAuthenticated = false }: SignUpButtonProps) {
    const { t, i18n } = useTranslation()
    const isRu = i18n.language?.toLowerCase().startsWith('ru')
    const tEn = i18n.getFixedT('en')
    
    return (
        <div className="w-full inline-flex flex-col justify-start items-center gap-4">
            <CustomButton
                onClick={onClick}
                label={isAuthenticated 
                    ? (isRu ? t('bonusLanding.buttons.viewPromotion') : tEn('bonusLanding.buttons.viewPromotion'))
                    : (isRu ? t('bonusLanding.buttons.signUpToClaim') : tEn('bonusLanding.buttons.signUpToClaim'))
                }
                prefixIcon={<img src={GiftIcon} alt="gift" className="w-5 h-5" />}
                className="w-fit !px-[32px] !py-[16px] bg-[#5940a2] !text-[14px] font-medium font-['Inter'] leading-tight transition-all duration-200 transform hover:scale-105"
                variant="default"
            />
            <div className="w-full self-stretch text-center justify-start text-slate-300 text-sm font-medium font-['Inter'] leading-tight">
                {isAuthenticated 
                    ? (isRu ? t('bonusLanding.descriptions.viewPromotionDesc') : tEn('bonusLanding.descriptions.viewPromotionDesc'))
                    : (isRu ? t('bonusLanding.descriptions.activateBonusDeposit') : tEn('bonusLanding.descriptions.activateBonusDeposit'))
                }
            </div>
        </div>
    )
}