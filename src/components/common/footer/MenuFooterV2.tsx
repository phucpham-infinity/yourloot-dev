import Favorite2Icon from '@/assets/icons/favouriteHover'
import TelegramIcon from '@/assets/icons/social/telegram'
import BonusIcon from '@/assets/icons/v2/Bonus'
// import CrashIcon from '@/assets/icons/v2/Crash'
import GameShowIcon from '@/assets/icons/v2/GameShow'
import Home2Icon from '@/assets/icons/v2/HomeIcon'
import LiveGameIcon from '@/assets/icons/v2/LiveGame'
import LivePokerIcon from '@/assets/icons/v2/LivePoker'
import NewIcon from '@/assets/icons/v2/New'
import {
  default as BonusesIcon,
  default as PopularIcon
} from '@/assets/icons/v2/Popular'
import LanguagePopover from '@/components/common/language-v2/language-popover'
// import RecommendedIcon from '@/assets/icons/v2/Recommended'
import RouleteIcon from '@/assets/icons/v2/Roulete'
import SlotsIcon from '@/assets/icons/v2/Slots'
import SupportIcon from '@/assets/icons/v2/Support'
import { YourLootSupportBotLink } from '@/constants'
import { useTelegramMiniApp } from '@/hooks'
import { useHomeStoreV2 } from '@/store/slices/v2/home.store'
import { css } from '@emotion/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import FastIcon from '@/assets/icons/v2/FastIcon'

