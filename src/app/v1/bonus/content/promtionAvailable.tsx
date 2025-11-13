import ArrowRightIcon from '@/assets/icons/arrowRight'
import banner from '@/assets/icons/home/bg/banner-header.svg'
import CategoryIcon from '@/assets/icons/home/category'
import FindnewGameIcon from '@/assets/icons/profile/bg/find-new-game'
import lobbyLight from '@/assets/images/profile/lobby.svg'
import BonusImg from '@/assets/images/promocode/bonus.svg'
import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import Popular from '@/components/common/Popular'
import Promocode from '@/components/common/Promocode'
import SectionHeader from '@/components/common/section-header'
import { cn, css } from '@/lib/utils'
import { useHomeStore } from '@/store/slices/home'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CardContent from '../components/CardContent'
import PromotionsCarousel from '../components/PromotionsCarousel'
import {
  default as PromotionsCarouselMobile,
  default as PromotionsMobileCarousel
} from '../components/PromotionsCarouselMobile'

const PromotionAvailable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { setType } = useHomeStore()

  const games = [
    {
      title: t('bonus.lobby.title'),
      des: t('bonus.lobby.description'),
      iconLeft: <CategoryIcon className="absolute top-8 left-7" />,
      imgPosition: <img src={lobbyLight} className="absolute bottom-0 left-0" />
    }
  ]

  return (
    <>
      <div className="grow shrink basis-0 h-10 justify-start items-center gap-2.5 flex">
        <img src={BonusImg} alt="Logo" />
        <div className="text-white text-[22px] font-black">
          {t(`bonus.title.currentBonus`)}
        </div>
      </div>
      {isMobile ? (
        <PromotionsCarouselMobile
          onReadMore={() => {
            navigate('/bonus/detail/general')
          }}
          key={-1}
        />
      ) : (
        <div className="w-[849px] translate-x-[-30px]">
          <PromotionsCarousel
            onReadMore={() => {
              navigate('/bonus/detail/general')
            }}
          />
        </div>
      )}

      <div
        className={cn('h-10 w-full justify-between items-center inline-flex')}
      >
        <div className="grow shrink basis-0 h-10 justify-start items-center gap-2.5 flex">
          <img src={BonusImg} alt="Logo" className="w-[53px]" />
          <div className="text-white text-[22px] font-black">
            {isMobile ? t('bonus.chooseOne') : t('bonus.allPromotions')}
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 ">
          {!isMobile ? (
            <CustomButton
              label={t('bonus.seeAll')}
              variant="default"
              className="w-fit h-[38px] text-xs font-medium !py-4 !bg-[#0a090f]"
              onClick={() => navigate(-1)}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full h-full">
        {isMobile
          ? bannerBonus?.map((_item, index) => (
              <PromotionsMobileCarousel
                onReadMore={() => {
                  navigate('/bonus/detail/general')
                }}
                key={index}
              />
            ))
          : bannerBonus?.map((_item, index) => (
              <CardContent
                key={index}
                title={t('bonus.banner.title')}
                description={t('bonus.banner.description')}
                buttonLabel={t('bonus.banner.readMore')}
                onClick={() => {}}
                buttonClassName="w-[120px] py-4"
                image={banner}
              />
            ))}
        {isMobile ? (
          <CustomButton
            label={t('bonus.seeAll')}
            variant="default"
            className="w-full h-[38px] text-xs font-medium !py-4 !bg-[#0a090f]"
            onClick={() => navigate(-1)}
          />
        ) : (
          <div></div>
        )}
      </div>

      <SectionHeader
        title={t('bonus.otherPromotions')}
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
      </div>
    </>
  )
}

export default PromotionAvailable

const bannerBonus = [
  {
    title: 'Banner Header',
    description: 'Banner description',
    buttonLabel: 'Read more'
  },
  {
    title: 'Banner Header',
    description: 'Banner description',
    buttonLabel: 'Read more'
  },
  {
    title: 'Banner Header',
    description: 'Banner description',
    buttonLabel: 'Read more'
  },
  {
    title: 'Banner Header',
    description: 'Banner description',
    buttonLabel: 'Read more'
  }
]

const stylePopular2 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
