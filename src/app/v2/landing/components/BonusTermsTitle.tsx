// import React from 'react'
import { useTranslation } from 'react-i18next'

export default function BonusTermsTitle() {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language?.toLowerCase().startsWith('ru')
  const tEn = i18n.getFixedT('en')
  
  return (
    <div className="self-stretch text-center justify-center text-white text-2xl font-black font-['Inter'] leading-loose">
      {isRu ? t('bonusLanding.terms.title') : tEn('bonusLanding.terms.title')}
    </div>
  )
}