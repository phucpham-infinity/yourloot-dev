import CustomButton from '@/components/common/custom-button'
import { cn } from '@/lib/utils'
import { useAuthStore, useRegisterStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionsDrawer from './components/ActionsDrawer'
import Header from './components/Header'
import NotificationsList from './components/NotificationsList'
import Tabs, { TabKey } from './components/Tabs'

// Types for a notification item
interface NotificationItemData {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  actionLabel?: string
}

// Seed data based on raw.ts examples
const initialNotifications: NotificationItemData[] = [
  {
    id: 'welcome-bonus',
    title: 'Welcome Bonus Activated!',
    message:
      'Your 100% welcome bonus up to $1,500 has been credited to your account. Start playing now to enjoy your extra funds!',
    time: '5 minutes ago',
    read: false,
    actionLabel: 'Play Now'
  },
  {
    id: 'deposit-success',
    title: 'Deposit Successful',
    message:
      'Your deposit of $100 has been processed successfully and is now available in your account balance.',
    time: '5 hours ago',
    read: true,
    actionLabel: 'View Balance'
  },
  {
    id: 'cashback-reward',
    title: 'Cashback Reward',
    message:
      'Your weekly cashback of $25 has been credited to your account based on your gaming activity this week.',
    time: '12 hours ago',
    read: true,
    actionLabel: 'View Balance'
  },
  {
    id: 'promo-expired',
    title: 'Promotion expired',
    message:
      'Your active promotion has expired. You can activate a new one from the list.',
    time: '1 day ago',
    read: false,
    actionLabel: 'View Promotions'
  },
  {
    id: 'kyc-required',
    title: 'Verification Required',
    message:
      'To ensure account security and comply with regulations, please complete your identity verification.',
    time: '1 day ago',
    read: false,
    actionLabel: 'Verify Now'
  }
]

const TABS = ['All', 'Read', 'Unread'] as const

interface NotificationsV2Props {
  onClose?: () => void
}

const NotificationsV2 = ({ onClose }: NotificationsV2Props) => {
  const [activeTab, setActiveTab] = useState<TabKey>('All')
  const [items, setItems] =
    useState<NotificationItemData[]>(initialNotifications)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { setStep } = useRegisterStore()

  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const filteredItems = useMemo(() => {
    // For unauthorized users, show only one predefined notification
    if (!isAuthenticated) {
      const unauthenticatedItem: NotificationItemData = {
        id: 'signup-gift',
        title: 'Claim your gift',
        message: 'Get bonus on your first deposit for signing up!',
        time: '',
        read: false,
        actionLabel: 'Sign up'
      }
      return [unauthenticatedItem]
    }

    switch (activeTab) {
      case 'Read':
        return items.filter((n) => n.read)
      case 'Unread':
        return items.filter((n) => !n.read)
      default:
        return items
    }
  }, [activeTab, items, isAuthenticated])

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const openActions = (id: string) => {
    if (!isAuthenticated) return // Unauthorized users cannot open actions
    setSelectedId(id)
    setIsDrawerOpen(true)
  }

  const handleConfirmMarkAsRead = () => {
    if (selectedId) {
      markAsRead(selectedId)
    }
    setIsDrawerOpen(false)
    setSelectedId(null)
  }

  const handleDelete = () => {
    if (selectedId) {
      setItems((prev) => prev.filter((n) => n.id !== selectedId))
    }
    setIsDrawerOpen(false)
    setSelectedId(null)
  }

  // Broadcast unread count changes so header can show a badge
  useEffect(() => {
    // For unauthorized users, we always have exactly one notification (unread)
    const unreadCount = isAuthenticated
      ? items.filter((n) => !n.read).length
      : 1
    try {
      localStorage.setItem('notifications-unread-count', String(unreadCount))
    } catch {}
    try {
      // Custom event to notify listeners
      window.dispatchEvent(
        new CustomEvent('notifications:unread', { detail: unreadCount } as any)
      )
    } catch {}
  }, [items, isAuthenticated])

  const handleMarkAllAsRead = () => {
    if (!isAuthenticated) return // Unauthorized cannot mark all
    setItems((prev) => prev.map((n) => (n.read ? n : { ...n, read: true })))
  }

  const handleDropdownAction = (
    id: string,
    action: 'markAsRead' | 'delete'
  ) => {
    if (!isAuthenticated) return
    if (action === 'markAsRead') {
      markAsRead(id)
    } else if (action === 'delete') {
      setItems((prev) => prev.filter((n) => n.id !== id))
    }
  }

  const handleCtaClick = (id: string, label?: string) => {
    if (!label) return
    if (!isAuthenticated) {
      // Close the notifications dialog then open the register drawer (route renders a drawer)
      onClose?.()
      navigate('/auth/register')
      setStep(1)
      return
    }

    // Simple in-app action mapping for demo
    const lower = label.toLowerCase()
    if (lower.includes('play')) {
      navigate('/')
    } else if (lower.includes('balance')) {
      navigate('/balance')
    } else if (lower.includes('promotion')) {
      navigate('/')
    } else if (lower.includes('verify')) {
      navigate('/profile')
    }

    // Mark this notification as read when CTA is used
    markAsRead(id)
  }

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col gap-4 min-h-0',
        // add vertical padding when used in a drawer
        onClose ? 'py-6' : '',
        // desktop layout: center and constrain width similar to raw.tsx (904px content width)
        'md:max-w-[904px] md:mx-auto md:mt-6'
      )}
    >
      <Header
        onClose={onClose}
        onMarkAllAsRead={handleMarkAllAsRead}
        isAuthorized={isAuthenticated}
      />

      {/* Tabs + Mark all (desktop) */}
      {isAuthenticated ? (
        <div className="md:flex md:items-center md:justify-between">
          <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
          <div className="hidden md:inline-flex">
            <CustomButton
              variant="muted"
              label="Mark all as read"
              onClick={handleMarkAllAsRead}
              className="min-w-0 w-fit"
            />
          </div>
        </div>
      ) : null}

      <div className="flex-1 min-h-0 pr-1 overflow-y-auto">
        <NotificationsList
          items={filteredItems}
          onOpenActions={openActions}
          isAuthorized={isAuthenticated}
          onCtaClick={handleCtaClick}
          onDropdownAction={handleDropdownAction}
        />
      </div>

      <ActionsDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onMarkAsRead={handleConfirmMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  )
}

// @ts-ignore
export default NotificationsV2
