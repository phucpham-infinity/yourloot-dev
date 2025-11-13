import React, { useEffect, useMemo, useState } from 'react';
import { formatDuration } from '../utils/formatDuration';
import YellowClockSvg from '@/assets/icons/v2/yellow-clock.svg';
import WhiteClockSvg from '@/assets/icons/v2/white-clock.svg';
import RedClockSvg from '@/assets/icons/v2/red-clock.svg';
import { useTranslation } from 'react-i18next';

interface PromotionTimerProps {
  isActive: boolean;
  endDate: string | Date;
  status?: string;
  className?: string;
}

export const PromotionTimer: React.FC<PromotionTimerProps> = ({ isActive, endDate, status = 'available', className }) => {
  const { t } = useTranslation();

  // Keep countdown in state and tick periodically so UI updates after fetch
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    // Update every second for accurate countdown; cleans up on unmount
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Recompute countdown when time passes or endDate changes
  const countdownTime = useMemo(() => formatDuration(endDate), [endDate, now]);
  const isExpired = countdownTime === 'Expired';
  const isCanceled = status === 'canceled';

  // Format the expiration date for display when expired/canceled
  const expiredDate = useMemo(() => new Date(endDate), [endDate]);
  const formattedExpiredDate = useMemo(
    () => expiredDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [expiredDate]
  );

  // Determine title based on conditions
  let title = t('promotionV2.expired');
  if (isCanceled) {
    title = t('promotionV2.canceled');
  } else if (!isExpired) {
    title = isActive ? t('promotionV2.timer.expires') : t('promotionV2.timer.available');
  }

  // Determine color based on conditions
  let borderColor = 'outline-red-500';
  let textColor = 'text-red-500';

  if (isCanceled) {
    // Canceled state (red, same as expired)
    borderColor = 'outline-red-500';
    textColor = 'text-red-500';
  } else if (!isExpired) {
    if (isActive) {
      // Warning state (yellow)
      borderColor = 'outline-orange-300';
      textColor = 'text-orange-300';
    } else {
      // Available state (white)
      borderColor = 'outline-white';
      textColor = 'text-white';
    }
  }

  return (
    <div className={`w-full md:max-w-md lg:max-w-lg inline-flex flex-col justify-start items-start gap-4 ${className || ''}`}>
      <div className="self-stretch h-full p-3 md:p-4 bg-[#191524] rounded-[10px] flex flex-col justify-start items-start gap-3 md:gap-4 overflow-hidden">
        <div data-bold="false" data-icon="false" className="h-4 inline-flex justify-center items-center gap-2">
          <div className="justify-center text-white text-sm md:text-base font-medium font-['Satoshi']">{title}</div>
        </div>
        <div className={`self-stretch p-3 md:p-4 rounded-[10px] outline outline-1 outline-offset-[-1px] ${borderColor} inline-flex justify-start items-center gap-2 flex-wrap`}>
          {isExpired || isCanceled ? (
            <img src={RedClockSvg} className="w-3 h-3 min-w-[12px]" />
          ) : isActive ? (
            <img src={YellowClockSvg} className="w-3 h-3 min-w-[12px]" />
          ) : (
            <img src={WhiteClockSvg} className="w-3 h-3 min-w-[12px]" />
          )}
          <div className={`justify-center ${textColor} text-xs font-medium font-['Satoshi'] break-words`}>
            {isCanceled
              ? t('promotionV2.timer.canceledOn', { date: formattedExpiredDate })
              : isExpired
                ? t('promotionV2.timer.expiredOn', { date: formattedExpiredDate })
                : countdownTime}
          </div>
        </div>
        <div className="self-stretch justify-center text-slate-400 text-xs font-medium font-['Satoshi'] break-words hyphens-auto">
          {isCanceled
            ? t('promotionV2.timer.canceledDescription')
            : isExpired
              ? t('promotionV2.timer.expiredDescription')
              : isActive
                ? t('promotionV2.timer.activeDescription')
                : t('promotionV2.timer.availableDescription')}
        </div>
      </div>
    </div>
  );
};

export default PromotionTimer;
