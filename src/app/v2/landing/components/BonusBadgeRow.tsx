
// import React from 'react'
import Badge from './Badge'
import Image1 from '@/assets/images/landing/image_1.png'
import Image2 from '@/assets/images/landing/image_2.png'
import Image3 from '@/assets/images/landing/image_3.png'

export default function BonusBadgeRow() {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-start gap-2 md:h-52 md:flex-row md:gap-4">
      <Badge
        titleKey="bonusLanding.badges.doubleDeposit.title"
        descriptionKey="bonusLanding.badges.doubleDeposit.description"
        imageSrc={Image1}
        imageClassName="w-40 h-36 left-[126px] top-[77px] absolute"
      />
      <Badge
        titleKey="bonusLanding.badges.upTo1500.title"
        descriptionKey="bonusLanding.badges.upTo1500.description"
        imageSrc={Image2}
        imageClassName="w-32 h-36 left-[145.66px] top-[73px] absolute"
      />
      <Badge
        titleKey="bonusLanding.badges.easyActivation.title"
        descriptionKey="bonusLanding.badges.easyActivation.description"
        imageSrc={Image3}
        imageClassName="w-28 h-36 left-[169.34px] top-[69px] absolute"
      />
    </div>
  )
}