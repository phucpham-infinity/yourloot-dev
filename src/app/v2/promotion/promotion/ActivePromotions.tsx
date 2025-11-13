import ClockIcon from '@/assets/icons/v2/Clock'
import Loader from '@/components/common/loader'
import { useScreen } from '@/hooks'
import { Promotion } from '@/services/controller/promotions'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { formatDuration } from '../utils/formatDuration'
import promotionMobile from '/public/images/banner/crypto-bonus.png'
import { useEffect, useState, useMemo } from 'react'

interface ActivePromotionsProps {
  activePromotions: Promotion[]
  isLoadingActive: boolean
  status?: string
}

export default function ActivePromotions({
  activePromotions,
  isLoadingActive,
  status = 'active'
}: ActivePromotionsProps) {
  const { t } = useTranslation()
  const { isMobile } = useScreen()
  
  // Real-time timer state for countdown updates
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    // Update every second for accurate countdown; cleans up on unmount
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Pre-compute countdown times for all promotions to avoid conditional hook calls
  const countdownTimes = useMemo(() => {
    return activePromotions.map(promotion => formatDuration(promotion.endDate))
  }, [activePromotions, now])

  // Don't render anything if no active promotions and not loading
  if (!isLoadingActive && activePromotions.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-start self-stretch justify-start w-full gap-4 rounded-lg ">
      {isLoadingActive && (
        <div className="flex items-center self-stretch justify-center w-full h-24">
          <Loader className="w-10 h-10" size={40} />
        </div>
      )}
      {!isLoadingActive && activePromotions.length > 0 && (
        <div className="grid self-stretch w-full grid-cols-1 gap-4 border-2 border-app-warning rounded-[10px]">
          <AnimatePresence mode="popLayout">
            {activePromotions.map((promotion, index) => {
              // Use pre-computed countdown time for this promotion
              const countdownTime = countdownTimes[index]
              
              return (
                <Link
                  key={promotion.promotionId}
                  to={`/promotion/${status}/${promotion.promotionId}/${promotion.type}?isBonus=${promotion.isBonus || false}`}
                  className="block w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                    whileTap={{ scale: 0.99 }}
                    className={
                      isMobile
                        ? 'self-stretch rounded-[10px] inline-flex flex-col justify-start items-start overflow-hidden w-full'
                        : 'self-stretch p-2.5 rounded-[10px] overflow-hidden inline-flex justify-start items-start gap-4 w-full bg-[#191524] hover:bg-[#2A2242] shadow-header-balance'
                    }
                  >
                    {isMobile ? (
                      <div className="w-full">
                        <img
                          className="self-stretch h-28 rounded-[10px] w-full top-0 left-0 object-cover "
                          src={promotion.promotionBannerUrl || promotionMobile}
                          loading="lazy"
                          alt="promotion banner"
                        />
                        <div className="self-stretch p-4 bg-app-background rounded-bl-[10px] rounded-br-[10px] flex flex-col justify-start items-start gap-4">
                          <div className="inline-flex items-start justify-start gap-2">
                            <div className="h-6 px-2.5 py-1.5 bg-app-brand-light rounded-[10px] flex justify-center items-center gap-1">
                              <div className="justify-center leading-none text-center text-app-primary-dark text-app-medium-12 font-satoshi">
                                {t(
                                  'promotionV2.activePromotion',
                                  'Active Promotion'
                                )}
                              </div>
                            </div>
                            <div className="h-6 px-2.5 py-1.5 bg-app-warning rounded-[10px] flex justify-center items-center gap-1">
                              <ClockIcon className="w-3 h-3 text-app-primary-dark" />
                              <div className="justify-center leading-none text-center text-app-primary-dark text-app-medium-12 font-satoshi">
                                {t('promotionV2.timer.expiresIn')}:{' '}
                                {countdownTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start self-stretch justify-start leading-[12px]">
                            <div className="self-stretch justify-center font-black leading-[12px] text-app-white text-v2-app-medium-14 font-satoshi">
                              {promotion.name}
                            </div>

                            <div className="self-stretch justify-center leading-[12px] text-app-pale text-v2-app-medium-14 font-satoshi line-clamp-1">
                              {promotion.subTitle}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex flex-row items-start justify-start w-full gap-4 ">
                        <img
                          className="w-max-[292px] h-[94px] rounded-[10px]"
                          src={promotion.promotionBannerUrl || promotionMobile}
                          loading="lazy"
                          alt="promotion banner"
                        />
                        <div className="flex-1 pr-4 py-1 bg-transparent rounded-bl-[10px] rounded-br-[10px] inline-flex flex-col justify-start items-start gap-4">
                          <div className="flex flex-col items-start self-stretch justify-start gap-4">
                            <div className="inline-flex items-start justify-start gap-2">
                              <div className="h-6 px-2.5 py-1.5 bg-app-brand-light rounded-[10px] flex justify-center items-center gap-1">
                                <div className="justify-center leading-none text-center text-app-primary-dark text-v2-app-medium-12 font-satoshi">
                                  {t(
                                    'promotionV2.activePromotion',
                                    'Active Promotion'
                                  )}
                                </div>
                              </div>
                              <div className="h-6 px-2.5 py-1.5 bg-app-warning rounded-[10px] flex justify-center items-center gap-1">
                                <ClockIcon className="w-3 h-3 text-app-primary-dark" />
                                <div className="justify-center leading-none text-center text-app-primary-dark text-v2-app-medium-12 font-satoshi">
                                  {t('promotionV2.timer.expiresIn')}:{' '}
                                  {countdownTime}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start self-stretch justify-start gap-3">
                              <div className="self-stretch justify-center font-black text-app-white text-v2-app-medium-14 ">
                                {promotion.name}
                              </div>
                              <div className="self-stretch justify-center w-full overflow-hidden leading-tight text-app-pale text-v2-app-medium-14 font-satoshi">
                                {promotion.subTitle}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
