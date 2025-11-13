import {
  HeaderSection,
  SearchCollapsedSection,
  SidebarSection,
  FooterSection,
  useSidebarData
} from '../sidebar-web/shared'
import { cn } from '@/lib/utils'
import { YourLootSupportBotLink } from '@/constants'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const { t } = useTranslation()
  const [activeItem, setActiveItem] = useState<string | null>('home')
  const navigate = useNavigate()
  const { search, menuItems, games, liveCasino, openSearch } = useSidebarData(
    activeItem,
    setActiveItem
  )

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full bg-zinc-950 border-r border-[#2A2242] z-[70] transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          width: '232px',
          minWidth: '232px'
        }}
      >
        <div className="flex flex-col w-full h-full text-white bg-transparent border-none">
          <HeaderSection
            isOpen={true}
            onToggle={onClose}
            onOpenSearch={openSearch}
            searchLabel={t('sidebar.search', 'Search')}
          />

          <SearchCollapsedSection
            isOpen={true}
            items={search}
            activeId={activeItem}
            onItemClick={(item: any) => {
              if (item.onClick) {
                item.onClick()
                onClose()
              }
            }}
          />

          <div className="flex-1 pb-[67px] overflow-y-auto h-fit max-h-[calc(100vh-60px)] scrollbar-hide">
            <SidebarSection
              items={menuItems}
              isOpen={true}
              activeId={activeItem}
              onItemClick={(item: any) => {
                setActiveItem(item.id)
                if (item.onClick) {
                  item.onClick()
                  onClose()
                }
              }}
              containerClassName={cn('border-b border-[#2A2242]')}
              rowClassName={cn('')}
              labelClassName={cn('font-medium')}
            />

            {/* <SidebarSection
              items={wallets}
              isOpen={true}
              activeId={activeItem}
              onItemClick={(item: any) => {
                setActiveItem(item.id)
                if (item.onClick) {
                  item.onClick()
                  onClose()
                }
              }}
              containerClassName={cn('border-b border-[#2A2242]')}
              rowClassName={cn('my-[10px]')}
            /> */}

            <SidebarSection
              items={games}
              isOpen={true}
              activeId={activeItem}
              onItemClick={(item: any) => {
                setActiveItem(item.id)
                if (item.onClick) {
                  item.onClick()
                  onClose()
                } else if (item.category?.[0]) {
                  navigate(
                    `/game-category?category=${item.category[0]}&title=${item.label}`
                  )
                  onClose()
                }
              }}
              containerClassName={cn('border-b border-[#2A2242]')}
              rowClassName={cn('')}
              heading={'Games'}
            />

            <SidebarSection
              items={liveCasino}
              isOpen={true}
              activeId={activeItem}
              onItemClick={(item: any) => {
                setActiveItem(item.id)
                if (item.onClick) {
                  item.onClick()
                  onClose()
                } else if (item.category?.[0]) {
                  navigate(
                    `/game-category?category=${item.category[0]}&title=${item.label}`
                  )
                  onClose()
                }
              }}
              containerClassName={cn('')}
              rowClassName={cn('transition-all duration-300')}
              heading={'Live Casino'}
            />
          </div>

          <FooterSection
            isOpen={true}
            isDrawer={true}
            onClickSupport={() => {
              navigate('/about')
              onClose()
            }}
            onOpenTelegram={() => {
              window.open(YourLootSupportBotLink, '_blank')
            }}
            supportLabel={t('auth.support')}
          />
        </div>
      </div>
    </>
  )
}
