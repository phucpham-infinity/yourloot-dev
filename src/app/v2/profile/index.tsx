import BalanceV2 from '@/app/v2/balance'
import getAchievementDataSource from '@/assets/images/achievement/AchivementDataSource'
import IconSvg from '@/components/common/ui/IconSvg'
import { useProfileStore, useWalletStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Achievements from './components/Achievements'
import { ActionButtons } from './components/ActionButtons'
import DesktopAchievementsTab from './components/DesktopAchievementsTab'
import DesktopOverviewTab from './components/DesktopOverviewTab'
import DesktopTitle from './components/DesktopTitle'
import { LevelProgress } from './components/LevelProgress'
import MobileBalanceSection from './components/MobileBalanceSection'
import ProfileTabs from './components/ProfileTabs'
import Setting from './components/Setting'

const TABS = ['Overview', 'Wallets', 'Achievements'] as const

type Tab = (typeof TABS)[number]

const ProfilePageV2 = () => {
  const { t } = useTranslation()
  const { wallets } = useWalletStore()
  const { achievements } = useProfileStore()
  const [searchParams] = useSearchParams()
  const isAutoScroll = searchParams.get('isAutoScroll') || ''
  const tabParam = searchParams.get('tab') || ''

  // desktop tabs state
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isAutoScroll !== '1') return
    requestAnimationFrame(() => {
      scrollToBottom()
    })
  }, [isAutoScroll])

  useEffect(() => {
    if (tabParam && TABS.includes(tabParam as Tab)) {
      setActiveTab(tabParam as Tab)
    }
  }, [tabParam])

  return (
    <div className="w-full h-full py-2">
      {/* Desktop title */}
      <DesktopTitle />
      {/* Mobile layout (unchanged) */}
      <div className="max-w-md mx-auto md:hidden">
        {/* User Profile Section */}
        <Setting />

        {/* Action Buttons */}
        <ActionButtons />

        {/* Balance Section */}
        <MobileBalanceSection wallets={wallets} />

        {/* Level Progress */}
        <LevelProgress />

        {/* Achievements */}
        <Achievements
          ref={messagesEndRef}
          achievements={achievements ?? []}
          t={t}
          getAchievementDataSource={getAchievementDataSource}
          IconSvg={IconSvg}
        />
      </div>

      {/* Tablet layout */}
      <div className="hidden md:block lg:hidden w-full max-w-[744px] mx-auto px-4 py-4">
        {/* User Profile Section - Tablet horizontal layout */}
          <Setting />

        {/* Desktop Tabs for tablet */}
        <ProfileTabs
          tabs={TABS}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab as Tab)}
          className="md:pb-[16px]"
        />

        {/* Overview Tab: Balance + Level for tablet */}
        {activeTab === 'Overview' && (
          <DesktopOverviewTab 
            wallets={wallets}
            onManageClick={() => setActiveTab('Wallets')}
          />
        )}

        {/* Wallet Tab for tablet */}
        {activeTab === 'Wallets' && (
          <div className="space-y-4">
            <BalanceV2 />
          </div>
        )}

        {/* Achievements Tab for tablet */}
        {activeTab === 'Achievements' && (
          <DesktopAchievementsTab achievements={achievements ?? []} />
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden w-full lg:block">
        <div className="max-w-[1200px] mx-auto px-6 py-4 grid grid-cols-12 gap-6">
          {/* Left column: profile card */}
          <div className="col-span-3">
            <div className="w-full mx-auto inline-flex flex-col justify-start bg-[#191524] items-center gap-6 rounded-[10px] p-4 sticky top-4  overflow-hidden">
              <Setting />
            </div>
          </div>

          {/* Right column: content */}
          <div className="col-span-8 space-y-4">
            {/* Desktop Tabs */}
            <div className="hidden lg:block">
              <ProfileTabs
                tabs={TABS}
                activeTab={activeTab}
                onChange={(tab) => setActiveTab(tab as Tab)}
              />
            </div>

            {/* Overview Tab: Balance + Level */}
            {activeTab === 'Overview' && (
              <DesktopOverviewTab 
                wallets={wallets}
                onManageClick={() => setActiveTab('Wallets')}
              />
            )}

            {/* Wallet Tab */}
            {activeTab === 'Wallets' && (
              <div className="space-y-4">
                <BalanceV2 />
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'Achievements' && (
              <DesktopAchievementsTab achievements={achievements ?? []} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageV2
