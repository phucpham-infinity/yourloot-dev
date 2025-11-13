// import React from 'react'
import { useAuthStore } from '@/store/slices/auth'
import { useNavigate } from 'react-router-dom'
import BonusBadgeRow from './components/BonusBadgeRow'
import BonusHeader from './components/BonusHeader'
import BonusImage from './components/BonusImage'
import BonusTerms from './components/BonusTerms'
import GetBonusButton from './components/GetBonusButton'
import SignUpButton from './components/SignUpButton'

export default function BonusLanding() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const handleBack = () => {
    window.history.back()
  }

  const handleSignUp = () => {
    if (isAuthenticated) {
      // Navigate to Welcome Bonus promotion page
      navigate('/promotion')
    } else {
      // Show sign up dialog for desktop, redirect to register for mobile
      navigate('/auth/register')
    }
  }

  const handleGetBonus = () => {
    if (isAuthenticated) {
      // Navigate to Welcome Bonus promotion page
      navigate('/promotion')
    } else {
      // Show sign up dialog for desktop, redirect to register for mobile
      navigate('/auth/register')
    }
  }

  return (
    <div className="min-h-screen bg-[#040305] text-white">
      <BonusHeader onBack={handleBack} />
      <BonusImage />

      {/* Body Section */}
      <div className="max-w-[886px] flex flex-col items-center pb-8 space-y-8 justify-center mx-auto">
        <SignUpButton
          onClick={handleSignUp}
          isAuthenticated={isAuthenticated}
        />
        <BonusBadgeRow />
        <BonusTerms />
        <GetBonusButton
          onClick={handleGetBonus}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  )
}
