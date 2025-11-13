/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn, css } from '@/lib/utils'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Lazy imports
import IconBtn from '@/components/common/icon-button'
import SectionHeader from '@/components/common/section-header'
import Popular from '../../../components/common/Popular'
import AchievementsProfile from './components/AchievementsProfile'
import MyItemTitle from './components/MyItem'
import MyProfile from './components/MyProfile'
import ProfileSetting from './components/Setting'
import BannerProfile from './ui/BannerProfile'
import Money from './ui/Money'
import MyItem from './ui/MyItem'
import NewGameProfile from './ui/NewGameProfile'

// Assets imports
import ArrowRightIcon from '@/assets/icons/arrowRight'
import ExchangeIcon from '@/assets/icons/home/exchange'
import LogoIcon from '@/assets/icons/logo'
import Wallet from '@/assets/images/wallet.svg'

// bg light
import exchangeLight from '@/assets/images/profile/light/ExchangeLight.svg'
import lightBonus from '@/assets/images/profile/light/mybonusLight.svg'
import lightOther from '@/assets/images/profile/light/myGameLight.svg'
import searchLight from '@/assets/images/profile/light/searchLight.svg'
import lightWallet from '@/assets/images/profile/light/walletLight.svg'
import outshopLight from '@/assets/images/profile/outshopLight.svg'

import OtherIcon from '@/assets/icons/home/other'
import FindnewGameIcon from '@/assets/icons/profile/bg/find-new-game'
import MybonousIcon from '@/assets/icons/profile/bg/my-bonous'
import bannerLight from '@/assets/images/profile/banner-game.svg'
import casinoLight from '@/assets/images/profile/casino.svg'
import contactLight from '@/assets/images/profile/contac-light.svg'
import lobbyLight from '@/assets/images/profile/lobby.svg'
import tabgame2Light from '@/assets/images/profile/tab-game2.svg'
import tabGame3 from '@/assets/images/profile/tab-game3.svg'
import tabGame4 from '@/assets/images/profile/tab-game4.svg'
import tabgameLight from '@/assets/images/profile/tap-game.svg'

