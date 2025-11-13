import lightProvidertext from '@/assets/icons/home/light/lightProviderText.svg'
import ProviderIcon from '@/assets/icons/home/provider'
import { css } from '@emotion/react'

import GameTitleHeader from '@/components/common/GameTitleHeader'
import SectionHeader from '@/components/common/section-header'
import ImageCard from '@/components/common/ui/Image'
import { useGamesStore } from '@/store'
import { useHomeStore } from '@/store/slices/home'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProviderCard from '../ProviderCard'
import { DOMAIN_IMAGE_LOOT, DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { isMobile } from 'react-device-detect'

export default function ProviderTab() {
  const { gameProviders, hacksawGames, platipusGames } = useGamesStore()
  const { setType } = useHomeStore()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const updateQueryParam = (name: string, value: string) => {
    searchParams.set(name, value)
    setSearchParams(searchParams) // updates the URL
  }

  return (
    <div css={styles} className="w-full flex flex-col gap-5">
      <GameTitleHeader
        hiddenTitle={true}
        hiddenIcon={false}
        icon={
          <img
            src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${import.meta.env.MODE === 'production' ? 'hacksaw' : 'softswiss'}.svg`}
            className="w-full h-full"
          />
        }
        onClick={() => {
          setType('gamesoft')
          updateQueryParam(
            'gamesoft',
            import.meta.env.MODE === 'production' ? 'hacksaw' : 'softswiss'
          )
          window.scrollTo(0, 0)
        }}
        title={import.meta.env.MODE === 'production' ? 'Hacksaw' : 'Softswiss'}
      />
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {!!hacksawGames?.length &&
          hacksawGames
            .slice(0, isMobile ? 9 : 4)
            .map((game, index) => (
              <ImageCard
                key={index}
                src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                onClick={() =>
                  navigate(`/game-inside/${game?.provider}/${game?.id}`)
                }
              />
            ))}
      </div>

      <GameTitleHeader
        hiddenTitle={true}
        hiddenIcon={false}
        icon={
          <img
            src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${import.meta.env.MODE === 'production' ? 'platipus' : 'acceptance'}.svg`}
            className="w-full h-full"
          />
        }
        onClick={() => {
          setType('gamesoft')
          updateQueryParam(
            'gamesoft',
            import.meta.env.MODE === 'production' ? 'platipus' : 'acceptance'
          )
          window.scrollTo(0, 0)
        }}
        title={
          import.meta.env.MODE === 'production' ? 'Platipus' : 'Acceptance'
        }
      />
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        {!!platipusGames?.length &&
          platipusGames
            .slice(0, isMobile ? 9 : 4)
            .map((game, index) => (
              <ImageCard
                key={index}
                src={`${DOMAIN_IMAGE_LOOT}/${game?.provider}/${game?.id}.png`}
                onClick={() =>
                  navigate(`/game-inside/${game?.provider}/${game?.id}`)
                }
              />
            ))}
      </div>

      <SectionHeader
        title="Popular Providers"
        icon={<ProviderIcon className="w-[60px] h-[60px]" />}
        className="gap-0"
      />

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {gameProviders?.map((item, index) => (
          <ProviderCard
            key={index}
            // icon={item.icon}
            name={item}
            className="w-full lg:w-[180px] h-[140px] lg:h-[151px]"
            css={stylesProvidertext}
            imgPosition={
              <img
                src={lightProvidertext}
                className="absolute bottom-0 right-0"
              />
            }
            onClick={() => {
              setType('gamesoft')
              updateQueryParam('gamesoft', item?.toLowerCase())
              window.scrollTo(0, 0)
            }}
          />
        ))}
      </div>
    </div>
  )
}

const stylesProvidertext = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

const styles = css`
  border-radius: 20px;
  // background: linear-gradient(
  //   180deg,
  //   rgba(64, 53, 85, 0.2) 0%,
  //   rgba(0, 0, 0, 0.1) 100%
  // );
`
