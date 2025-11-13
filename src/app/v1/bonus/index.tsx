import ArrowRightIcon from '@/assets/icons/arrowRight'
import CategoryIcon from '@/assets/icons/home/category'
import FindnewGameIcon from '@/assets/icons/profile/bg/find-new-game'
import banner from '@/assets/images/bonus/banner-all/yourloot-banner-promotions-desktop-wb03.png'
import lobbyLight from '@/assets/images/profile/lobby.svg'
import BonusImg from '@/assets/images/promocode/bonus.svg'
import AvailableImg from '@/assets/images/promocode/checkmark.svg'
import LoyaltyImg from '@/assets/images/promocode/loyaltyBig.svg'
import PromotionImg from '@/assets/images/promocode/promotionBig.svg'
import TrophyImg from '@/assets/images/promocode/trophyBig.svg'
import CustomButton from '@/components/common/custom-button'
import IconBtn from '@/components/common/icon-button'
import Popular from '@/components/common/Popular'
import Promocode from '@/components/common/Promocode'
import SectionHeader from '@/components/common/section-header'
import { cn, css } from '@/lib/utils'
import { userController, UserEventType } from '@/services/controller'
import { useHomeStore } from '@/store/slices/home'
import { useUserEventStore } from '@/store/slices/user-event'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { TabsCommon } from '@/components/common/ui/TabCommon'
import { ActiveTabType, useBonusStore } from '@/store/slices/bonus'

// image
import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import AllIcon from '@/assets/icons/bonus/all.svg'
import AvailableIcon from '@/assets/icons/bonus/checkmark.svg'
import LoyaltyIcon from '@/assets/icons/bonus/loyalty.svg'
import PromotionIcon from '@/assets/icons/bonus/sale.svg'
import TournamentIcon from '@/assets/icons/bonus/trophy.svg'
import CustomTabMobile from './components/CustomTabMobile'
import PromotionsMobileCarousel from './components/PromotionsCarouselMobile'
// import PromotionAvailable from './content/promtionAvailable'
// import Tournaments from './content/tournaments'
import PageInDev from '../page-in-dev'
import CardContenBonus from './components/CardContentBonus'

const Bonus = () => {
  const navigate = useNavigate()
  const {
    setType,
    setLayoutActive,
    setActiveTab: setActiveTabHome
  } = useHomeStore()
  const { t } = useTranslation()

  const { activeTab, setActiveTab } = useBonusStore()
  const [activeTabIdx, setActiveTabIdx] = useState(0)

  const { setIsDoneBonusPage, isDoneBonusPage } = useUserEventStore()
  const { useUserEvent } = userController()
  const { mutate: userEvent } = useUserEvent()

  useEffect(() => {
    if (!isDoneBonusPage) {
      userEvent(
        {
          userEvent: UserEventType.FIRST_VISIT_BONUS_SECTION
        },
        {
          onSuccess: () => {
            setIsDoneBonusPage(true)
          }
        }
      )
    }
  }, [isDoneBonusPage, setIsDoneBonusPage, userEvent])

  const games = [
    {
      title: t('bonus.lobby.title'),
      des: t('bonus.lobby.description'),
      iconLeft: <CategoryIcon className="absolute top-8 left-7" />,
      imgPosition: <img src={lobbyLight} className="absolute bottom-0 left-0" />
    }
  ]

  useEffect(() => {
    setActiveTab(listTabs[activeTabIdx]?.value as ActiveTabType)
  }, [activeTabIdx, setActiveTab])

  return (
    <div className="flex gap-5 flex-col w-full max-w-[820px] mx-auto h-full">
      <div
        className={cn('h-10 w-full justify-between items-center inline-flex')}
      >
        <div
          className="grow shrink basis-0 h-10 justify-start items-center gap-2.5 flex"
          style={{
            transform:
              activeTab === 'all' || activeTab === 'available'
                ? 'translateX(-10px)'
                : 'translateX(0)'
          }}
        >
          <img src={tabIcons[activeTab] || BonusImg} alt="Logo" />
          <div className="text-white text-[22px] font-black">
            {t(`bonus.title.${activeTab}`)}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 ">
          <CustomButton
            label={t('bonus.back')}
            variant="muted"
            className="w-fit h-[38px] text-xs font-medium !py-4 !bg-[#0a090f]"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      <div className="flex gap-2.5 w-full justify-between items-center">
        {!isMobile && (
          <IconBtn
            icon={<ArrowLeftIcon />}
            onClick={() => {
              if (activeTabIdx > 0) {
                setActiveTabIdx((prev) => prev - 1)
              }
            }}
          />
        )}

        {isMobile ? (
          <CustomTabMobile activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <TabsCommon
            setActiveTabIdx={setActiveTabIdx}
            listTabs={listTabs}
            setTab={setActiveTab}
            tab={activeTab}
            classNameTrigger="w-[120px]"
          />
        )}
        {!isMobile && (
          <IconBtn
            icon={<ArrowRightIcon />}
            onClick={() => {
              if (activeTabIdx < listTabs.length - 1) {
                setActiveTabIdx((prev) => prev + 1)
              }
            }}
          />
        )}
      </div>

      {activeTab === 'available' && <PageInDev />}
      {activeTab === 'tournament' && <PageInDev />}
      {activeTab === 'loyalty' && <PageInDev />}
      {activeTab === 'promotion' && <PageInDev />}

      {activeTab === 'all' && (
        <>
          {isMobile ? (
            <div className="w-full relative h-[181px] rounded-[20px] overflow-hidden">
              <BannerContent>
                <BannerTitle>
                  {/* <TitleText>{t('bonus.detail.get')}</TitleText> */}
                  <GradientText>$1 500</GradientText>
                </BannerTitle>
                <SubtitleText>{t('bonus.detail.firstDeposit')}</SubtitleText>
                <ButtonContainer>
                  <CustomButton
                    label={t('bonus.banner.readMore')}
                    variant="default"
                    className="w-fit"
                    onClick={() => {
                      navigate('/bonus/detail/general')
                    }}
                  />
                </ButtonContainer>
              </BannerContent>
              <img
                src="/images/promotions/banner-carousel-mobile-ftdbonus.png"
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <BannerContainer>
              <BannerContent>
                <BannerTitle>
                  {/* <TitleText>{t('bonus.detail.get')}</TitleText> */}
                  <GradientText>$1 500</GradientText>
                </BannerTitle>
                <SubtitleText>{t('bonus.detail.firstDeposit')}</SubtitleText>
                <ButtonContainer>
                  <CustomButton
                    label={t('bonus.banner.readMore')}
                    variant="default"
                    className="w-fit"
                    onClick={() => {
                      navigate('/bonus/detail/general')
                    }}
                  />
                </ButtonContainer>
              </BannerContent>
              <img
                src="/images/promotions/banner-carousel-desktop-ftdbonus.png"
                className="object-cover w-full h-full"
              />
            </BannerContainer>
          )}

          <div
            className={cn(
              'h-10 w-full justify-between items-center inline-flex'
            )}
          >
            <div className="grow shrink basis-0 h-10 justify-start items-center gap-2.5 flex">
              <img src={BonusImg} alt="Logo" className="w-[53px]" />
              <div className="text-white text-[22px] font-black">
                {isMobile ? t('bonus.chooseOne') : t('bonus.allPromotions')}
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-3 ">
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
            </div> */}
          </div>

          <div className="grid w-full h-full grid-cols-1 gap-5 lg:grid-cols-2">
            {isMobile
              ? bannerBonus?.slice(0, 1)?.map((_item, index) => (
                  <PromotionsMobileCarousel
                    onReadMore={() => {
                      navigate('/bonus/detail/general')
                    }}
                    key={index}
                  />
                ))
              : bannerBonus?.slice(0, 1)?.map((_item, index) => (
                  <CardContenBonus
                    className="w-full "
                    key={index}
                    title="$ 1 500"
                    description={t('bonus.detail.firstDeposit')}
                    buttonLabel={t('bonus.banner.readMore')}
                    onClick={() => {
                      navigate('/bonus/detail/general')
                    }}
                    buttonClassName="w-[120px] py-4"
                    image={banner}
                  />
                ))}
          </div>

          <SectionHeader
            title={t('bonus.otherPromotions')}
            icon={<FindnewGameIcon className="w-[40px] h-[40px]" />}
          />

          <div className="flex flex-col w-full gap-5 lg:flex-row">
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
                      if (isMobile) {
                        setActiveTabHome('game')
                      } else {
                        setLayoutActive('right')
                      }
                    }}
                  />
                }
                css={stylePopular2}
                imgPosition={item?.imgPosition}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Bonus

