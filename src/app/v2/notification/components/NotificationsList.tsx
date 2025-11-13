import NotificationItem, { NotificationItemDataShape } from './NotificationItem'

interface NotificationsListProps {
  items: NotificationItemDataShape[]
  onOpenActions: (id: string) => void
  isAuthorized: boolean
  onCtaClick: (id: string, label?: string) => void
  onDropdownAction?: (id: string, action: 'markAsRead' | 'delete') => void
}

const NotificationsList = ({ items, onOpenActions, isAuthorized, onCtaClick, onDropdownAction }: NotificationsListProps) => {
  return (
    <div className="w-full flex flex-col gap-1.5 md:gap-2">
      {items.map((n) => (
        <NotificationItem key={n.id} item={n} onOpenActions={onOpenActions} isAuthorized={isAuthorized} onCtaClick={onCtaClick} onDropdownAction={onDropdownAction} />
      ))}

      {items.length === 0 && (
        <div className="text-center text-sm text-slate-500 py-8">
          No notifications to display.
        </div>
      )}
    </div>
  )
}

export default NotificationsList
