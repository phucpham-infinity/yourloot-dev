import CustomButton from '@/components/common/custom-button'
import HistoryItem from '@/components/v2/history-item'
import { useScreen } from '@/hooks'
import { walletsController } from '@/services/controller'
import { useProfileStore, useWalletStore } from '@/store'
import { useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const History = () => {
  const { t } = useTranslation()
  const { useInfiniteQueryUserOrderHistoryWallet } = walletsController()
  const wallets = useWalletStore((state) => state.wallets)
  const profile = useProfileStore((s) => s.profile)
  const defaultWallet = wallets.find((wallet) => wallet.isDefault)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useScreen()

  const pageSize = 20

  const {
    data,
    isLoading: isLoadingOrders,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQueryUserOrderHistoryWallet({
    userId: profile?.userId,
    walletId: defaultWallet?.id,
    params: {
      size: pageSize
    }
  })

  // Flatten all pages data
  const orders = data?.pages.flatMap((page: any) => page.content) ?? []

  // Intersection Observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: scrollContainerRef.current,
      rootMargin: '100px',
      threshold: 0.1
    })

    const currentLoadingRef = loadingRef.current
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef)
    }

    return () => {
      if (currentLoadingRef) {
        observer.unobserve(currentLoadingRef)
      }
    }
  }, [handleIntersection])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[172px] rounded-[10px] overflow-hidden px-[20px] py-[24px]  flex items-center justify-between mt-2 bg-gradient-to-r from-app-primary to-app-primary-dark">
        <div className="absolute h-[200px] top-0 right-0">
          <img className="h-full" src="/images/payment/sp1.png" />
        </div>
        {!isMobile && (
          <div
            style={{
              mixBlendMode: 'luminosity',
              background:
                "url('/images/payment/sp2.png')  50% / cover no-repeat"
            }}
            className="absolute h-[150px] w-[150px] top-[10px] right-[170px]"
          ></div>
        )}
        <div className="w-[154px] flex flex-col gap-2 ">
          <div className="h-6 w-[50px] px-3 py-1.5 bg-violet-200 rounded-[30px] inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="text-center justify-center text-zinc-950 text-app-medium-12 leading-4">
              24/7
            </div>
          </div>
          <div className="text-app-medium-14 text-app-white">
            {t('history.contactUs', 'Contact us if you have any questions')}
          </div>
          <CustomButton
            label={t('history.messageUs', 'Message us')}
            className="w-fit"
            variant="default"
            onClick={() => {
              window.open('https://t.me/YourLoot_SupportBot', '_blank')
            }}
          />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        style={{ maxHeight: '100%' }}
        className="overflow-y-auto"
      >
        {isLoadingOrders
          ? // Render skeleton items while loading
            Array.from({ length: 5 }).map((_, index) => (
              <HistoryItem key={`skeleton-${index}`} isLoading={true} />
            ))
          : orders?.map((order: any) => (
              <HistoryItem key={order.id} order={order} />
            ))}

        {/* Loading indicator for next page - always visible when hasNextPage */}
        {hasNextPage && (
          <div ref={loadingRef} className="flex justify-center py-4">
            <div className="text-app-medium-12 text-app-pale">
              {isFetchingNextPage
                ? t('history.loadingMore', 'Loading more...')
                : t('history.scrollToLoadMore', 'Scroll to load more')}
            </div>
          </div>
        )}

        {/* End of list indicator */}
        {!hasNextPage && orders.length > 0 && (
          <div className="flex justify-center py-4">
            <div className="text-app-medium-12 text-app-pale">
              {t('history.noMoreItems', 'No more items to load')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
