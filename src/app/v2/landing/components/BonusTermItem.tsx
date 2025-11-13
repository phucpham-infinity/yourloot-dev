import React from 'react'
import { useTranslation } from 'react-i18next'

interface BonusTermItemProps {
  icon: React.ReactNode
  titleKey: string
  descriptionKey: string
}

export default function BonusTermItem({ icon, titleKey, descriptionKey }: BonusTermItemProps) {
  const { t, i18n } = useTranslation()
  const isRu = i18n.language?.toLowerCase().startsWith('ru')
  const tEn = i18n.getFixedT('en')
  
  return (
    <div className="w-full self-stretch p-6 rounded-2xl outline outline-2 outline-offset-[-2px] outline-[#2b2142] inline-flex justify-start items-center gap-4">
      {icon}
      <div className="flex-1 inline-flex flex-col justify-center items-start gap-4">
        <div className="self-stretch justify-center text-white text-base font-medium font-['Inter'] leading-[16px]">
          {isRu ? t(titleKey) : tEn(titleKey)}
        </div>
        <div className="self-stretch justify-center text-slate-300 text-sm font-medium font-['Inter'] leading-[16px]">
          {isRu ? t(descriptionKey) : tEn(descriptionKey)}
        </div>
      </div>
    </div>
  )
}