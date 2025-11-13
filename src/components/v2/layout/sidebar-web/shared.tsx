import SearchDialog from '@/app/v2/home/modules/Search'
import Menu2Icon from '@/assets/icons/menu'
import MenuHoverIcon from '@/assets/icons/menuHover'
import TelegramIcon from '@/assets/icons/social/telegram'
import BonusIcon from '@/assets/icons/v2/Bonus'
// import CrashIcon from '@/assets/icons/v2/Crash'
import GameShowIcon from '@/assets/icons/v2/GameShow'
import Home2Icon from '@/assets/icons/v2/HomeIcon'
// import LiveBlackjackIcon from '@/assets/icons/v2/LiveBlackjack'
import LivePokerIcon from '@/assets/icons/v2/LivePoker'
// import LiveRouleteIcon from '@/assets/icons/v2/LiveRoulete'
import NewIcon from '@/assets/icons/v2/New'
import PopularIcon from '@/assets/icons/v2/Popular'
// import RecommendedIcon from '@/assets/icons/v2/Recommended'
import RouleteIcon from '@/assets/icons/v2/Roulete'
import Search2Icon from '@/assets/icons/v2/search2'
import SlotsIcon from '@/assets/icons/v2/Slots'
import SupportIcon from '@/assets/icons/v2/Support'
import WalletIcon from '@/assets/icons/v2/Wallet'
import Bonus2HoverIconImage from '/public/images/v2/bonus-active.png'
import GameShowHoverIconImage from '/public/images/v2/game-show-active.png'

import BonusHoverIcon from '@/assets/icons/v2/Bonus2Hover'
// import CrashHoverIcon from '@/assets/icons/v2/CrashHover'
import FastHoverIcon from '@/assets/icons/v2/FastHover'
import HomeHoverIcon from '@/assets/icons/v2/HomeHoverIcon'
import LiveGameIcon from '@/assets/icons/v2/LiveGame'
import LivePokerHoverIcon from '@/assets/icons/v2/LivePokerHover'
import NewHoverIcon from '@/assets/icons/v2/New-copy3'
import PopularHoverIcon from '@/assets/icons/v2/PopularHover'
import SlotsHoverIcon from '@/assets/icons/v2/SlotsHover'
import WalletHoverIcon from '@/assets/icons/v2/WalletHover'
import LanguagePopover from '@/components/common/language-v2/language-popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn, css, WIDTH_SIDEBAR, WIDTH_SIDEBAR_EXPANDED } from '@/lib/utils'
import { useAuthStore } from '@/store'
import { useV2DialogStore } from '@/store/slices/v2/dialog.store'
import clsx from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
// import LiveBlackjackHoverIcon from '@/assets/icons/v2/LiveBlackjackHover'
import RouleteHoverIcon from '@/assets/icons/v2/RouleteHover'
// import LiveGameHoverIcon from '@/assets/icons/v2/LiveGameHover'
import Favorite2Icon from '@/assets/icons/favourite'
import FavouriteHoverIcon from '@/assets/icons/favouriteHover'
import FastIcon from '@/assets/icons/v2/FastIcon'
import LiveGameHoverIcon from '@/assets/icons/v2/LiveGameHover'
// import StoreIcon from '@/assets/icons/v2/Store'

// Types
export type SidebarItemType = {
  id: string
  icon: React.ReactNode
  hoverIcon?: React.ReactNode
  label: React.ReactNode
  hasCounter?: boolean
  counterValue?: number
  onClick?: () => void
  category?: string[]
  isActive?: boolean
  hasDropdown?: boolean
}

export interface SidebarRowProps {
  item: SidebarItemType
  isActive: boolean
  isOpen: boolean
  onClick: () => void
  className?: string
  labelClassName?: string
  truncateWhenClosed?: boolean
  innerRef?: React.Ref<HTMLDivElement>
}

