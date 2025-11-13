import menuIcon from '@/assets/images/menu.svg'
import CustomButton from '@/components/common/custom-button'
import CustomDropdownButton from '@/components/common/custom-dropdown-button'
import { cn } from '@/lib/utils'
import { isMobile } from 'react-device-detect'

export interface NotificationItemDataShape {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  actionLabel?: string
}

interface NotificationItemProps {
  item: NotificationItemDataShape
  onOpenActions: (id: string) => void
  isAuthorized: boolean
  onCtaClick: (id: string, label?: string) => void
  onDropdownAction?: (id: string, action: 'markAsRead' | 'delete') => void
}

const NotificationItem = ({
  item: n,
  onOpenActions,
  isAuthorized,
  onCtaClick,
  onDropdownAction
}: NotificationItemProps) => {
  return (
    <div
      className={cn(
        // mobile: keep simple row with bottom border
        'w-full px-6 py-4 border-b border-[#453561] flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-6',
        // desktop: switch to card style based on raw.tsx
        'md:p-6 md:rounded-[10px] md:bg-gradient-to-b md:from-gray-700/20 md:to-black/10 md:overflow-hidden md:outline md:outline-1 md:outline-offset-[-1px] md:outline-[#433854]'
      )}
    >
      <div className="flex flex-col gap-2 md:justify-start md:gap-2 md:shrink-0 md:relative">
        <div
          className={cn(
            'text-sm font-medium',
            n.read ? 'text-slate-500' : 'text-white'
          )}
        >
          {n.title}
        </div>
        <div
          className={cn(
            'text-xs font-medium',
            n.read ? 'text-slate-500' : 'text-slate-300'
          )}
        >
          {n.message}
        </div>
        {isAuthorized ? (
          <div className="text-xs font-medium text-slate-500">{n.time}</div>
        ) : null}
      </div>

      <div className="flex items-center justify-between w-full md:justify-end md:gap-2 md:shrink-0 md:relative h-[34px] rounded-[10px]">
        {n.actionLabel ? (
          <CustomButton
            className="w-[112px]  h-[34px] rounded-[10px]"
            height={34}
            variant="default"
            label={n.actionLabel}
            onClick={() => onCtaClick(n.id, n.actionLabel)}
          />
        ) : (
          <div />
        )}

        {isAuthorized && !isMobile && (
          <div className="hidden w-10 md:block">
            <CustomDropdownButton
              triggerVariant="invisible"
              triggerClassName="!h-9 !px-2 w-10 border-none"
              showCaret={false}
              width={40}
              contentWidth={192}
              label={
                <img
                  src={menuIcon}
                  alt="Options"
                  aria-hidden
                  className="w-6 h-6"
                />
              }
              placeholder=""
              options={[
                { label: 'Mark as read', value: 'markAsRead' },
                { label: 'Delete', value: 'delete' }
              ]}
              onChange={(value) => {
                const action =
                  value === 'markAsRead' || value === 'delete'
                    ? value
                    : undefined
                if (action && onDropdownAction) {
                  onDropdownAction(n.id, action)
                } else {
                  onOpenActions(n.id)
                }
              }}
            />
          </div>
        )}
        {isAuthorized && isMobile && !n.read && (
          <CustomButton
            aria-label="Mark as read"
            onClick={() => onOpenActions(n.id)}
            variant="invisible"
            height={34}
            label={
              <img src={menuIcon} alt="" aria-hidden className="w-6 h-6" />
            }
            className="w-auto min-w-0 px-2"
          />
        )}
      </div>
    </div>
  )
}

export default NotificationItem
