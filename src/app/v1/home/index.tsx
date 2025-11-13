import ArrowRightIcon from '@/assets/icons/arrowRight'
import { cn, css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useRef } from 'react'

// bg light
import lightBonus from '@/assets/icons/home/light/bonus.svg'
// import lightOther from '@/assets/icons/home/light/other.svg'
import lightWallet from '@/assets/icons/home/light/wallet.svg'

// light right
import lightCategory from '@/assets/icons/home/light/lightCategory.svg'
import lightProvider from '@/assets/icons/home/light/lightProvider.svg'
import lightProvidertext from '@/assets/icons/home/light/lightProviderText.svg'
import lightMore from '@/assets/icons/home/light/lightmore.svg'

import lightShop from '@/assets/icons/home/light/lightLootStore.svg'

// img
// import queenIcon from '@/assets/icons/home/queen.svg'

// tour
import ArrowLeft from '@/assets/icons/arrowLeft'
import FireIcon from '@/assets/icons/fire'
import CategoryIcon from '@/assets/icons/home/category'
import MyWalletIcon from '@/assets/icons/home/my-wallet'
// import OtherIcon from '@/assets/icons/home/other'
import ProviderIcon from '@/assets/icons/home/provider'
import SearchIcon from '@/assets/icons/home/search'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Banner from '@/components/common/banner/Banner'
import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import { OnBoarding } from '@/components/common/on-boarding'
import ImageCard from '@/components/common/ui/Image'
import Piggy from '../../../components/common/Piggy'
import Popular from '../../../components/common/Popular'
import Support from './components/Account'
import Achievements from './components/Achievements'
import Deposit from './components/Deposit'
import Language from './components/Language'
import Mask from './components/Mask'
import NewGame from './components/NewGame'
import OutShop from './components/OutShop'
import PopularGame from './components/PopularGame'
import Profile from './components/Profile'
import Promocode from './components/Promocode'
// import Refer from './components/Refer'
import WithDraw from './components/Withdraw'
import CategoryTab from './components/ui-common/CategoryTab'
import ProviderTab from './components/ui-common/ProviderTab'
import SearchTab from './components/ui-common/SearchTab'

import ExchangeIcon from '@/assets/icons/home/exchange'
import { TabsCommon } from '@/components/common/ui/TabCommon'
import { backofficeController, Game } from '@/services/controller'
import { useGamesStore, useProfileStore, useWalletStore } from '@/store'
import { useHomeStore } from '@/store/slices/home'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import GameSoftTab from './components/ui-common/GameSoftTab'
import LiveGameTab from './components/ui-common/LiveGameTab'
import ProviderUI from './components/ui-common/ProviderUI'

// banner
import bannerDepositDesktop from '/public/images/banner/carousel-desktop-depositbanner.png'
import bannerWelcomeDesktop from '/public/images/banner/carousel-desktop-welcomebanner.png'
import bannerDepositMobile from '/public/images/banner/carousel-mobile-depositbanner.png'
import bannerWelcomeMobile from '/public/images/banner/carousel-mobile-welcomebanner.png'
import bannerFtbonusDesktop from '/public/images/banner/carousel-desktop-ftdbonus.png'
import bannerFtbonusMobile from '/public/images/banner/carousel-mobile-ftdbonus.png'

import BonusIcon from '@/assets/icons/home/bonus-icon'
import './index.css'
// import Refer from './components/Refer'
import PopularHome from './components/ui-common/PopularHome'
import StarCamsIcon from '@/assets/icons/home/starCams'
import FavoriteTab from './components/ui-common/FaveroriteTab'

