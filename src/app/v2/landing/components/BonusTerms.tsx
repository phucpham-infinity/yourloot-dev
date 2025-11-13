// import React from 'react'
import BonusTermsTitle from './BonusTermsTitle'
import BonusTermsGrid from './BonusTermsGrid'

export default function BonusTerms() {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-center gap-6">
      <BonusTermsTitle />
      <BonusTermsGrid />
    </div>
  )
}