const MenuFooterV2 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setOpenMenu } = useHomeStoreV2()

  const home = [
    {
      title: t('menu.home', 'Home'),
      icon: <Home2Icon className="w-4 h-4 text-[#9E90CF]" />,
      onClick: () => {
        setOpenMenu(false)
        navigate('/')
      }
    },
    {
      title: t('menu.bonuses', 'Bonuses'),
      icon: <BonusIcon className="w-4 h-4 text-[#9E90CF]" />,
      onClick: () => {
        setOpenMenu(false)
        navigate('/promotion')
      }
    },
    // {
    //   title: t('menu.notifications', 'Notifications'),
    //   icon: <NotificationIcon className="w-4 h-4" />,
    //   onClick: () => {
    //     setOpenMenu(false)
    //     const dialog = useDialogStore.getState()
    //     dialog.open({
    //       content: <NotificationsV2 onClose={dialog.close} />,
    //       width: window.innerWidth,
    //       height: window.innerHeight,
    //       noBorder: true
    //     })
    //   }
    // }

    {
      title: t('home.favorites', 'Favorites'),
      icon: <Favorite2Icon className="w-4 h-4 text-[#9E90CF]" />,
      onClick: () => {
        setOpenMenu(false)
        navigate('/favorites')
      }
    }
  ]

  // const wallet = [
  //   {
  //     title: t('menu.wallet', 'Wallet'),
  //     icon: <WalletIcon className="w-4 h-4 text-[#9E90CF]" />,
  //     onClick: () => {
  //       setOpenMenu(false)
  //       navigate('/payment/deposit')
  //     }
  //   }
  // ]

  const games = [
    {
      icon: <PopularIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.popular', 'Popular'),
      category: ['popular']
    },
    {
      icon: <NewIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.new', 'New'),
      category: ['new']
    },
    // {
    //   icon: <HalloweenIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: t('home.halloween', 'Halloween'),
    //   category: ['halloween']
    // },
    // {
    //   icon: <HarvestOfWinsIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: 'Harvest of Wins',
    //   onClick: () => {
    //     navigate(
    //       `/game-ids?gameIds=${SUMMER_VIBE_GAME_IDS.join(',')}&title=${t('categories.summerVibe.title', 'Harvest of Wins')}`
    //     )
    //   }
    // },
    {
      icon: <SlotsIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.slots', 'Slots'),
      category: ['slots']
    },
    // {
    //   icon: <CrashIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: t('home.crash', 'Crash'),
    //   category: ['crash']
    // },
    {
      icon: <FastIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.fast', 'Fast'),
      category: ['fast']
    },
    // {
    //   icon: <RecommendedIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: t('home.recommendedGames', 'Recommended'),
    //   category: ['recommended']
    // },
    {
      icon: <BonusesIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.bonus', 'Bonus'),
      category: ['bonus']
    },
    {
      icon: <LivePokerIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.poker', 'Poker'),
      category: ['poker']
    },
    // {
    //   icon: <LiveBlackjackIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: t('home.blackjack', 'Blackjack'),
    //   category: ['blackjack']
    // },
    {
      icon: <RouleteIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('home.roulette', 'Roulette'),
      category: ['roulette']
    }
  ]

  const liveCasino = [
    {
      icon: <LiveGameIcon className="w-4 h-4 text-[#9E90CF]" />,
      title: t('categories.liveGames.title', 'Live Game'),
      onClick: () => {
        setOpenMenu(false)
        navigate('/live-game')
      },
      category: ['live']
    },
    {
      icon: <GameShowIcon className="w-4 h-4 text-[#9E90CF]   " />,
      title: t('categories.gameShow.title', 'Game Shows'),
      category: ['game_show'],
      onClick: () => {
        setOpenMenu(false)
        navigate('/game-show')
      }
    }
    // {
    //   icon: <LivePokerIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: 'Live Poker',
    //   category: ['live_poker']
    // },
    // {
    //   icon: <LiveBlackjackIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: 'Live Blackjack',
    //   category: ['live_blackjack']
    // },
    // {
    //   icon: <LiveRouleteIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: 'Live Roulette',
    //   category: ['live_roulette']
    // },
    // {
    //   icon: <RouleteIcon className="w-4 h-4 text-[#9E90CF]" />,
    //   title: 'Roulette',
    //   category: ['roulette']
    // }
  ]

  const { isTelegramMiniApp } = useTelegramMiniApp()

  return (
    <div className="flex flex-col pb-[40px]">
      <div className="flex flex-col gap-[24px] border-b border-[#2A2242] pb-[22px]">
        {home.map((item) => (
          <div
            onClick={item?.onClick}
            key={item.title}
            className="flex items-center gap-2"
          >
            <div>{item.icon}</div>
            <div className="text-white text-[14px] font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col gap-[24px] border-b border-[#2A2242] py-[26px]">
        {wallet.map((item) => (
          <div
            onClick={item?.onClick}
            key={item.title}
            className="flex items-center gap-2"
          >
            <div>{item.icon}</div>
            <div className="text-white text-[14px] font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div> */}

      <div className="text-[#9E90CF] text-[14px] font-medium py-[16px]">
        {t('menu.games', 'Games')}
      </div>

      <div className="flex flex-col gap-[24px] border-b border-[#2A2242] pb-[22px]">
        {games.map((item) => (
          <div
            onClick={() => {
              setOpenMenu(false)
              navigate(
                `/game-category?category=${item?.category[0]}&title=${item?.title}`
              )
            }}
            key={item.title}
            className="flex items-center gap-2"
          >
            <div>{item.icon}</div>
            <div className="text-white text-[14px] font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div className="text-[#9E90CF] text-[14px] font-medium py-[16px]">
        {t('menu.liveCasino', 'Live Casino')}
      </div>

      <div
        className={clsx(
          'flex flex-col gap-[24px] pb-[22px]',
          isTelegramMiniApp && '!pb-[46px]'
        )}
      >
        {liveCasino.map((item) => (
          <div
            onClick={() => {
              setOpenMenu(false)
              navigate(
                `/game-category?category=${item?.category[0]}&title=${item?.title}`
              )
            }}
            key={item.title}
            className="flex items-center gap-2"
          >
            <div>{item.icon}</div>
            <div className="text-white text-[14px] font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className={clsx(
          'fixed bottom-0 left-0 pt-3 pb-4 px-4 border-t bg-[#0B0A11] border-[#2A2242] right-0 flex justify-between items-center gap-2',
          isTelegramMiniApp && '!pb-[46px]'
        )}
      >
        <LanguagePopover
          showLabel={false}
          className={clsx('h-10  !w-10 !min-w-10  ')}
          contentClassName="w-[250px] p-4 pb-2 "
        />
        <div className="flex items-center justify-between w-full gap-2 ">
          <div
            css={styles()}
            onClick={() => {
              window.open(YourLootSupportBotLink, '_blank')
            }}
            className="flex flex-1 items-center gap-[6px] justify-center border-app-default h-10 rounded-[6px] py-[16px] px-[20px] text-[#9E90CF] text-xs font-medium"
          >
            <TelegramIcon className="w-3 h-3" />
            {t('header.telegram')}
          </div>
          <div
            css={styles()}
            onClick={() => {
              setOpenMenu(false)
              navigate('/about')
            }}
            className="flex flex-1 items-center gap-[6px] justify-center border-app-default h-10 rounded-[6px] py-[16px] px-[20px] text-[#9E90CF] text-xs font-medium"
          >
            <SupportIcon className="w-3 h-3" />
            {t('auth.support')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuFooterV2

const styles = () => {
  return css`
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  `
}