export default function HomePage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const containerLeftRef = useRef<HTMLDivElement | null>(null)
  const containerRightRef = useRef<HTMLDivElement | null>(null)

  const { useGetBackofficeUtm, useGetBackofficeAffiliate } =
    backofficeController()

  const { mutate: postBackofficeUtm } = useGetBackofficeUtm()
  const { mutate: postBackofficeAffiliate } = useGetBackofficeAffiliate()

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = useProfileStore((s) => s.profile?.userId)
  const { setPrevPage: setPrevPageWallet } = useWalletStore()

  useEffect(() => {
    if (
      userId &&
      searchParams.get('stag') &&
      searchParams.get('tr_src') &&
      searchParams.get('tracking_link')
    ) {
      postBackofficeAffiliate({
        userId: userId ?? '',
        stag: searchParams.get('stag') ?? '',
        trSrc: searchParams.get('tr_src') ?? '',
        trackingLink: searchParams.get('tracking_link') ?? '',
        sourceLink: searchParams.get('source_link') ?? window.location.href,
        visitId: searchParams.get('visit_id') ?? '',
        sub: searchParams.get('sub') ?? ''
      })
    }
    if (userId && searchParams.get('utm_source'))
      postBackofficeUtm({
        userId: userId ?? '',
        utmSource: searchParams.get('utm_source') ?? '',
        utmCampaign: searchParams.get('utm_campaign') ?? '',
        utmMedium: searchParams.get('utm_medium') ?? '',
        utmContent: searchParams.get('utm_content') ?? '',
        sourceLink: searchParams.get('source_link') ?? window.location.href
      })
  }, [userId])

  const {
    type,
    setType,
    isScroll,
    setIsScroll,
    activeTab,
    setActiveTab,
    layoutActive,
    setLayoutActive
  } = useHomeStore()
  const { gameProviders, allGames, popularGames } = useGamesStore()
  const { t } = useTranslation()

  const titleCategory = searchParams.get('titleCategory')

  const updateQueryParam = (name: string, value: string) => {
    searchParams.set(name, value)
    setSearchParams(searchParams) // updates the URL
  }

  // const removeQueryParam = (name: string) => {
  //   searchParams.delete(name)
  //   setSearchParams(searchParams) // updates the URL
  // }

  const typeLists: Array<{
    title: string
    des: string
    iconLeft: React.ReactNode
    type: 'provider' | 'category' | 'search'
  }> = [
    {
      title: t('home.titleProviders'),
      des: t('home.desProviders'),
      iconLeft: <ProviderIcon className="absolute top-[10px] left-[10px]" />,
      type: 'provider'
    },
    {
      title: t('home.titleCategories'),
      des: t('home.desCategories'),
      iconLeft: <CategoryIcon className="absolute top-[10px] left-[10px]" />,
      type: 'category'
    },
    {
      title: t('home.titleSearch'),
      des: t('home.desSearch'),
      iconLeft: <SearchIcon className="absolute top-[10px] left-[10px]" />,
      type: 'search'
    }
  ]

  const typeListsBottom = [
    {
      title: t('home.useLoop'),
      type: 'search',
      des: t('home.desUseLoop'),
      img: lightMore,
      iconLeft: <SearchIcon className="absolute top-[10px] left-[10px]" />
    },
    {
      title: t('home.titleCategories'),
      type: 'category',
      des: t('home.desCategories'),
      img: lightCategory,
      iconLeft: <CategoryIcon className="absolute top-[10px] left-[10px]" />
    }
  ]

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (!isScroll) {
      timeoutId = setTimeout(() => {
        setIsScroll(true)
      }, 1000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isScroll, setIsScroll])

  const scrollToLeft = useCallback(() => {
    if (containerRef.current && isScroll) {
      setLayoutActive('left')

      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.6s ease'
        containerRef.current.style.transform = 'translateX(0)'
      }
    }
  }, [isScroll, setLayoutActive])

  const scrollToRight = useCallback(() => {
    if (containerRef.current && isScroll) {
      setLayoutActive('right')

      if (containerRef.current) {
        const translateValue =
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        containerRef.current.style.transition = 'transform 0.6s ease'
        containerRef.current.style.transform = `translateX(-${translateValue}px)`
      }
    }
  }, [isScroll, setLayoutActive])

  useEffect(() => {
    if (layoutActive === 'left') {
      scrollToLeft()
    } else {
      scrollToRight()
    }
  }, [layoutActive, scrollToLeft, scrollToRight])

  const handleGetTitleGame = () => {
    if (titleCategory) {
      return titleCategory
    } else {
      return 'Live Games'
    }
  }

  const getLabel = useMemo(() => {
    switch (type) {
      case 'provider':
        return (
          <div className="text-white text-2xl font-black flex items-center gap-2">
            <FireIcon className="w-[40px] h-[40px]" />
            {t('home.featuredProviders')}
          </div>
        )
      case 'category':
        return (
          <div className="text-white text-2xl font-black flex items-center gap-2">
            {t('home.choseCategory')}
          </div>
        )
      case 'favorite':
        return (
          <div className="text-white text-2xl font-black flex items-center gap-2">
            Favorites
          </div>
        )
      case 'search':
        return (
          <div className="text-white text-2xl font-black flex items-center gap-1 lg:gap-2">
            <SearchIcon className="w-[60px] h-[60px]" /> Search for games
          </div>
        )
      case 'liveGame':
        return (
          <div className="text-white text-2xl font-black flex items-center gap-1 lg:gap-2">
            {/* {t('home.liveGames')} */}
            {handleGetTitleGame()}
          </div>
        )
      default:
        return ''
    }
  }, [type])

  const balanceLists = [
    {
      className: 'w-[405px] h-full',
      iconLeft: <MyWalletIcon className="" />,
      title: t('balance.myWallets'),
      iconRight: (
        <IconBtn
          icon={<ArrowRightIcon />}
          onClick={() => {
            navigate('/balance')
            setPrevPageWallet('/')
          }}
        />
      ),
      onClick: () => {
        navigate('/balance')
        setPrevPageWallet('/')
      },
      css: stylesWallet,
      imgPosition: (
        <img src={lightWallet} className="absolute bottom-0 right-0" />
      ),
      isShowMobile: true
    },
    {
      className: 'second-step w-[405px] ',
      iconLeft: <BonusIcon className=" w-[40px] h-[40px]" />,
      title: t('profile.myBonuses'),
      iconRight: (
        <IconBtn
          icon={<ArrowRightIcon />}
          onClick={() => {
            // navigate('/promo-code')
            navigate('/bonus')
          }}
        />
      ),
      onClick: () => {
        navigate('/bonus')
      },
      css: stylesWallet,
      imgPosition: (
        <img src={lightBonus} className="absolute bottom-0 right-0" />
      ),
      isShowMobile: true
    },
    {
      className: 'second-step w-[405px] ',
      iconLeft: <StarCamsIcon className=" w-[40px] h-[40px]" />,
      title: t('profile.myFavorites'),
      iconRight: (
        <IconBtn
          icon={<ArrowRightIcon />}
          onClick={() => {
            window.scrollTo(0, 0)
            setType('favorite')
            if (isMobile) {
              setActiveTab('game')
            } else {
              setLayoutActive('right')
            }
          }}
        />
      ),
      onClick: () => {
        window.scrollTo(0, 0)
        setType('favorite')
        if (isMobile) {
          setActiveTab('game')
        } else {
          setLayoutActive('right')
        }
      },
      css: stylesWallet,
      imgPosition: (
        <img src={lightBonus} className="absolute bottom-0 right-0" />
      ),
      isShowMobile: false
    }
  ]

  const listTabs = [
    {
      label: 'Dashboard',
      value: 'dashboard'
    },
    {
      label: 'Games',
      value: 'game'
    }
  ]

  const listBannerLeft = [
    {
      title: t('home.getBonusDeposit'),
      description: t('home.crypto'),
      imageMobile: bannerDepositMobile,
      imageDesktop: bannerDepositDesktop
    },
    {
      title: t('home.welcomeBanner'),
      description: t('home.welcomeBannerDes'),
      imageMobile: bannerWelcomeMobile,
      imageDesktop: bannerWelcomeDesktop
    },
    {
      title: t('home.ftdBonus'),
      description: t('home.ftdBonusDes'),
      imageMobile: bannerFtbonusMobile,
      imageDesktop: bannerFtbonusDesktop,
      buttonLabel: t('home.readMore')
    }
  ]

  const listBannerRight = [
    {
      title: t('home.welcomeBanner'),
      description: t('home.welcomeBannerDes'),
      imageMobile: bannerWelcomeMobile,
      imageDesktop: bannerWelcomeDesktop
    },
    {
      title: t('home.getBonusDeposit'),
      description: t('home.crypto'),
      imageMobile: bannerDepositMobile,
      imageDesktop: bannerDepositDesktop
    },
    {
      title: t('home.ftdBonus'),
      description: t('home.ftdBonusDes'),
      imageMobile: bannerFtbonusMobile,
      imageDesktop: bannerFtbonusDesktop,
      buttonLabel: t('home.readMore')
    }
  ]

  // NOTE: NEW_GAMES
  const newgame1 = allGames?.slice(3, 4)[0]
  const newgame2 = allGames?.slice(4, 6)
  const newgame3 = allGames?.slice(6, allGames?.length - 1)

  return (
    <>
      <div className="relative z-20 w-full h-full">
        {isMobile && (
          <TabsCommon
            listTabs={listTabs}
            setTab={setActiveTab}
            tab={activeTab}
          />
        )}

        {layoutActive === 'left' && (
          <div
            style={{
              width: (window?.innerWidth - 1200) / 2,
              right: -(window?.innerWidth - 1200) / 2
              // height: containerLeftRef?.current?.scrollHeight
            }}
            className="absolute h-full right-0 bg-[#191523] z-[25] xxx"
          />
        )}

        {layoutActive === 'right' && (
          <div
            style={{
              width: (window.innerWidth - 1200) / 2,
              left: -(window.innerWidth - 1200) / 2
            }}
            className="absolute h-full left-0 bg-[#191523] z-[25] xxx"
          />
        )}

        {!isMobile && (
          <Mask
            onScrollLeft={scrollToLeft}
            scrollToRight={scrollToRight}
            active={layoutActive}
          />
        )}

        <div
          ref={containerRef}
          // onScroll={onScroll}
          className="relative scroll-hide-home-page w-full h-full min-h-[1914px] flex gap-5 overflow-x-visible mt-5 lg:mt-0"
        >
          {/* left */}
          {(!isMobile || (isMobile && activeTab === 'dashboard')) && (
            <div
              ref={containerLeftRef}
              className={cn(
                'flex relative gap-5 flex-col h-fit rounded-[20px] p-0 lg:p-5 w-full lg:w-[860px] lg:min-w-[860px] z-10',
                !isMobile &&
                  layoutActive == 'left' &&
                  'border border-solid border-[#231e2b]'
              )}
              style={{
                boxShadow:
                  layoutActive == 'left'
                    ? '14px 0px 80px 0px rgba(0, 0, 0, 0.64)'
                    : '',
                // active == 'left' ? '14px 0px 80px 0px red' : '',
                backdropFilter: layoutActive == 'left' ? 'blur(10px)' : ''
              }}
            >
              <Banner
                onClick={() => {
                  navigate('/bonus/detail/general')
                }}
                className=""
                listData={listBannerLeft}
              />

              <div className="flex gap-5 flex-col translate-y-[-15px]">
                {!isMobile ? (
                  <div className="flex gap-5 w-full justify-between items-center">
                    <div
                      onClick={() =>
                        navigate(`/exchange?close-back=${location.pathname}`)
                      }
                      className="px-5 py-5 h-20 cursor-pointer w-20 rounded-[20px] border-app-default bg-home-withdraw"
                    >
                      <ExchangeIcon className="w-[40px] h-[40px]" />
                    </div>

                    <WithDraw className="w-[295px] h-[80px]" />
                    <Deposit className="w-[405px] h-[80px]" />
                  </div>
                ) : (
                  <div className="flex gap-5 flex-col w-full">
                    <Deposit className="w-full h-[80px]" />
                    <div className="flex gap-5">
                      <div
                        onClick={() =>
                          navigate(`/exchange?close-back=${location.pathname}`)
                        }
                        className="px-5 py-5 h-20 cursor-pointer w-20 rounded-[20px] border-app-default bg-home-withdraw"
                      >
                        <ExchangeIcon className="w-[40px] h-[40px]" />
                      </div>
                      <WithDraw className="w-full lg:w-[261px] h-[80px]" />
                    </div>
                  </div>
                )}

                {!isMobile ? (
                  <>
                    <div className="flex gap-5 w-full lg:flex-row flex-col">
                      <Profile className="first-step w-full lg:w-[480px] h-[286px]" />

                      <div className="rounded-[20px] flex gap-5 flex-col justify-between items-center">
                        {balanceLists?.map((item, index) => (
                          <PopularHome
                            onClick={item?.onClick}
                            styleTitle={{
                              lineHeight: 'normal !important'
                            }}
                            key={index}
                            className={item?.className}
                            iconLeft={item?.iconLeft}
                            title={item?.title}
                            iconRight={item?.iconRight}
                            css={item?.css}
                            imgPosition={item?.imgPosition}
                          />
                        ))}
                        {/* <Refer className="w-full lg:w-[320px] h-[272px]" /> */}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Profile className="first-step w-full lg:w-[480px] h-[272px]" />

                    <div className="w-full rounded-[20px] gap-5 grid grid-cols-2 justify-between items-center">
                      {balanceLists
                        ?.filter((item) => item?.isShowMobile)
                        .map((item, index) => (
                          <Popular
                            styleTitle={{
                              lineHeight: 'normal !important'
                            }}
                            isShowRightIcon={false}
                            onClick={item?.onClick}
                            className={clsx('w-full  h-[134px]', {
                              'second-step': index === 1
                            })}
                            key={index}
                            // className={item.className}
                            iconLeft={item.iconLeft}
                            title={item.title}
                            // des={item.des}
                            iconRight={item.iconRight}
                            css={item.css}
                            imgPosition={item.imgPosition}
                          />
                        ))}
                    </div>

                    {balanceLists
                      ?.filter((item) => !item?.isShowMobile)
                      .map((item, index) => (
                        <Popular
                          styleTitle={{
                            lineHeight: 'normal !important'
                          }}
                          isShowRightIcon={false}
                          onClick={item?.onClick}
                          className={clsx('w-full  h-[134px]', {
                            'second-step': index === 1
                          })}
                          key={index}
                          // className={item.className}
                          iconLeft={item.iconLeft}
                          title={item.title}
                          // des={item.des}
                          iconRight={item.iconRight}
                          css={item.css}
                          imgPosition={item.imgPosition}
                        />
                      ))}

                    {/* <Refer className="w-full lg:w-[320px] h-[200px] lg:h-[272px]" /> */}
                  </>
                )}

                <div className="flex gap-5 flex-col lg:flex-row w-full">
                  <Achievements className="w-full lg:w-[480px] grid grid-cols-1 max-h-[626px] lg:max-h-full" />
                  <OutShop
                    className="third-step w-full lg:w-[320px] h-full lg:h-[353px]"
                    title={t('home.yourlootStore')}
                    des={t('home.checkout')}
                    labelBtn={t('home.store')}
                    styles={stylesOutShop}
                    imgPosition={
                      <img
                        src={lightShop}
                        className="absolute top-[20px] right-0 "
                      />
                    }
                  />
                </div>

                <Promocode className="h-fit" />

                <div className="flex gap-5 flex-col lg:flex-row">
                  <Language className="w-full " />
                  <Support className="w-full" />
                </div>
              </div>
            </div>
          )}

          {/* right */}

          {(!isMobile || (isMobile && activeTab === 'game')) && (
            <div
              ref={containerRightRef}
              className={cn(
                'relative flex flex-col gap-5 rounded-[20px] w-full lg:w-[860px] lg:min-w-[860px] p-0 lg:p-5 z-10',
                !isMobile &&
                  layoutActive == 'right' &&
                  'border border-solid border-[#231e2b]'
              )}
              style={{
                boxShadow:
                  layoutActive == 'right'
                    ? '14px 0px 80px 0px rgba(0, 0, 0, 0.64)'
                    : '',
                backdropFilter: layoutActive == 'right' ? 'blur(10px)' : ''
              }}
            >
              <Banner
                onClick={() => {
                  navigate('/bonus/detail/general')
                }}
                className=""
                listData={listBannerRight}
              />

              <div className="flex gap-5 flex-col translate-y-[-15px]">
                {type !== '' ? (
                  <div className="w-full flex justify-between items-center">
                    {getLabel}
                    {type !== 'gamesoft' && (
                      <CustomButton
                        onClick={() => {
                          if (type === 'liveGame') {
                            setType('category')
                          } else {
                            setSearchParams({})
                            setType('')
                          }
                        }}
                        label={t('home.back')}
                        variant="muted"
                        className="w-fit gap-2.5"
                        prefixIcon={<ArrowLeft />}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    {!isMobile ? (
                      <div className="rounded-[20px] flex gap-5 flex-row justify-between items-center">
                        {typeLists?.map((item, index) => (
                          <Popular
                            key={index}
                            css={stylesProvider}
                            imgPosition={
                              <img
                                src={lightProvider}
                                className="absolute bottom-0 right-0 z-0 w-full"
                              />
                            }
                            className="w-[260px] h-[140px] gap-5"
                            iconLeft={item.iconLeft}
                            title={item.title}
                            des={item.des}
                            iconRight={
                              <IconBtn
                                icon={<ArrowRightIcon />}
                                onClick={() => {
                                  updateQueryParam('type', item?.type)
                                  setType(item?.type)
                                }}
                              />
                            }
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-[20px] flex gap-5 w-full flex-col">
                        <div className="w-full flex gap-5 flex-row">
                          {typeLists.slice(0, 2)?.map((item, index) => (
                            <Popular
                              isShowRightIcon={false}
                              onClick={() => {
                                setType(item?.type)
                              }}
                              key={index}
                              css={stylesProvider}
                              imgPosition={
                                <img
                                  src={lightProvider}
                                  className="absolute bottom-0 right-0 z-0 w-full"
                                />
                              }
                              className="h-[134px] gap-5"
                              iconLeft={item.iconLeft}
                              title={item.title}
                              des={item.des}
                              iconRight={
                                <IconBtn
                                  icon={<ArrowRightIcon />}
                                  onClick={() => setType(item?.type)}
                                />
                              }
                            />
                          ))}
                        </div>
                        <div className="w-full ">
                          {typeLists.slice(2, 3)?.map((item, index) => (
                            <Popular
                              onClick={() => {
                                setType(item?.type)
                              }}
                              key={index}
                              css={stylesProvider}
                              imgPosition={
                                <img
                                  src={lightProvider}
                                  className="absolute bottom-0 right-0 z-0 w-full"
                                />
                              }
                              className="w-full h-[134px]  gap-5"
                              iconLeft={item.iconLeft}
                              title={item.title}
                              des={item.des}
                              iconRight={
                                <IconBtn
                                  icon={<ArrowRightIcon />}
                                  onClick={() => setType(item?.type)}
                                />
                              }
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {type == '' && (
                  <>
                    <PopularGame className="w-full" />
                    {/* NOTE: POPULAR_GAMES */}
                    <div className="w-full flex gap-5 flex-col lg:flex-row">
                      <Piggy
                        randomGame={popularGames?.[0] || ({} as Game)}
                        className="w-full max-w-[610px]"
                      />

                      {!isMobile && (
                        <>
                          {!!popularGames?.length &&
                            [...popularGames].slice(1, 2).map((game) => {
                              return (
                                <ImageCard
                                  key={game?.id}
                                  src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                                  onClick={() =>
                                    navigate(
                                      `/game-inside/${game?.provider}/${game?.id}`
                                    )
                                  }
                                />
                              )
                            })}
                        </>
                      )}
                    </div>
                    <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
                      {!!popularGames?.length &&
                        [...popularGames]
                          .slice(2, isMobile ? 11 : 6)
                          .map((game) => {
                            return (
                              <ImageCard
                                key={game?.id}
                                src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                                onClick={() =>
                                  navigate(
                                    `/game-inside/${game?.provider}/${game?.id}`
                                  )
                                }
                              />
                            )
                          })}
                    </div>
                    {/* Provider */}
                    <ProviderUI
                      gameProviders={gameProviders}
                      setType={setType}
                      updateQueryParam={updateQueryParam}
                      lightProvidertext={lightProvidertext}
                      stylesProvidertext={stylesProvidertext}
                    />
                    {/* New Game */}
                    <NewGame className="w-full" />
                    <div className="w-full flex gap-5">
                      <Piggy
                        randomGame={newgame1!}
                        className="w-full max-w-[610px]"
                      />

                      {!isMobile && (
                        <>
                          {!!newgame2?.length &&
                            [...newgame2].slice(0, 1).map((game) => {
                              return (
                                <ImageCard
                                  key={game?.id}
                                  src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                                  onClick={() =>
                                    navigate(
                                      `/game-inside/${game?.provider}/${game?.id}`
                                    )
                                  }
                                />
                              )
                            })}
                        </>
                      )}
                    </div>
                    <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
                      {!!newgame3?.length &&
                        newgame3.slice(1, isMobile ? 10 : 5).map((game) => {
                          return (
                            <ImageCard
                              key={game?.id}
                              src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                              onClick={() =>
                                navigate(
                                  `/game-inside/${game?.provider}/${game?.id}`
                                )
                              }
                            />
                          )
                        })}
                    </div>
                    <div className="text-white text-2xl font-black">
                      {t('home.maybeYou')}
                    </div>
                  </>
                )}

                {type == 'provider' && <ProviderTab />}
                {type == 'category' && <CategoryTab />}
                {type == 'search' && <SearchTab />}
                {type == 'gamesoft' && <GameSoftTab />}
                {type == 'liveGame' && <LiveGameTab />}
                {type == 'favorite' && <FavoriteTab />}

                <div className="rounded-[20px] flex flex-col lg:flex-row gap-5 justify-between items-center">
                  {typeListsBottom?.map((item, index) => (
                    <Popular
                      key={index}
                      css={stylesMore}
                      className="w-full h-[140px]"
                      iconLeft={item.iconLeft}
                      title={item.title}
                      des={item.des}
                      iconRight={
                        <IconBtn
                          icon={<ArrowRightIcon />}
                          onClick={() => {
                            setType(
                              item.type as 'provider' | 'category' | 'search'
                            )
                          }}
                        />
                      }
                      imgPosition={
                        <img
                          src={item.img}
                          className="absolute bottom-0 right-0"
                        />
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <OnBoarding />
    </>
  )
}

// styles chung

const stylesWallet = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylesProvider = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

// right

const stylesMore = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylesProvidertext = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const stylesOutShop = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