import {
  itemsController,
  // itemsController,
  // levelsController,
  userController,
  UserEventType
} from '@/services/controller'
import { useAuthStore, useLevelStore } from '@/store'
import { useWalletStore } from '@/store/slices/wallet'
import { useEffect, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import ProfileSettingMobile from './components/SettingMobile'

import CategoryIcon from '@/assets/icons/home/category'
import FavoritesIcon from '@/assets/icons/home/favorites'
import ProviderIcon from '@/assets/icons/home/provider'
import CoinSilver from '@/assets/images/header/bonus-balance.svg'
import CoinBronze from '@/assets/images/header/coin-diamond.svg'
import CoinTotal from '@/assets/images/header/coin-exp.svg'
import CoinGold from '@/assets/images/header/coin-gold.svg'
import PopularIcon from '@/assets/images/profile/PopularIcon'
import { useHomeStore } from '@/store/slices/home'
import { useUserEventStore } from '@/store/slices/user-event'
import { useTranslation } from 'react-i18next'
import OutShopProfile from './ui/OutShopProfile'

const ProfilePage = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { userId } = useAuthStore()
  const { wallets, setPrevPage: setPrevPageWallet } = useWalletStore()
  const { level } = useLevelStore()
  const { setIsDoneProfilePage, isDoneProfilePage } = useUserEventStore()
  const { setType, setActiveTab, setLayoutActive, setIsScroll } = useHomeStore()

  const { useGetUserProfile, useUserEvent } = userController()
  const { data: userProfile, isLoading } = useGetUserProfile(userId!)
  const { mutate: userEvent } = useUserEvent()

  const { useGetAllMyItems } = itemsController()
  const { data: myItems } = useGetAllMyItems()

  const [__, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!isDoneProfilePage) {
      userEvent(
        {
          userEvent: UserEventType.FIRST_PERSONAL_ACCOUNT_VISIT
        },
        {
          onSuccess: () => {
            setIsDoneProfilePage(true)
          }
        }
      )
    }
  }, [isDoneProfilePage, setIsDoneProfilePage, userEvent])

  // const { useGetLevel } = levelsController()
  // const { useGetAllItems } = itemsController()
  // const { data: items } = useGetAllItems()
  // const { data: level } = useGetLevel(userId!)

  // console.log('level', level)
  // console.log('items', items)

  const populars = [
    {
      title: t('profile.myWallets'),
      des: t('profile.walletsDescription'),
      iconLeft: (
        <img
          src={Wallet}
          alt="Logo"
          className="hidden lg:block w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] absolute top-2.5 left-2.5"
        />
      ),
      link: '/balance',
      onClick: () => {
        setPrevPageWallet('/profile')
        navigate('/balance')
      },
      css: stylePopular,
      imgPosition: (
        <img src={lightWallet} className="absolute bottom-0 right-0 w-full" />
      )
    },
    {
      title: t('profile.myBonuses'),
      link: '/bonus',
      des: t('profile.bonusesDescription'),
      iconLeft: (
        <MybonousIcon className="hidden lg:block absolute top-[15px] left-[15px]" />
      ),
      css: stylePopular,
      imgPosition: (
        <img src={lightBonus} className=" absolute bottom-0 right-0 w-full" />
      )
    },
    {
      title: t('profile.myGames'),
      des: t('profile.gamesDescription'),
      iconLeft: (
        <FavoritesIcon className="hidden lg:block absolute top-[10px] left-[5px]" />
      ),
      css: stylePopular,
      imgPosition: (
        <img src={lightOther} className="absolute bottom-0 right-0 w-full" />
      ),
      onClick: () => {
        // setType('liveGame')
        setSearchParams({})
        if (isMobile) {
          setActiveTab('game')
        } else {
          setLayoutActive('right')
        }
        navigate('/')
      }
    },
    {
      title: t('profile.exchange'),
      des: t('profile.exchangeDescription'),
      iconLeft: (
        <ExchangeIcon className="hidden lg:block absolute top-[15px] left-[15px]" />
      ),
      css: stylePopular,
      imgPosition: (
        <img src={exchangeLight} className="absolute bottom-0 right-0 w-full" />
      ),
      isModalAppRoute: true,
      link: `/exchange?close-back=${location.pathname}`
    }
  ]

  const games = [
    {
      title: t('profile.lobby'),
      des: t('profile.lobbyDescription'),
      // iconLeft: <img src={CategoryImage} className="absolute top-8 left-7" />,
      iconLeft: <PopularIcon className="absolute top-8 left-7" />,
      imgPosition: (
        <img src={lobbyLight} className="absolute bottom-0 left-0" />
      ),
      onClick: () => {
        setType('')
        setSearchParams({})
        if (isMobile) {
          setActiveTab('game')
        } else {
          setLayoutActive('right')
        }
        navigate('/')
      }
    },
    {
      title: t('profile.tapGames'),
      des: t('profile.tapGamesDescription'),
      // iconLeft: (
      //   <TabGameIcon className="hidden lg:block absolute top-10 left-10" />
      // ),
      iconLeft: <ProviderIcon className="block absolute top-[28px] left-8" />,
      imgPosition: (
        <img src={tabgame2Light} className="absolute bottom-0 right-0" />
      ),
      onClick: () => {
        setType('provider')
        if (isMobile) {
          setActiveTab('game')
        } else {
          setLayoutActive('right')
        }
        navigate('/')
      }
    },
    {
      title: t('profile.newForYou'),
      des: t('profile.newForYouDescription'),
      // iconLeft: (
      //   <img
      //     src={Search}
      //     className="hidden lg:block absolute top-10 left-10  w-[40px] h-[40px]"
      //   />
      // ),
      iconLeft: (
        <CategoryIcon className="block absolute top-[32px] left-[30px] w-[60px] h-[60px]" />
      ),
      onClick: () => {
        setType('category')
        if (isMobile) {
          setActiveTab('game')
        } else {
          setLayoutActive('right')
        }
        navigate('/')
      },
      imgPosition: <img src={searchLight} className="absolute top-0 right-0" />
    }
  ]

  const moneys = useMemo(
    () => [
      {
        icon: <img src={CoinGold} alt="Logo" className="w-[18px]" />,
        label: t('balance.mainBalance'),
        amount: wallets.find((x) => x.isDefault)?.amount ?? 0,
        classNameAmount: 'text-[#48e364]'
      },
      {
        icon: <img src={CoinSilver} alt="Logo" className="w-[18px]" />,
        label: t('profile.inBonus'),
        amount: wallets?.find((item) => item?.isBonus)?.amount || 0
      },
      {
        icon: <img src={CoinBronze} alt="Logo" className="w-[18px]" />,
        label: t('profile.yourLootCoin'),
        amount: wallets?.find((item) => item?.currency === 'BBK')?.amount || 0
      },
      {
        icon: <img src={CoinTotal} alt="Logo" className="w-[18px]" />,
        label: t('profile.exp'),
        amount: level?.experiencePoints || 0
      }
    ],
    [level?.experiencePoints, wallets, t]
  )

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="hidden lg:flex  gap-2.5 flex-wrap w-full justify-between items-center">
        {moneys?.map((item, index) => (
          <Money
            icon={item?.icon}
            key={index}
            label={item?.label}
            amount={item?.amount}
            classNameAmount={item?.classNameAmount}
          />
        ))}
      </div>

      <MyProfile />

      {isMobile ? (
        <>
          <ProfileSettingMobile
            className="w-full"
            userProfile={userProfile?.content}
            isLoading={isLoading}
          />
        </>
      ) : (
        <ProfileSetting
          className="w-full min-h-[520px]"
          userProfile={userProfile?.content}
          isLoading={isLoading}
        />
      )}

      <div className="gap-5 w-full grid grid-cols-1 lg:grid-cols-4">
        {populars?.map((item, index) => (
          <Popular
            onClick={() => {
              if (item?.onClick) {
                item?.onClick()
                return
              }

              if (item?.isModalAppRoute) {
                navigate(item.link)
              } else {
                navigate(item?.link || '')
              }
            }}
            key={index}
            className="w-full h-[82px] lg:h-[140px]"
            iconLeft={item?.iconLeft}
            title={item?.title}
            des={item?.des}
            iconRight={
              <IconBtn
                icon={<ArrowRightIcon />}
                onClick={() =>
                  item?.isModalAppRoute
                    ? navigate(item.link)
                    : navigate(item?.link || '')
                }
              />
            }
            css={item?.css}
            imgPosition={item?.imgPosition}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <AchievementsProfile className="w-full h-full lg:w-[881px] lg:h-[373px]" />
        <OutShopProfile
          className="w-full lg:w-[300px] h-[188px] lg:h-[373px] bg-[#130f1d]"
          title={t('profile.outShopTitle')}
          des={t('profile.outShopDescription')}
          labelBtn={t('profile.outShopButton')}
          styles={stylesOutShop}
          imgPosition={
            <img src={outshopLight} className="absolute top-0 right-0 " />
          }
        />
      </div>

      <MyItemTitle />

      <div className="gap-5 grid grid-cols-2 lg:grid-cols-5">
        {myItems?.content?.map((item, index) => (
          <MyItem
            key={index}
            type={item?.type as string}
            title={item?.name}
            des={item?.description}
            className="h-[251px] p-10"
          />
        ))}
      </div>

      <SectionHeader
        title={t('profile.findNewGamesTitle')}
        icon={<FindnewGameIcon className="w-[40px] h-[40px]" />}
      />

      <div className="flex flex-col lg:flex-row gap-5">
        <NewGameProfile
          title={t('profile.tabGames')}
          des={t('profile.newGameDescription', {
            year: new Date().getFullYear()
          })}
          labelBtn={t('profile.newGameButton')}
          srcIcon={tabGame4}
          className="rounded-[20px] px-5 py-10 lg:p-10"
          onClick={() => {
            // setType('liveGame')
            if (isMobile) {
              setActiveTab('game')
              // navigate('/?type=category&category=new&titleCategory=New')
              navigate('/')
            } else {
              setIsScroll(false)
              setLayoutActive('right')
              // navigate('/?type=category&category=new&titleCategory=New')
              navigate('/')
              window.scrollTo(0, 0)
            }
          }}
          imgPosition={
            <img
              src={casinoLight}
              className="absolute top-0 right-0 w-full h-full"
            />
          }
        />
        <NewGameProfile
          title={t('profile.casinoTitle')}
          des={t('profile.casinoDescription')}
          labelBtn={t('profile.casinoButton')}
          srcIcon={tabGame3}
          className="rounded-[20px] px-5 py-10 lg:p-10"
          onClick={() => {
            // setType('liveGame')
            if (isMobile) {
              setActiveTab('game')
            } else {
              setIsScroll(false)
              setLayoutActive('right')
            }
            navigate('/')
          }}
          imgPosition={
            <img
              src={tabgameLight}
              className="absolute bottom-0 right-0 w-full h-full"
            />
          }
        />
      </div>

      <div className="gap-5 w-full flex flex-col lg:flex-row">
        {games?.map((item, index) => (
          <Popular
            key={index}
            className={cn('w-full gap-10 p-10 h-[205px]')}
            onClick={item?.onClick}
            iconLeft={item?.iconLeft}
            title={item?.title}
            des={item?.des}
            iconRight={<IconBtn icon={<ArrowRightIcon />} />}
            css={stylePopular2}
            imgPosition={item?.imgPosition}
          />
        ))}
      </div>

      <SectionHeader
        title={t('profile.sectionHeaderTitle')}
        icon={<OtherIcon className="w-[40px] h-[40px]" />}
      />

      <div className="flex flex-col lg:flex-row gap-5">
        <Popular
          onClick={() => navigate('/contact')}
          css={stylePopular3}
          className="w-full lg:w-[488px] h-[256px] gap-10 p-10 justify-between "
          iconLeft={<LogoIcon className="w-[74px] h-[96px]" />}
          title={t('profile.contactSupport')}
          des={t('profile.contactSupportDescription')}
          iconRight={<IconBtn icon={<ArrowRightIcon />} />}
          imgPosition={
            <img src={contactLight} className="absolute bottom-0 left-0" />
          }
        />
        <BannerProfile
          className="w-full lg:w-[692px] h-[188px] lg:h-[256px] overflow-hidden"
          imgPosition={
            <img src={bannerLight} className="absolute bottom-0 right-0" />
          }
        />
      </div>
    </div>
  )
}

export default ProfilePage

const stylePopular = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylePopular2 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylePopular3 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylesOutShop = css`
  background: linear-gradient(
    180deg,
    rgba(64, 53, 85, 0.2) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
`
