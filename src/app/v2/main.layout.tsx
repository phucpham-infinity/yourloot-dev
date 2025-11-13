import { BasicDialog } from '@/components/common/basic-dialog'
import { CustomDialog } from '@/components/common/custom-dialog'
import FooterV2 from '@/components/common/footer/footerV2'
import HeaderV2 from '@/components/common/header-footer/headerV2'
import DepositCancel from '@/components/v2/payment/deposit-cancel'
import DepositCreateCryptoWallet from '@/components/v2/payment/deposit-create-crypto-wallet'
import DepositDataInfo from '@/components/v2/payment/deposit-data-info'
import DepositInputInfo from '@/components/v2/payment/deposit-input-info'
import DepositProcess from '@/components/v2/payment/deposit-process'
import DepositProcessAlert from '@/components/v2/payment/deposit-process-alert'
import SafeAreaTelegramMiniApp from '@/components/v2/safearea-telegram-miniapp'

import NotificationsV2 from '@/app/v2/notification'
import { BasicDialogV2 } from '@/components/v2/dialog'
import FooterV2Web from '@/components/v2/layout/footer-web'
import HeaderV2Web from '@/components/v2/layout/header-web'
import SidebarV2Web from '@/components/v2/layout/sidebar-web'
import DepositCoinSelect from '@/components/v2/payment/deposit-coin-select'
import DepositFailed from '@/components/v2/payment/deposit-failed'
import DepositProcessFinish from '@/components/v2/payment/deposit-inporcess'
import DepositSelectNetwork from '@/components/v2/payment/deposit-select-network'
import DepositSuccessful from '@/components/v2/payment/deposit-successful'
import DepositTimeOut from '@/components/v2/payment/deposit-time-out'
import WithdrawalCancel from '@/components/v2/payment/withdraw-cancel'
import WithdrawalFailed from '@/components/v2/payment/withdraw-failed'
import WithdrawInputInfo from '@/components/v2/payment/withdraw-input-info'
import WithdrawProcessAlert from '@/components/v2/payment/withdraw-process-alert'
import WithdrawalRequested from '@/components/v2/payment/withdraw-requested'
import WithdrawUnavailable from '@/components/v2/payment/withdraw-unavailable'
import DepositLimitDialog from '@/components/v2/payment/deposit-limit-dialog'

import SessionEndedDrawer from '@/components/common/session-ended-drawer'
import { useScreen } from '@/hooks'
import { cn } from '@/lib/utils'
import {
  levelsController,
  userController,
  walletsController
} from '@/services/controller'
import { achievementsController } from '@/services/controller/achivements'
import { gameController } from '@/services/controller/games'
import { useAuthStore, useProfileStore } from '@/store'
import { useV2LayoutStore } from '@/store/slices/v2/layout.store'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import CreateWalletNetworkV2 from './new-wallet/CreateWalletNetwork'
import CreateWalletSuccessful from './new-wallet/CreateWalletSuccessful'
import SwitchingWalletV2 from './new-wallet/SwitchingWallet'
import SocketHandler from '@/components/v2/socket-hander'
import ScrollToTopButton from '@/components/v2/scroll-to-top-button'
import { useHistoryTracker } from '@/hooks/use-history-tracker'

