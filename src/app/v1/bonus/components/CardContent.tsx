import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'

interface CardContentProps {
  title: string
  description: string
  buttonLabel: string
  buttonClassName: string
  image: string
  onClick?: () => void
  className?: string
}

const CardContent = ({
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
      <div className="relative z-[2] flex-col justify-start items-start gap-5 inline-flex w-8/10">
        <div className="text-white text-2xl leading-6 font-black">{title}</div>
        <div className="text-[#c5c0d7] text-sm leading-3.5 font-medium">
          {description}
        </div>
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

export default CardContent
