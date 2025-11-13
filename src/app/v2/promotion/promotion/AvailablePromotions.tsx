import Clock2Icon from '@/assets/icons/v2/Clock2'
import { Promotion } from '@/services/controller/promotions'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/formatDuration'
import promotionMobile from '/public/images/banner/crypto-bonus.png'

interface AvailablePromotionsProps {
  promotion: Promotion
  index?: number
  status?: string
}

export default function AvailablePromotions({
  promotion,
  index = 0,
  status = 'available'
}: AvailablePromotionsProps) {
  // Real-time timer state for countdown updates
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    // Update every second for accurate countdown; cleans up on unmount
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Real-time countdown calculation
  const countdownTime = useMemo(() => formatDuration(promotion.endDate), [promotion.endDate, now])

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{
        duration: 0.3,
        delay: index * 0.06,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={clsx(
        'w-full rounded-[10px] inline-flex flex-col justify-start items-start overflow-hidden bg-app-background',
        { 'h-[222px]': isMobile, 'h-full': !isMobile }
      )}
    >
      <div
        className={clsx('relative self-stretch', {
          'h-[116px]': isMobile,
          'h-24': !isMobile
        })}
      >
        <img
          className={clsx('absolute top-0 left-0 object-cover w-full', {
            'h-[116px]': isMobile,
            'h-24': !isMobile
          })}
          src={promotion.promotionBannerUrl || promotionMobile}
          loading="lazy"
          alt="promotion banner"
        />
      </div>
      <div className="self-stretch flex-1 px-3 pt-3 bg-[#191524] rounded-bl-[10px] rounded-br-[10px] flex flex-col justify-start items-start gap-4 !h-[112px] hover:bg-[#2A2242] pb-4">
        <div className="inline-flex items-start justify-start h-full gap-2">
          <div className="h-6 px-2.5 py-1.5 bg-gradient-brand-hover rounded-[10px] flex justify-center items-center gap-1">
            <Clock2Icon className="w-3 h-3 text-app-white" />
            <div className="justify-center leading-none text-center text-app-white text-app-medium-12">
              {countdownTime}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-stretch justify-start gap-3">
          <div className="self-stretch justify-center font-black !leading-[12px] text-app-white text-v2-app-medium-14">
            {promotion.name}
          </div>

          <div className="self-stretch justify-center w-full overflow-hidden !leading-[14px] text-app-pale text-v2-app-medium-14 line-clamp-1">
            {promotion.subTitle}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return promotion.type.toLowerCase() === 'free_spins' ? (
    <div key={promotion.promotionId} className="block w-full">
      {cardContent}
    </div>
  ) : (
    <Link
      key={promotion.promotionId}
      to={`/promotion/${status}/${promotion.promotionId}/${promotion.type}?isBonus=${promotion.isBonus || false}`}
      className="block w-full"
    >
      {cardContent}
    </Link>
  )
}