export default function V2Layout() {
  const location = useLocation()
  const { pathname } = location
  const { userId, setUserIp, sessionNotActive } = useAuthStore()
  const { useGetUserWallets } = walletsController()
  const {
    isOpenNotificationsPanel,
    setIsOpenNotificationsPanel,
    setNotificationsUnread
  } = useV2LayoutStore()

  const { data: ip } = gameController().getMyIp()
  const { setIp, setProfile, setLevelProgress, setAchievements } =
    useProfileStore()
  const { data: userProfile } = userController().useGetUserProfile(userId)

  const { useGetLevelProgress } = levelsController()
  const { data: levelProgress } = useGetLevelProgress(userId!)

  const { useGetAllAchievements } = achievementsController()
  const { data: achievements } = useGetAllAchievements(userId!)

  useGetUserWallets(userId!)
  useHistoryTracker()

  useEffect(() => {
    window.scrollTo(0, 0)
    // also reset scroll for desktop scroll containers
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollTop = 0
    }
    if (desktopInnerScrollRef.current) {
      desktopInnerScrollRef.current.scrollTop = 0
    }
  }, [location.key])

  // notifications: init unread from localStorage and listen for updates
  useEffect(() => {
    try {
      const stored = localStorage.getItem('notifications-unread-count')
      if (stored != null) setNotificationsUnread(Number(stored) || 0)
    } catch {
      console.log('error')
    }
    const handler = (e: any) => {
      const count = typeof e?.detail === 'number' ? e.detail : 0
      setNotificationsUnread(count)
    }
    window.addEventListener('notifications:unread', handler as any)
    return () =>
      window.removeEventListener('notifications:unread', handler as any)
  }, [setNotificationsUnread])

  useEffect(() => {
    if (ip) {
      setIp(ip)
    }
  }, [ip])

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.content)
    }
  }, [userProfile])

  //level progresss
  useEffect(() => {
    if (levelProgress) {
      setLevelProgress(levelProgress?.content || null)
    }
  }, [levelProgress])

  //achievements
  useEffect(() => {
    if (achievements) {
      setAchievements(achievements?.content || [])
    }
  }, [achievements])

  useEffect(() => {
    setUserIp()
  }, [])

  // replaced basic dialog with session-ended drawer

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.content)
    }
  }, [userProfile])

  const { sm, isMobile } = useScreen()
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const desktopInnerScrollRef = useRef<HTMLDivElement>(null)

  return (
    <SocketHandler>
      <SafeAreaTelegramMiniApp className="min-h-screen bg-[#040305] bg-cover bg-center bg-no-repeat overflow-hidden">
        {isMobile ? (
          <>
            <HeaderV2 />
            <DepositProcessAlert />
            <WithdrawProcessAlert />
            <div
              className={clsx(
                'w-full flex flex-row gap-0',
                !isMobile && 'overflow-y-auto'
              )}
            >
              <div
                className={cn(
                  'mx-auto w-full flex flex-col',
                  isMobile ? 'p-4 bg-[#040305]' : 'p-6 bg-zinc-950',
                  pathname.includes('/game-inside') && 'p-0'
                )}
              >
                <Outlet />
              </div>
            </div>
            {isMobile && !pathname.includes('/game-inside') && <FooterV2 />}
          </>
        ) : (
          <>
            <div className="flex flex-row w-full gap-0 overflow-hidden h-[100vh]">
              <SidebarV2Web />
              <div
                className="w-full h-full overflow-y-auto home-page"
                ref={desktopScrollRef}
              >
                <HeaderV2Web />
                <DepositProcessAlert />
                <WithdrawProcessAlert />
                <div
                  className={clsx(
                    'w-full flex flex-row gap-0 mt-[60px] scrollbar-hide'
                  )}
                  ref={desktopInnerScrollRef}
                >
                  <div
                    className={clsx(
                      'mx-auto w-full flex flex-col px-[48px] p-6 bg-[#040305]',
                      pathname.includes('/game-inside') && 'p-0'
                    )}
                  >
                    <Outlet />
                    <FooterV2 className={clsx('hidden', sm && 'block')} />
                    <FooterV2Web />
                  </div>

                  {!isMobile && isOpenNotificationsPanel && (
                    <div className="absolute inset-0 z-50 flex justify-end">
                      <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpenNotificationsPanel(false)}
                      />
                      <div className="relative h-full w-full max-w-[960px]">
                        <div className="absolute right-0 top-0 bottom-0 w-full md:max-w-[904px] bg-[#0b0a11] border-l border-[#453561] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                          <NotificationsV2
                            onClose={() => setIsOpenNotificationsPanel(false)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <CustomDialog />
        <BasicDialog />
        <SessionEndedDrawer open={sessionNotActive} />
        <DepositCoinSelect />
        <DepositInputInfo />
        <DepositDataInfo />
        <DepositCancel />
        <DepositProcess />
        <DepositProcessFinish />
        <DepositSelectNetwork />
        <DepositCreateCryptoWallet />
        <WithdrawUnavailable />
        <DepositSuccessful />
        <DepositTimeOut />
        <WithdrawInputInfo />
        <WithdrawalRequested />
        <WithdrawalCancel />
        <WithdrawalFailed />
        <CreateWalletSuccessful />
        <SwitchingWalletV2 />
        <CreateWalletNetworkV2 />
        <DepositFailed />
        <DepositLimitDialog />

        {/* v2 dialog */}
        <BasicDialogV2 />
        <Toaster
          visibleToasts={1}
          swipeDirections={['top', 'left', 'right', 'bottom']}
        />
        <ScrollToTopButton />
      </SafeAreaTelegramMiniApp>
    </SocketHandler>
  )
}
