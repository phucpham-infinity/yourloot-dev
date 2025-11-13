import { BannerContainer, BannerContent } from '@/app/v1/bonus'
import { cn } from '@/lib/utils'
// import { useHomeStore } from '@/store/slices/home'
import styled from '@emotion/styled'
import { lazy } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const CustomButton = lazy(() => import('@/components/common/custom-button'))

interface BannerProfileProps {
  className?: string
  imgPosition?: React.ReactNode
}

export default function BannerProfile({
  className,
  imgPosition
}: BannerProfileProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  // const { setActiveTab, setLayoutActive, setType } = useHomeStore()
  return (
    <div
      className={cn(
        'relative overflow-hidden flex justify-between items-center border-app-default gap-[39.55px]  bg-home-banner shadow-[6px_6px_16px_0px_rgba(22,28,22,0.25)] rounded-[20px]',
        className
      )}
    >
      {imgPosition && imgPosition}

      {isMobile ? (
        <div className="w-full relative h-[181px] rounded-[20px] flex flex-col overflow-hidden">
          <BannerContent>
            <BannerTitle>
              <TitleText> {t('bonus.banner.title')}</TitleText>
            </BannerTitle>
            <SubtitleText> {t('bonus.banner.description')}</SubtitleText>
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
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <BannerContainer className="w-full">
          <BannerContent>
            <BannerTitle>
              <TitleText> {t('bonus.banner.title')}</TitleText>
            </BannerTitle>
            <SubtitleText> {t('bonus.banner.description')}</SubtitleText>

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
            className="w-full h-full object-cover"
          />
        </BannerContainer>
      )}
    </div>
  )
}

const ButtonContainer = styled.div`
  margin-top: 16px;
`

export const BannerTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 80%;
`
export const TitleText = styled.span`
  ${isMobile
    ? 'font-size: 16px;  max-width: 200px; '
    : 'font-size: 30px;  max-width: 300px; width: 100%;'}
  font-weight: 800;
  line-height: 100%;
  text-shadow: 0px 5.583px 44.662px rgba(255, 255, 255, 0.5);
  color: white;
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
    ? 'font-size: 11px; max-width: 145px; '
    : 'font-size: 15px; max-width: 300px; width: 100%;'}
  font-weight: 500;
  line-height: 100%;
  text-shadow: 0px 5.289px 42.309px rgba(255, 255, 255, 0.5);
  color: #c5c0d8;
  margin-top: 8px;
`
