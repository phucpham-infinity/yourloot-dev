import { cn, css, DOMAIN_IMAGE_LOOT } from '@/lib/utils'

import ArrowRightIcon from '@/assets/icons/arrowRight'
import CategoryIcon from '@/assets/icons/home/category'
import IconNewgames from '@/assets/images/bonus/newgames.svg'
import IconPopulargames from '@/assets/images/bonus/populargames.svg'
import lobbyLight from '@/assets/images/profile/lobby.svg'
import GameTitleHeader from '@/components/common/GameTitleHeader'
import IconBtn from '@/components/common/icon-button'
import Popular from '@/components/common/Popular'
import Promocode from '@/components/common/Promocode'
import IconSvg from '@/components/common/ui/IconSvg'

import Piggy from '@/components/common/Piggy'
import ImageCard from '@/components/common/ui/Image'
import { useHomeStore } from '@/store/slices/home'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { gameController } from '@/services/controller/games'
import { useMemo } from 'react'

export default function BonusFooter() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setType, setActiveTab, setLayoutActive } = useHomeStore()
  const { useGetBonusGames } = gameController()

  const { data: bonusGames } = useGetBonusGames({
    size: 33
  })

  const gameBonusList = useMemo(() => {
    return bonusGames?.pages.flatMap((page) => page.content?.content) || []
  }, [bonusGames])

  const games = [
    {
      title: t('bonus.lobby.title'),
      des: t('bonus.lobby.description'),
      iconLeft: <CategoryIcon className="absolute top-8 left-7" />,
      imgPosition: <img src={lobbyLight} className="absolute bottom-0 left-0" />
    }
  ]

  return (
    <div className="flex flex-col gap-10 pt-10">
      <div className="w-full mx-auto flex flex-col">
        <GameTitleHeader
          icon={
            <IconSvg width={'40px'} height={'40px'} icon={IconPopulargames} />
          }
          hiddenTitle={false}
          hiddenIcon={false}
          title={t('bonus.promotion.availableGames')}
          onClick={() => {
            setType('liveGame')
            navigate(
              '/?type=category&category=bonus&titleCategory=Games+for+Bonus'
            )
            if (isMobile) {
              setActiveTab('game')
            } else {
              setLayoutActive('right')
            }
            window.scrollTo(0, 0)
          }}
        />
        <div className="w-full flex gap-5 mt-5">
          <Piggy
            randomGame={gameBonusList?.slice(0, 1)[0] as any}
            className="w-full max-w-[610px]"
          />

          {!isMobile && (
            <>
              {!!gameBonusList?.slice(1, isMobile ? 10 : 2)?.length &&
                [...(gameBonusList?.slice(1, isMobile ? 10 : 2) || [])].map(
                  (game) => {
                    return (
                      <ImageCard
                        key={game?.id}
                        src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                        onClick={() =>
                          navigate(`/game-inside/${game?.provider}/${game?.id}`)
                        }
                      />
                    )
                  }
                )}
            </>
          )}
        </div>

        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {!!gameBonusList?.length &&
            [...(gameBonusList?.slice(5, isMobile ? 14 : 9) || [])].map(
              (game) => {
                return (
                  <ImageCard
                    className=""
                    key={game?.id}
                    src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                    onClick={() =>
                      navigate(`/game-inside/${game?.provider}/${game?.id}`)
                    }
                  />
                )
              }
            )}
        </div>
      </div>
      <div className="w-full mx-auto gap-5 flex flex-col">
        <GameTitleHeader
          hiddenTitle={false}
          hiddenIcon={false}
          icon={<IconSvg width={'40px'} height={'40px'} icon={IconNewgames} />}
          hiddenSeeAll
          title={t('bonus.promotion.otherGame')}
        />

        <div className="gap-5 w-full flex flex-col lg:flex-row mt-5">
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
                    // setType('gamesoft')
                    navigate('/')
                  }}
                />
              }
              css={stylePopular2}
              imgPosition={item?.imgPosition}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const stylePopular2 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
