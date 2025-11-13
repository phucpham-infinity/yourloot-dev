import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import styled from '@emotion/styled'

interface CardContentProps {
  title: string
  description: string
  buttonLabel: string
  buttonClassName: string
  image: string
  onClick?: () => void
  className?: string
}

const CardContenBonus = ({
  title,
  description,
  buttonLabel,
  buttonClassName,
  image,
  className,
  onClick = () => {}
}: CardContentProps) => {
  return (
    <div
      className={cn(
        `relative border border-[#4d4767] overflow-hidden bg-home-banner rounded-[20px] flex items-center py-[56px] px-10 justify-start h-full w-full `,
        className
      )}
    >
      <div className="relative z-[2] flex-col justify-start items-start gap-2 inline-flex w-8/10">
        <GradientText>{title}</GradientText>
        <SubtitleText>{description}</SubtitleText>
        <CustomButton
          onClick={onClick}
          label={buttonLabel}
          className={buttonClassName}
        />
      </div>

      <img className="absolute w-full h-full right-0 z-[1] " src={image} />
    </div>
  )
}

export default CardContenBonus
export const TitleText = styled.span`
  font-size: 20px;
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
  font-size: 16px;
  font-weight: 800;
  line-height: 100%;
  text-shadow: 0px 5.289px 42.309px rgba(255, 255, 255, 0.5);
  color: white;
  margin-top: 8px;
`
