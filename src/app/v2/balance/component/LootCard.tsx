import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'
import {css} from "@emotion/react";
import YLIcon from "@/assets/icons/v2/YLIcon";

interface LootCardProps {
  amount: number | string
  isMobile?: boolean
}

export default function LootCard({ amount, isMobile = false }: LootCardProps) {
  const { t } = useTranslation()

  if (isMobile) {
    return (
      <div className="relative w-full overflow-hidden rounded-[10px] bg-[#181624] py-3 px-2.5">
        <div className="items-center gap-2 inline-flex">
          <div data-svg-wrapper className="relative">
            <YLIcon className="w-[16px] h-[16px]" />
          </div>
          <div className="flex flex-col items- justify-center w-full">
            <div className="text-[#FFFFFF] text-v2-app-medium-14 font-['Satoshi']">
              {formatAmount(amount)}
            </div>
            <div className="text-[#C5C0D8] text-v2-app-medium-12 font-['Satoshi']">
              {t('balance.yourLoot', 'Your Loot Coins')}
            </div>
          </div>
        </div>
        {/* decorative glow */}
        <div className="absolute w-200 h-200 bottom-40 -left-55 bg-[#487438] rounded-full blur-[40px] md:hidden"></div>
      </div>
    )
  }

  return (
    <div css={styles} className="w-full flex justify-between items-center p-4">
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-center w-4 h-4">
          <YLIcon className="w-[16px] h-[16px]" />
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-1">
          <div className="text-white text-sm font-medium font-['Satoshi']">
            {amount}
          </div>
          <div className="text-[#C5C0D8] text-xs font-medium font-['Satoshi']">
            {t('balance.yourLoot', 'Your Loot Coins')}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = css`
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(25, 21, 36, 1) 0%,
    rgba(25, 21, 36, 1) 100%
  );
`
