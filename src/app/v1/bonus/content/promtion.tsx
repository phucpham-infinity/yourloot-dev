// import NewGameProfile from '@/app/profile/ui/NewGameProfile'
import ArrowRightIcon from '@/assets/icons/arrowRight'
import CategoryIcon from '@/assets/icons/home/category'
// import FindnewGameIcon from '@/assets/icons/profile/bg/find-new-game'
// import casinoLight from '@/assets/images/profile/casino.svg'
// import lightTab from '@/assets/icons/bonus/light-tab.svg'
import lobbyLight from '@/assets/images/profile/lobby.svg'
// import tabGame3 from '@/assets/icons/bonus/tab-game.svg'
import IconBtn from '@/components/common/icon-button'
import Piggy from '@/components/common/Piggy'
import Popular from '@/components/common/Popular'
import Promocode from '@/components/common/Promocode'
// import SectionHeader from '@/components/common/section-header'
import ImageCard from '@/components/common/ui/Image'
import { cn, css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'
import { useGamesStore } from '@/store/slices/games'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AvailableGame from '../components/AvailableGame'
import { useHomeStore } from '@/store/slices/home'
// import ClickIcon from '@/assets/icons/bonus/click'
// import SearchIcon from '@/assets/icons/home/search'
// import lightSearch from '@/assets/icons/bonus/light-tab-game.svg'
// import lightSearch1 from '@/assets/icons/bonus/light-tab-game1.svg'

const Promotion = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { allGames } = useGamesStore()
  const { setType, setActiveTab, setLayoutActive } = useHomeStore()

  const games = [
    {
      title: t('bonus.lobby.title'),
      des: t('bonus.lobby.description'),
      iconLeft: <CategoryIcon className="absolute top-8 left-7" />,
      imgPosition: <img src={lobbyLight} className="absolute bottom-0 left-0" />
    }
  ]

  // const games2 = [
  //   {
  //     title: t('bonus.promotion.tabgameBox'),
  //     des: t('bonus.promotion.tabgameDes'),
  //     iconLeft: <ClickIcon className="absolute top-8 left-7" />,
  //     imgPosition: (
  //       <img src={lightSearch1} className="absolute bottom-0 right-0 w-full" />
  //     )
  //   },
  //   {
  //     title: t('bonus.promotion.newForYou'),
  //     des: t('bonus.promotion.newForYouDes'),
  //     iconLeft: <SearchIcon className="absolute top-8 left-7" />,
  //     imgPosition: (
  //       <img src={lightSearch} className="absolute top-0 right-0 w-full" />
  //     )
  //   }
  // ]

  const popuular1 = allGames?.slice(0, 1)[0]
  const popuular2 = allGames?.slice(1, 2)
  const popuular3 = allGames?.slice(2, allGames?.length - 1)

  return (
    <div className="w-full h-full flex flex-col gap-5">
      {/* <NewGameProfile
        title={t('bonus.promotion.tabgame')}
        des={t('bonus.promotion.checkout')}
        labelBtn={t('bonus.promotion.checkoutBtn')}
        srcIcon={tabGame3}
        className="rounded-[20px] px-5 py-10 lg:p-10 h-[220px]"
        onClick={() => {}}
        imgPosition={
          <img
            src={casinoLight}
            className="absolute top-0 right-0 w-full h-full z-[1]"
          />
        }
      />
      <NewGameProfile
        title={t('bonus.promotion.casino')}
        des={t('bonus.promotion.checkoutCasino')}
        labelBtn={t('bonus.promotion.checkoutBtnCasino')}
        srcIcon={tabGame3}
        className="rounded-[20px] px-5 py-10 lg:p-10"
        onClick={() => {}}
        imgPosition={
          <img
            src={lightTab}
            className="absolute top-0 right-0 w-full h-full z-[1]"
          />
        }
      /> */}

      <div className="gap-5 w-full flex flex-col lg:flex-row">
        <Promocode className="w-full lg:w-[60%] h-[220px] lg:h-[224px]" />
        {games?.map((item, index) => (
          <Popular
            key={index}
            className={cn(
              'w-full lg:w-[40%]  gap-10 p-10',
              'h-[220px] lg:h-[224px]'
            )}
            iconLeft={item?.iconLeft}
            title={item?.title}
            des={item?.des}
            iconRight={<IconBtn icon={<ArrowRightIcon />} onClick={() => {}} />}
            css={stylePopular2}
            imgPosition={item?.imgPosition}
            onClick={() => {
              setType('gamesoft')
              navigate('/')
              if (isMobile) {
                setActiveTab('game')
              } else {
                setLayoutActive('right')
              }
            }}
          />
        ))}
      </div>

      {/* <div className="gap-5 w-full flex flex-col lg:flex-row">
        {games2?.map((item, index) => (
          <Popular
            key={index}
            className={cn('w-full lg:w-1/2 h-[220px] gap-10 p-10')}
            iconLeft={item?.iconLeft}
            title={item?.title}
            des={item?.des}
            iconRight={<IconBtn icon={<ArrowRightIcon />} onClick={() => {}} />}
            css={stylePopular2}
            imgPosition={item?.imgPosition}
          />
        ))}
      </div> */}

      <AvailableGame className="w-full" />

      <div className="w-full flex gap-5 flex-col lg:flex-row">
        <Piggy randomGame={popuular1!} className="w-full max-w-[610px]" />

        {!isMobile && (
          <>
            {!!popuular2?.length &&
              popuular2.map((game) => {
                return (
                  <ImageCard
                    key={game?.id}
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() =>
                      navigate(`/game-inside/${game?.provider}/${game?.id}`)
                    }
                  />
                )
              })}
          </>
        )}
      </div>

      <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
        {!!popuular3?.length &&
          popuular3?.map((game) => {
            return (
              <ImageCard
                key={game?.id}
                src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                onClick={() =>
                  navigate(`/game-inside/${game?.provider}/${game?.id}`)
                }
              />
            )
          })}
      </div>

      {/* <SectionHeader
        title={t('bonus.promotion.otherGame')}
        icon={<FindnewGameIcon className="w-[40px] h-[40px]" />}
      />

      <div className="gap-5 w-full flex flex-col lg:flex-row">
        <Promocode className="w-full lg:w-[60%] h-[220px] lg:h-[224px]" />
        {games?.map((item, index) => (
          <Popular
            key={index}
            className={cn(
              'w-full lg:w-[40%]  gap-10 p-10',
              'h-[220px] lg:h-[224px]'
            )}
            iconLeft={item?.iconLeft}
            title={item?.title}
            des={item?.des}
            iconRight={
              <IconBtn
                icon={<ArrowRightIcon />}
                onClick={() => {
                  setType('gamesoft')
                  navigate('/')
                }}
              />
            }
            css={stylePopular2}
            imgPosition={item?.imgPosition}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Promotion

const stylePopular2 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
