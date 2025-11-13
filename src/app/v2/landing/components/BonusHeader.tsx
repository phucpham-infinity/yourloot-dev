// import React from 'react'
import ArrowLeft from '@/assets/icons/v2/ArrowLeft'

interface BonusHeaderProps {
  onBack: () => void
}

export default function BonusHeader({ onBack }: BonusHeaderProps) {
  return (
    <div className="pb-[16px] flex flex-col justify-start items-start gap-2.5 overflow-hidden w-full">
      <div
        data-bold="true"
        data-icon="true"
        className="h-4 inline-flex justify-center items-center"
      >
        <ArrowLeft
          width={26}
          height={26}
          className="mt-3"
          onClick={onBack}
          style={{ cursor: 'pointer' }}
        />
        <span
          className="text-white text-base font-black font-['Satoshi'] flex items-center mr-3 cursor-pointer"
          onClick={onBack}
        >
          {'100% Welcome Bonus'}
        </span>
      </div>
    </div>
  )
}