export interface SidebarSectionProps {
  items: SidebarItemType[]
  isOpen: boolean
  activeId: string | null
  onItemClick: (item: SidebarItemType) => void
  containerClassName?: string
  rowClassName?: string
  labelClassName?: string
  heading?: React.ReactNode
  registerRowRef?: (id: string, el: HTMLDivElement | null) => void
  useExternalHighlight?: boolean
  headingHidden?: boolean
  setHeadingHidden?: (hidden: boolean) => void
}

export interface HeaderSectionProps {
  isOpen: boolean
  onToggle: () => void
  onOpenSearch: () => void
  searchLabel: React.ReactNode
}

export interface SearchCollapsedSectionProps {
  isOpen: boolean
  items: SidebarItemType[]
  activeId: string | null
  onItemClick: (item: SidebarItemType) => void
}

export interface FooterSectionProps {
  isOpen: boolean
  onClickSupport: () => void
  onOpenTelegram: () => void
  supportLabel: React.ReactNode
  isDrawer?: boolean
}

// SidebarRow Component
const activeIndicatorCss = (isActive: boolean) => css`
  position: relative;
  ${isActive &&
  `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(
        193.7deg,
        #9caeef -1.38%,
        #c693df 54.15%,
        #e8cccc 111.97%
      );
    }
  `}
`

export function SidebarRow({
  item,
  isActive,
  isOpen,
  onClick,
  className,
  labelClassName,
  innerRef
}: SidebarRowProps) {
  return (
    <div
      ref={innerRef}
      onClick={onClick}
      className={clsx(
        'group relative z-[1] h-10 flex items-center gap-2 cursor-pointer pl-5 py-[14px]',
        // isOpen ? 'pl-4 py-[14px]' : 'flex-col py-[8px]! pl-0!',
        className
      )}
      css={activeIndicatorCss(isActive)}
    >
      {isOpen ? (
        <>
          <div
            className={clsx(
              'text-[#9E90CF]',
              !isActive && 'group-hover:text-white',
              isActive && 'pointer-events-none hidden'
            )}
          >
            {item.icon}
          </div>
          {item.hoverIcon && (
            <div className={clsx('hidden !min-w-5', isActive && '!block')}>
              {item.hoverIcon}
            </div>
          )}
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <div
                className={clsx(
                  'text-[#9E90CF]',
                  !isActive && 'group-hover:text-white',
                  isActive && 'pointer-events-none hidden'
                )}
              >
                {item.icon}
              </div>
              {item.hoverIcon && (
                <div className={clsx('hidden !min-w-5', isActive && '!block')}>
                  {item.hoverIcon}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={2}>
            {item.label}
          </TooltipContent>
        </Tooltip>
      )}
      <div
        className={clsx(
          'text-app-medium-14 text-[#C5C0D8] group-hover:te whitespace-nowrap text-center transition-all duration-700 ease-in-out',
          isActive
            ? 'bg-gradient-border bg-clip-text text-transparent'
            : 'group-hover:text-white',
          !isOpen && '!opacity-0  pointer-events-none',
          isOpen && 'opacity-100',
          labelClassName
        )}
        style={{
          transitionProperty: 'opacity, max-width'
        }}
      >
        {item.label}
      </div>

      {item.hasCounter && (
        <span className="ml-auto mr-2 inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-md bg-orange-300 text-zinc-950 text-xs font-medium">
          {item.counterValue}
        </span>
      )}
    </div>
  )
}

// SidebarSection Component
export function SidebarSection({
  items,
  isOpen,
  activeId,
  onItemClick,
  containerClassName,
  rowClassName,
  labelClassName,
  heading,
  registerRowRef,
  useExternalHighlight,
  headingHidden
}: SidebarSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])
  const [indicatorTop, setIndicatorTop] = useState(0)
  const [indicatorHeight, setIndicatorHeight] = useState(0)
  const [showIndicator, setShowIndicator] = useState(false)

  useLayoutEffect(() => {
    if (useExternalHighlight) return
    const index = items.findIndex((it) => it.id === activeId)
    if (index === -1) {
      setShowIndicator(false)
      return
    }
    const rowEl = rowRefs.current[index]
    const containerEl = containerRef.current
    if (!rowEl || !containerEl) return
    const rowRect = rowEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()
    const computed = getComputedStyle(containerEl)
    const paddingTop = parseFloat(computed.paddingTop || '0') || 0
    setIndicatorTop(
      rowRect.top - containerRect.top + containerEl.scrollTop - paddingTop
    )
    setIndicatorHeight(rowRect.height)
    setShowIndicator(true)
  }, [activeId, items])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col transition-all duration-900 py-3',
        containerClassName,
        !isOpen && 'pl-0'
      )}
      style={{
        transitionProperty: 'padding, transform',
        transitionDuration: '900ms',
        transitionTimingFunction: 'ease-in-out'
      }}
    >
      {!useExternalHighlight && showIndicator && (
        <div
          className={cn(
            'absolute left-0 right-0 bg-app-primary/10 pointer-events-none transition-all duration-500 ease-out'
          )}
          style={{
            transform: `translateY(${indicatorTop}px)`,
            height: indicatorHeight
          }}
        />
      )}
      {heading && (
        <div
          className={clsx(
            'pl-4 opacity-0 transition-all duration-800 whitespace-nowrap text-[#9E90CF] text-app-medium-12 font-medium h-[25px] flex items-center',
            isOpen && 'opacity-100!',
            !isOpen && 'overflow-hidden pointer-events-none',
            headingHidden && 'h-0! p-0!'
          )}
          style={{
            transitionProperty: 'opacity, max-width, height'
          }}
        >
          {heading}
        </div>
      )}
      <div
        className="transition-all ease-in-out duration-900"
        style={{
          transitionProperty: 'transform, margin',
          transitionDuration: '900ms',
          transitionTimingFunction: 'ease-in-out'
        }}
      >
        {items.map((item, index) => (
          <SidebarRow
            key={index}
            item={item}
            isActive={activeId === item.id}
            isOpen={isOpen}
            onClick={() => onItemClick(item)}
            className={rowClassName}
            labelClassName={labelClassName}
            truncateWhenClosed={!!heading}
            innerRef={(el) => {
              rowRefs.current[index] = el
              if (registerRowRef) registerRowRef(item.id, el)
            }}
          />
        ))}
      </div>
    </div>
  )
}

