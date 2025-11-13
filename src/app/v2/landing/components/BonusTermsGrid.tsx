// import React from 'react'
import BonusTermItem from './BonusTermItem'
import CheckCircleIcon from '@/assets/images/landing/Check circle.svg'
import TimeCircleIcon from '@/assets/images/landing/Time Circle.svg'
import Gift1Icon from '@/assets/images/landing/gift1.svg'

export default function BonusTermsGrid() {
  return (
    <div className="self-stretch flex flex-col justify-start items-start gap-2 md:grid md:grid-cols-2 md:gap-4">
      <BonusTermItem
        icon={<img src={CheckCircleIcon} alt="check" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.minimumDeposit.title"
        descriptionKey="bonusLanding.terms.minimumDeposit.description"
      />
      <BonusTermItem
        icon={<img src={TimeCircleIcon} alt="time" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.wageringRequirement.title"
        descriptionKey="bonusLanding.terms.wageringRequirement.description"
      />
      <BonusTermItem
        icon={<img src={CheckCircleIcon} alt="check" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.availability.title"
        descriptionKey="bonusLanding.terms.availability.description"
      />
      <BonusTermItem
        icon={<img src={TimeCircleIcon} alt="time" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.activation.title"
        descriptionKey="bonusLanding.terms.activation.description"
      />
      <BonusTermItem
        icon={<img src={CheckCircleIcon} alt="check" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.maximumBonus.title"
        descriptionKey="bonusLanding.terms.maximumBonus.description"
      />
      <BonusTermItem
        icon={<img src={Gift1Icon} alt="gift" className="w-6 h-6" />}
        titleKey="bonusLanding.terms.wageringPeriod.title"
        descriptionKey="bonusLanding.terms.wageringPeriod.description"
      />
    </div>
  )
}