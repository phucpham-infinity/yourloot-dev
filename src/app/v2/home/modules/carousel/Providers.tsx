import ProviderIconV2 from '@/assets/icons/home/providerV2'
import loginIcon from '@/assets/images/login-icon.svg'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import { useIsMobile } from '@/hooks/use-mobile'
import { DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller/games'
import { clsx } from 'clsx'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import TitleV2 from '@/components/v2/title-v2'

const ProvidersCarousel = memo(() => {
  const { useGetGameProviders } = gameController()
  const { data: dataGameProviders, isPending: isLoadingGameProviders } =
    useGetGameProviders()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const listProviders = useMemo(() => {
    return [...(dataGameProviders?.content?.providers || [])]
  }, [dataGameProviders])

  const handleNavigate = (provider: string) => {
    navigate(`/game-provider/${provider}?title=${provider}`)
  }

  if (!isLoadingGameProviders && listProviders?.length === 0) return null

  const renderLoadingItems = () => {
    return Array.from({ length: 20 }).map((_, idx) => (
      <div
        key={idx}
        className={clsx(
          'bg-gray-50 rounded-lg animate-pulse',
          isMobile
            ? 'flex min-w-[93px] w-[93px] h-[78px] gap-2 p-3 rounded-[10px]'
            : 'flex-shrink-0 min-w-[93px] w-[93px] h-[78px] gap-2 p-3 rounded-[10px]'
        )}
      />
    ))
  }

  const renderProviderItems = () => {
    if (isLoadingGameProviders) {
      return renderLoadingItems()
    }

    return listProviders?.map((provider, index) => (
      <div
        onClick={() => handleNavigate(provider)}
        key={index}
        className="flex cursor-pointer gap-1 flex-col p-3 bg-[#191524] h-[78px] min-w-[93px] w-full md:min-w-[138px] border-solid rounded-[10px] items-center justify-center"
      >
        <div className="w-[50px] h-[30px]">
          <img
            onError={(e) => {
              e.currentTarget.src = loginIcon
            }}
            className="w-full h-full object-contain"
            src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${provider}.svg`}
            alt="provider-card"
          />
        </div>
        <div className="text-[#EAE3FF] text-[14px] font-medium whitespace-nowrap max-w-[69px] truncate">
          {provider}
        </div>
      </div>
    ))
  }

  const renderMobileView = () => (
    <div className="scroll-bar-yloot flex gap-2 overflow-x-auto">
      {renderProviderItems()}
    </div>
  )

  const renderDesktopView = () => (
    <Carousel
      opts={{
        align: 'start',
        loop: false
      }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <TitleV2
          onClick={() => {}}
          hiddenIcon
          className="gap-1"
          title={t('home.providers', 'Providers')}
          icon={<ProviderIconV2 className="w-6 h-6" />}
        />
      </div>
      <CarouselContent className="flex gap-2 !ml-0 pt-2" style={{ gap: '8px' }}>
        {isLoadingGameProviders
          ? renderLoadingItems()
          : listProviders?.map((provider, index) => (
              <div
                key={index}
                className="flex-shrink-0 transition-transform duration-300 hover:-translate-y-2"
              >
                <div
                  onClick={() => handleNavigate(provider)}
                  className="flex cursor-pointer gap-1 flex-col p-3 bg-[#191524] h-[78px] min-w-[93px] w-full md:min-w-[138px] border-solid rounded-[10px] items-center justify-center"
                >
                  <div className="w-[50px] h-[30px]">
                    <img
                      onError={(e) => {
                        e.currentTarget.src = loginIcon
                      }}
                      className="w-full h-full object-contain"
                      src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${provider}.svg`}
                      alt="provider-card"
                    />
                  </div>
                  <div className="text-[#EAE3FF] text-[14px] font-medium whitespace-nowrap max-w-[114px] truncate">
                    {provider}
                  </div>
                </div>
              </div>
            ))}
      </CarouselContent>
    </Carousel>
  )

  return (
    <div id="providers" className="flex flex-col gap-4">
      {isMobile ? (
        <>
          <TitleV2
            onClick={() => {}}
            hiddenIcon
            className="gap-1"
            title={t('home.providers', 'Providers')}
            icon={<ProviderIconV2 className="w-6 h-6" />}
          />
          {renderMobileView()}
        </>
      ) : (
        renderDesktopView()
      )}
    </div>
  )
})

export default ProvidersCarousel