// HeaderSection Component
export function HeaderSection({
  isOpen,
  onToggle,
  onOpenSearch,
  searchLabel
}: HeaderSectionProps) {
  return (
    <div
      className={clsx(
        'flex items-center px-5 pt-[10px] pb-0 transition-all duration-300 gap-4',
        !isOpen && 'px-0 gap-0'
      )}
    >
      <div className="w-5 h-5 group">
        <Menu2Icon
          onClick={onToggle}
          className={clsx('w-5 h-5 cursor-pointer group-hover:hidden')}
        />
        <MenuHoverIcon
          onClick={onToggle}
          className={clsx('w-5 h-5 cursor-pointer hidden group-hover:block')}
        />
      </div>
      <div
        className={clsx(
          'h-[40px] w-[164px] transition-all duration-500 pl-[20px] flex items-center cursor-pointer text-[14px] font-medium leading-[14px] text-[#FFFFFF] hover:text-app-white rounded-[10px] border border-app-default',
          isOpen ? ' opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onOpenSearch}
      >
        <span
          className={clsx(
            'transition-all duration-500',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        >
          {searchLabel}
        </span>
      </div>
    </div>
  )
}

// SearchCollapsedSection Component
export function SearchCollapsedSection({
  isOpen,
  items,
  activeId,
  onItemClick
}: SearchCollapsedSectionProps) {
  return (
    <div
      className={cn(
        'pl-4 flex flex-col transition-all duration-700 ease-in-out border-b border-t border-[#2A2242]',
        !isOpen && 'pl-0! flex justify-center items-center opacity-100',
        isOpen && 'opacity-0 pointer-events-none h-0 overflow-hidden'
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className={clsx(
            'group flex items-center py-[18px] gap-2 rounded-[6px] cursor-pointer hover:bg-transparent'
          )}
        >
          <span
            className={clsx(
              'text-[#9E90CF] ',
              activeId === item.id && 'group-hover:text-white'
            )}
          >
            {item.icon}
          </span>
        </div>
      ))}
    </div>
  )
}

// FooterSection Component
export function FooterSection({
  isOpen,
  onClickSupport,
  onOpenTelegram,
  supportLabel,
  isDrawer
}: FooterSectionProps) {
  const [isHidden, setIsHidden] = useState(false)
  const [shouldFlexCol, setShouldFlexCol] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      // First hide the support label
      const hideLabelTimer = setTimeout(() => {
        setIsHidden(true)
      }, 100)

      // Then change to flex-col after label is hidden
      const flexColTimer = setTimeout(() => {
        setShouldFlexCol(true)
      }, 300)

      return () => {
        clearTimeout(hideLabelTimer)
        clearTimeout(flexColTimer)
      }
    } else {
      setIsHidden(false)
      setShouldFlexCol(false)
    }
  }, [isOpen])

  return (
    <div
      style={{
        // fix border in drawer mobile
        width: isOpen
          ? isDrawer
            ? 232
            : WIDTH_SIDEBAR_EXPANDED
          : WIDTH_SIDEBAR
      }}
      className={cn(
        'fixed transition-all border-r duration-600 bottom-0 py-[12px] z-[9] bg-[#040305] px-4 flex flex-col border-t border-[#2A2242] gap-3',
        !isOpen && 'px-0'
      )}
    >
      <div
        className={clsx(
          'flex w-full items-center justify-between gap-2 transition-all duration-700',
          shouldFlexCol && 'flex-col'
        )}
      >
        <LanguagePopover
          isOpen={isOpen}
          showLabel={false}
          className={clsx('h-8! w-8! min-w-8!')}
          contentClassName="w-[250px] p-4 pb-2"
        />
        <div
          onClick={onClickSupport}
          className={clsx(
            'transition-all duration-700 flex items-center gap-[6px] justify-center border-app-default h-8 rounded-[6px] cursor-pointer hover:bg-app-primary/10',
            isOpen ? 'w-full' : 'w-8'
          )}
        >
          <SupportIcon className="w-3 h-3" />
          <span
            className={clsx(
              'truncate transition-all duration-300 max-w-[80px] text-[#9E90CF] text-app-medium-14 font-medium',
              isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
              isHidden && 'hidden'
            )}
          >
            {supportLabel}
          </span>
        </div>

        <div
          onClick={onOpenTelegram}
          className="flex items-center justify-center border-app-default h-8 w-8 min-w-8! rounded-[6px] text-[#9E90CF] text-xs font-medium cursor-pointer hover:bg-app-primary/10 transition-colors"
        >
          <TelegramIcon className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}

// useSidebarData Hook
export function useSidebarData(
  activeItem: string | null,
  setActiveItem: (item: string | null) => void
) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const dialog = useV2DialogStore()
  const { isAuthenticated } = useAuthStore()

  const openSearch = () => {
    dialog.open({
      title: t('home.titleSearch', 'Search'),
      content: <SearchDialog />,
      className: '!w-[700px]'
    })
  }

  const openLogin = (url?: string) => {
    if (url) {
      navigate(`/auth/login?redirect=${url}`)
    } else {
      navigate('/auth/login')
    }
  }

  const search: SidebarItemType[] = [
    {
      id: 'search',
      icon: <Search2Icon className="w-4 h-4 hover:fill-white" />,
      label: t('sidebar.search', 'Search'),
      isActive: false,
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      onClick: () => {
        openSearch()
      }
    }
  ]

  const menuItems: SidebarItemType[] = [
    {
      id: 'home',
      icon: <Home2Icon className="w-5 h-5" />,
      hoverIcon: <HomeHoverIcon id="home-hover" className="w-5 h-5" />,
      label: t('sidebar.home', 'Home'),
      isActive: pathname === '/',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      onClick: () => {
        navigate('/')
      }
    },
    {
      id: 'promotions',
      icon: <BonusIcon className="w-5 h-5" />,
      hoverIcon: <BonusHoverIcon className="w-5 h-5" />,
      label: t('menu.bonuses', 'Bonuses'),
      isActive: pathname === '/promotion',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      onClick: () => {
        if (!isAuthenticated) {
          openLogin('promotion')
        } else {
          navigate('/promotion')
        }
      }
    },
    // {
    //   id: 'store',
    //   icon: <StoreIcon className="w-5 h-5" />,
    //   label: t('menu.store', 'Store'),
    //   isActive: pathname === '/store',
    //   hasCounter: false,
    //   counterValue: 0,
    //   hasDropdown: false,
    //   onClick: () => {
    //     if (!isAuthenticated) {
    //       openLogin('store')
    //     } else {
    //       navigate('/store')
    //     }
    //   }
    // },
    {
      id: 'favourites',
      icon: <Favorite2Icon className="w-5 h-5" />,
      hoverIcon: <FavouriteHoverIcon className="w-5 h-5" />,
      label: t('home.favorites', 'Favorites'),
      isActive: pathname === '/favorites',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      onClick: () => {
        if (!isAuthenticated) {
          openLogin('favorites')
        } else {
          navigate('/favorites')
        }
      }
    }
  ]

  const wallets: SidebarItemType[] = [
    {
      id: 'wallets',
      icon: <WalletIcon className="w-5 h-5" />,
      hoverIcon: <WalletHoverIcon className="w-5 h-5" />,
      label: t('sidebar.wallets', 'Wallets'),
      isActive: pathname.includes('/payment'),
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      onClick: () => {
        if (!isAuthenticated) {
          openLogin('payment/deposit')
        } else {
          navigate('/payment/deposit')
        }
      }
    }
  ]

  const games: SidebarItemType[] = [
    {
      id: 'popular',
      icon: <PopularIcon className="w-5 h-5" />,
      hoverIcon: <PopularHoverIcon className="w-5 h-5" />,
      label: t('home.popular', 'Popular'),
      isActive: searchParams.get('category') === 'popular',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: true,
      category: ['popular']
    },
    {
      id: 'new',
      icon: <NewIcon className="w-5 h-5" />,
      hoverIcon: <NewHoverIcon className="w-5 h-5" />,
      label: t('home.new', 'New'),
      isActive: searchParams.get('category') === 'new',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      category: ['new']
    },
    // {
    //   id: 'halloween',
    //   icon: <HalloweenIcon className="w-5 h-5" />,
    //   hoverIcon: <HalloweenHoverIcon className="w-5 h-5" />,
    //   label: t('categories.halloween.title', 'Halloween'),
    //   isActive: searchParams.get('category') === 'halloween',
    //   hasCounter: false,
    //   counterValue: 0,
    //   hasDropdown: false,
    //   category: ['halloween']
    // },
    // {
    //   id: 'harvest-of-wins',
    //   icon: <HarvestOfWinsIcon className="w-5 h-5" />,
    //   hoverIcon: <HarvestOfWinsHoverIcon className="w-5 h-5" />,
    //   label: 'Harvest of Wins',
    //   isActive:
    //     pathname.includes('/game-ids') ||
    //     searchParams.get('category') === 'harvestofwins',
    //   onClick: () => {
    //     navigate(
    //       `/game-ids?gameIds=${SUMMER_VIBE_GAME_IDS.join(',')}&title=${t('categories.summerVibe.title', 'Harvest of Wins')}`
    //     )
    //   }
    // },
    {
      id: 'slots',
      icon: <SlotsIcon className="w-5 h-5" />,
      hoverIcon: <SlotsHoverIcon className="w-5 h-5" />,
      label: t('home.slots', 'Slots'),
      isActive: searchParams.get('category') === 'slots',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      category: ['slots']
    },
    // {
    //   id: 'crash',
    //   icon: <CrashIcon className="w-5 h-5" />,
    //   hoverIcon: <CrashHoverIcon className="w-5 h-5" />,
    //   label: t('home.crash', 'Crash'),
    //   isActive: searchParams.get('category') === 'crash',
    //   hasCounter: false,
    //   counterValue: 0,
    //   hasDropdown: false,
    //   category: ['crash']
    // },
    {
      id: 'fast',
      icon: <FastIcon className="w-5 h-5" />,
      hoverIcon: <FastHoverIcon className="w-5 h-5" />,
      label: t('home.fast', 'Fast'),
      isActive: searchParams.get('category') === 'fast',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      category: ['fast']
    },
    // {
    //   id: 'recommended',
    //   icon: <RecommendedIcon className="w-5 h-5" />,
    //   label: t('home.recommendedGames', 'Recommended'),
    //   isActive: searchParams.get('category') === 'recommended',
    //   hasCounter: false,
    //   counterValue: 0,
    //   hasDropdown: false,
    //   category: ['recommended']
    // },
    {
      id: 'bonus',
      icon: <BonusIcon className="w-5 h-5" />,
      hoverIcon: (
        <img
          src={Bonus2HoverIconImage}
          alt="bonus2-hover"
          className="w-5 h-5"
        />
      ),
      label: t('home.bonus', 'Bonus'),
      isActive: searchParams.get('category') === 'bonus',
      hasCounter: false,
      counterValue: 0,
      hasDropdown: false,
      category: ['bonus']
    },
    {
      id: 'poker',
      icon: <LivePokerIcon className="w-5 h-5" />,
      hoverIcon: <LivePokerHoverIcon className="w-5 h-5" />,
      label: t('home.poker', 'Poker'),
      isActive: searchParams.get('category') === 'poker',
      category: ['poker']
    },
    // {
    //   id: 'blackjack',
    //   icon: <LiveBlackjackIcon className="w-5 h-5" />,
    //   hoverIcon: <LiveBlackjackHoverIcon className="w-5 h-5" />,
    //   label: t('home.blackjack', 'Blackjack'),
    //   isActive: searchParams.get('category') === 'blackjack',
    //   category: ['blackjack']
    // },
    {
      id: 'roulette',
      icon: <RouleteIcon className="w-5 h-5" />,
      hoverIcon: <RouleteHoverIcon className="w-5 h-5" />,
      label: t('home.roulette', 'Roulette'),
      isActive: searchParams.get('category') === 'roulette',
      category: ['roulette']
    }
  ]

  const liveCasino: SidebarItemType[] = [
    {
      id: 'live-game',
      icon: <LiveGameIcon className="w-5 h-5" />,
      hoverIcon: <LiveGameHoverIcon className="w-5 h-5" />,
      label: t('categories.liveGames.title', 'Live Game'),
      isActive: searchParams.get('category') === 'live',
      category: ['live']
    },
    {
      id: 'game-show',
      icon: <GameShowIcon className="w-5 !min-w-5 h-5" />,
      hoverIcon: (
        <img
          id="game-show-hover"
          src={GameShowHoverIconImage}
          alt="game-show-hover"
          className="w-5 h-5"
        />
      ),
      label: t('categories.gameShow.title', 'Game Shows'),
      isActive: searchParams.get('category') === 'game_show',
      category: ['game_show']
    }
    // {
    //   id: 'live-roulette',
    //   icon: <LiveRouleteIcon className="w-5 h-5" />,
    //   label: 'Live Roulette',
    //   isActive: searchParams.get('category') === 'live_roulette',
    //   category: ['live_roulette']
    // }
  ]

  const allItems = [
    ...search,
    ...menuItems,
    ...wallets,
    ...games,
    ...liveCasino
  ] as Array<{ id: string; isActive?: boolean }>

  const matched = allItems.find((item) => item.isActive)

  if (matched) {
    if (activeItem !== matched.id) {
      setActiveItem(matched.id)
    }
  } else {
    if (pathname === '/') {
      if (activeItem !== 'home') setActiveItem('home')
    } else if (activeItem !== null) {
      setActiveItem(null)
    }
  }

  return {
    search,
    menuItems,
    wallets,
    games,
    liveCasino,
    openSearch,
    openLogin
  }
}
