import CustomButton from '@/components/common/custom-button'
import { cn, DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ProviderCardProps {
  icon?: React.ReactNode
  name?: string
  className?: string
  css?: any
  imgPosition?: React.ReactNode
  onClick?: () => void
}

export default function ProviderCard({
  icon,
  name,
  className,
  css,
  imgPosition,
  onClick = () => {}
}: ProviderCardProps) {
  const { t } = useTranslation()
  const [isError, setIsError] = useState(false)

  return (
    <div
      css={css}
      className={cn(
        'relative overflow-hidden w-full h-full p-5 bg-[#362c5a] rounded-[20px] border-app-default flex-col flex justify-between items-center',
        className
      )}
    >
      {imgPosition && imgPosition}
      {icon && icon}

      {!isError ? (
        <img
          onError={() => {
            setIsError(true)
          }}
          className="w-[120px] h-full max-h-[50px]"
          src={`${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers/white/${name}.svg`}
          alt="provider-card"
        />
      ) : (
        <div className="text-white text-2xl font-black capitalize">{name}</div>
      )}
      <CustomButton
        label={t('home.seeAllGames')}
        className="whitespace-nowrap w-fit"
        onClick={onClick}
      />
    </div>
  )
}
