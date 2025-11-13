import { cryptoCurrencyNetworkKey } from '@/constants'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { cssForCard } from '../common'
import ArrowLeft from "@/assets/icons/v2/ArrowLeft.tsx";
import { useRef } from 'react'

interface TextWithSlideOnOverflowProps {
  text: string
  className?: string
}

function TextWithSlideOnOverflow({ text, className = '' }: TextWithSlideOnOverflowProps) {
  const textRef = useRef<HTMLDivElement>(null)
    const px = text.length > 8 ? 60 + (text.length - 8) * 10 : 0
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        ref={textRef}
        className={cn(
          'whitespace-nowrap transition-transform duration-1000 ease-in-out',
            `group-hover:translate-x-[calc(100%-${px}px)]`
        )}
      >
        {text}
      </div>
    </div>
  )
}

interface NetworkSelectionViewProps {
  cryptoCurrency: string
  userId: string
  onCreateWallet: (params: {
    userId: string
    currency: string
    network: string
    initialBalance: number
  }) => void
  onBack: () => void
  isVisible: boolean
}

export default function NetworkSelectionView({
  cryptoCurrency,
  userId,
  onCreateWallet,
  onBack,
  isVisible
}: NetworkSelectionViewProps) {
  const { t } = useTranslation()

  const networks = cryptoCurrencyNetworkKey[cryptoCurrency ?? '']?.networks || []

  return (
    <div
      className={cn(
        'absolute inset-0 overflow-y-auto h-full min-h-[420px] pr-2 transition-transform duration-300 ease-out mt-6',
        isVisible ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex items-center justify-start h-4">
          <ArrowLeft width={24} height={24} className={"mt-2"} onClick={onBack} style={{ cursor: 'pointer' }} />
          <span
              className="text-[#c5c0d8] hover:text-white text-[14px] cursor-pointer"
              onClick={onBack}
          >
            {t('common.back', 'Back')}
            </span>
        {/*<button*/}
        {/*  className="text-xs text-[#c5c0d8] hover:text-white"*/}
        {/*  onClick={onBack}*/}
        {/*>*/}
        {/*  &larr; {t('common.back', 'Back')}*/}
        {/*</button>*/}
      </div>
      <div
        className="grid grid-cols-3 gap-2 no-shadow pt-4"
        css={cssForCard()}
      >
        {networks.map((networkItem: any) => (
          <div
            key={networkItem.id}
            className="group max-h-[78px] flex flex-col items-start gap-3 p-4 overflow-hidden card-item rounded-2xl border-app-default"
            onClick={() => {
              onCreateWallet({
                userId: userId || '',
                currency: cryptoCurrency!,
                network: networkItem.network!,
                initialBalance: 0
              })
            }}
          >
            <div className="flex-shrink-0 w-4 h-4">{networkItem.icon}</div>
            <TextWithSlideOnOverflow 
              text={networkItem.network}
              className="text-left text-white text-app-medium-14"
            />
          </div>
        ))}
      </div>
    </div>
  )
}