const listTabs = [
  {
    label: 'All',
    value: 'all',
    icon: <img src={AllIcon} alt="Logo" className="w-[12px]" />,
    idx: 0
  },
  {
    label: 'Available',
    value: 'available',
    icon: <img src={AvailableIcon} alt="Logo" className="w-[12px]" />,
    idx: 1
  },
  {
    label: 'Tournament',
    value: 'tournament',
    icon: <img src={TournamentIcon} alt="Logo" className="w-[12px]" />,
    idx: 2
  },
  {
    label: 'Loyalty',
    value: 'loyalty',
    icon: <img src={LoyaltyIcon} alt="Logo" className="w-[12px]" />,
    idx: 3
  },
  {
    label: 'Promotion',
    value: 'promotion',
    icon: <img src={PromotionIcon} alt="Logo" className="w-[12px]" />,
    idx: 4
  }
]

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

const tabIcons: Record<string, string> = {
  all: BonusImg,
  available: AvailableImg,
  loyalty: LoyaltyImg,
  promotion: PromotionImg,
  tournament: TrophyImg
}

const stylePopular2 = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`

export const BannerContainer = styled.div`
  width: 100%;
  height: 274px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`

export const BannerContent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${isMobile ? 'left: 20px;' : 'left: 40px;'}
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const BannerTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

export const TitleText = styled.span`
  ${isMobile ? 'font-size: 15px;' : 'font-size: 40px;'}
  font-weight: 800;
  line-height: 80%;
  text-shadow: 0px 5.583px 44.662px rgba(255, 255, 255, 0.5);
  color: white;
  width: 80%;
`

export const GradientText = styled(TitleText)`
  background: -webkit-linear-gradient(
    135deg,
    #bcc9f9 0%,
    #e0bfef 50%,
    #f1d7d7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export const SubtitleText = styled.div`
  ${isMobile
    ? 'font-size: 16px;  width: 60%;'
    : 'font-size: 32px;  width: 100%;'}
  font-weight: 800;
  line-height: 100%;
  text-shadow: 0px 5.289px 42.309px rgba(255, 255, 255, 0.5);
  color: white;
  margin-top: 8px;
`

const ButtonContainer = styled.div`
  margin-top: 16px;
`
