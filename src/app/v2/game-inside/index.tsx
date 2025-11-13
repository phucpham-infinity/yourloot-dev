import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Components
import BonusCarousel from './components/BonusCarousel'
import GameBar from './components/GameBar'
import GameScreen from './components/GameScreen'
import BonusWalletErrorDrawer from './components/BonusWalletErrorDrawer'
import ConfirmSwitchBalanceDrawer from './components/ConfirmSwitchBalanceDrawer'

// Hooks
import { useScreen } from '@/hooks'
import { useFavorites } from './hooks/useFavorites'
import { useGameLogic } from './hooks/useGameLogic'

function ContentOverlay({
  className,
  isToggle,
  ...props
}: React.ComponentProps<any>) {
  return (
    <div
      data-slot="overlay"
      className={
        isToggle
          ? cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/95',
              className
            )
          : ''
      }
      {...props}
    />
  )
}

const GameInsideV2 = () => {
  const [isToggle, setIsToggle] = useState(false)
  const iframeRef = useRef<any>(null)
  const { userId, isAuthenticated } = useAuthStore()
  const location = useLocation()
  const { isMobile } = useScreen()
  const navigate = useNavigate()
  // Check for fullscreen mode query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const isFullscreenMode = searchParams.get('game_mode') === 'fullscreen'
    setIsToggle(isFullscreenMode)
  }, [location.search])

  // Custom hooks
  const {
    gameId,
    provider,
    launchUrl,
    isPostingGame,
    handleUpdateActiveBalance,
    isOpenBonusWalletErrorDialog,
    setIsOpenBonusWalletErrorDialog
  } = useGameLogic(userId!, isAuthenticated)

  const [showConfirmSwitchBalanceDialog, setShowConfirmSwitchBalanceDialog] =
    useState(false)

  const { isFavoriteGame, handleAddFavoriteGame, handleRemoveFavoriteGame } =
    useFavorites(gameId, provider, userId!)

  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = location.pathname + location.search
      navigate(`/auth/login?redirect=${encodeURIComponent(currentPath)}`)
    }
  }, [isAuthenticated])

  return (
    <div className={cn('flex-col gap-5 w-full', isMobile && 'p-4 pt-[4px]')}>
      <ContentOverlay isToggle={isToggle}>
        <div
          className={
            isMobile
              ? ''
              : isToggle
                ? 'absolute w-[1200px] top-[50%] left-[50%] grid z-50 lg:translate-x-[-50%] lg:translate-y-[-50%] max-lg:w-full max-lg:top-10 max-lg:left-0 '
                : ''
          }
        >
          <div className="justify-center items-center inline-flex overflow-hidden w-full">
            <div
              className={cn(
                'w-full relative overflow-hidden p-0 flex flex-col'
              )}
            >
              <GameScreen
                key={launchUrl}
                ref={iframeRef}
                launchUrl={launchUrl}
                isPostingGame={isPostingGame}
              />

              {!isPostingGame && launchUrl && !isMobile && (
                <GameBar
                  gameId={gameId}
                  provider={provider}
                  isFavoriteGame={isFavoriteGame}
                  isToggle={isToggle}
                  iframeRef={iframeRef}
                  onAddFavorite={handleAddFavoriteGame}
                  onRemoveFavorite={handleRemoveFavoriteGame}
                  onToggleCurtains={() => setIsToggle(!isToggle)}
                />
              )}
            </div>
          </div>
        </div>
      </ContentOverlay>

      {/* Bonus Games Carousel - outside the overlay */}
      {!isToggle && !isMobile && <BonusCarousel />}

      <BonusWalletErrorDrawer
        isOpen={isOpenBonusWalletErrorDialog}
        onClose={() => setIsOpenBonusWalletErrorDialog(false)}
        onSwitchBalance={() => {
          setShowConfirmSwitchBalanceDialog(true)
          setIsOpenBonusWalletErrorDialog(false)
        }}
        hideCloseButton={true}
      />

      <ConfirmSwitchBalanceDrawer
        isOpen={showConfirmSwitchBalanceDialog}
        onClose={() => setShowConfirmSwitchBalanceDialog(false)}
        onConfirmSwitch={async () => {
          await handleUpdateActiveBalance?.()
          setIsOpenBonusWalletErrorDialog(false)
          setShowConfirmSwitchBalanceDialog(false)
        }}
        onCancelSwitch={() => {
          setShowConfirmSwitchBalanceDialog(false)
          setIsOpenBonusWalletErrorDialog(true)
        }}
      />
    </div>
  )
}

export default GameInsideV2
