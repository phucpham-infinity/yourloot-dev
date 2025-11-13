import { YourLootSupportBotLink } from '@/constants'
import { useScreen } from '@/hooks'
import { cn, WIDTH_SIDEBAR, WIDTH_SIDEBAR_EXPANDED } from '@/lib/utils'
import { useV2LayoutStore } from '@/store/slices/v2/layout.store'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  FooterSection,
  HeaderSection,
  SearchCollapsedSection,
  SidebarSection,
  useSidebarData
} from './shared'

export default function SidebarWeb() {
  const { t } = useTranslation()
  const [activeItem, setActiveItem] = useState<string | null>('home')
  const { isOpenSidebar, setIsOpenSidebar } = useV2LayoutStore()
  const navigate = useNavigate()
  const { lg, xl } = useScreen()
  const { search, menuItems, games, liveCasino, openSearch } = useSidebarData(
    activeItem,
    setActiveItem
  )

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const rowRefMap = useRef<Record<string, HTMLDivElement | null>>({})
  const [indicatorTop, setIndicatorTop] = useState(0)
  const [indicatorHeight, setIndicatorHeight] = useState(0)
  const [showIndicator, setShowIndicator] = useState(false)
  const [headingHidden, setHeadingHidden] = useState(false)

  useEffect(() => {
    if (!isOpenSidebar) {
      const hideHeadingTimer = setTimeout(() => {
        setHeadingHidden(true)
      }, 500)
      return () => clearTimeout(hideHeadingTimer)
    } else {
      setHeadingHidden(false)
    }
  }, [isOpenSidebar])

  useLayoutEffect(() => {
    if (!activeItem) {
      setShowIndicator(false)
      return
    }
    const rowEl = rowRefMap.current[activeItem]
    const containerEl = scrollContainerRef.current
    if (!rowEl || !containerEl) return
    const rowRect = rowEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()
    setIndicatorTop(rowRect.top - containerRect.top + containerEl.scrollTop)
    setIndicatorHeight(rowRect.height)
    setShowIndicator(true)
  }, [activeItem, isOpenSidebar, headingHidden])

  if (!lg && !xl) return null

  return (
    <div
      style={{
        width: isOpenSidebar ? WIDTH_SIDEBAR_EXPANDED : WIDTH_SIDEBAR,
        minWidth: isOpenSidebar ? WIDTH_SIDEBAR_EXPANDED : WIDTH_SIDEBAR
      }}
      className={cn(
        'relative bg-[#040305] hidden overflow-hidden transition-all duration-500 h-full border-r border-[#2A2242]',
        lg && 'block!',
        xl && 'block!'
      )}
    >
      <div className="flex flex-col w-full h-full text-white bg-transparent border-none">
        <HeaderSection
          isOpen={isOpenSidebar}
          onToggle={() => setIsOpenSidebar(!isOpenSidebar)}
          onOpenSearch={openSearch}
          searchLabel={t('sidebar.search', 'Search')}
        />

        <SearchCollapsedSection
          isOpen={isOpenSidebar}
          items={search}
          activeId={activeItem}
          onItemClick={(item) => item.onClick && item.onClick()}
        />

        <div
          className={cn(
            'relative flex-1 pb-[67px] overflow-y-auto h-fit max-h-[calc(100vh-60px)] scrollbar-hide',
            !isOpenSidebar && 'pb-[180px]'
          )}
          ref={scrollContainerRef}
        >
          {showIndicator && (
            <div
              className={cn(
                'absolute left-0 right-0 rounded-[6px] bg-app-primary/10 pointer-events-none transition-all duration-500 ease-out'
              )}
              style={{
                transform: `translateY(${indicatorTop}px)`,
                height: indicatorHeight
              }}
            />
          )}

          <SidebarSection
            items={menuItems}
            isOpen={isOpenSidebar}
            headingHidden={headingHidden}
            activeId={activeItem}
            onItemClick={(item) => {
              setActiveItem(item.id)
              if (item.onClick) {
                item.onClick()
              }
            }}
            containerClassName={cn('border-b border-[#2A2242]')}
            rowClassName={cn('')}
            labelClassName={cn('font-medium')}
            registerRowRef={(id, el) => {
              rowRefMap.current[id] = el
            }}
            useExternalHighlight
          />

          {/* <SidebarSection
            items={wallets}
            isOpen={isOpenSidebar}
            activeId={activeItem}
            onItemClick={(item) => {
              setActiveItem(item.id)
              if (item.onClick) {
                item.onClick()
              }
            }}
            containerClassName={cn('border-b border-[#2A2242]')}
            rowClassName={cn('my-[10px]')}
            registerRowRef={(id, el) => {
              rowRefMap.current[id] = el
            }}
            useExternalHighlight
          /> */}

          <SidebarSection
            items={games}
            isOpen={isOpenSidebar}
            headingHidden={headingHidden}
            activeId={activeItem}
            onItemClick={(item) => {
              setActiveItem(item.id)
              if (item.onClick) {
                item.onClick()
              } else if (item.category?.[0]) {
                navigate(
                  `/game-category?category=${item.category[0]}&title=${item.label}`
                )
              }
            }}
            containerClassName={cn('border-b border-[#2A2242]')}
            rowClassName={cn('')}
            heading={'Games'}
            registerRowRef={(id, el) => {
              rowRefMap.current[id] = el
            }}
            useExternalHighlight
          />

          <SidebarSection
            headingHidden={headingHidden}
            items={liveCasino}
            isOpen={isOpenSidebar}
            activeId={activeItem}
            onItemClick={(item) => {
              setActiveItem(item.id)
              if (item.category?.[0]) {
                navigate(
                  `/game-category?category=${item.category[0]}&title=${item.label}`
                )
              }
            }}
            containerClassName={cn('')}
            rowClassName={cn('transition-all duration-300')}
            heading={'Live Casino'}
            registerRowRef={(id, el) => {
              rowRefMap.current[id] = el
            }}
            useExternalHighlight
          />
        </div>

        <FooterSection
          isOpen={isOpenSidebar}
          onClickSupport={() => {
            navigate('/about')
          }}
          onOpenTelegram={() => {
            window.open(YourLootSupportBotLink, '_blank')
          }}
          supportLabel={t('auth.support')}
        />
      </div>
    </div>
  )
}
