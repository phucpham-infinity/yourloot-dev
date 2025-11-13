import { queryClient } from '@/services'
import {
  NOTIFICATIONS_QUERY_KEYS,
  WALLETS_QUERY_KEYS
} from '@/services/controller'
import {
  useStompWebSocket,
  WebSocketEventName,
  WebSocketMessage
} from '@/services/controller/socket'

import { useToast } from '@/hooks/use-toast'
import { useWalletStore } from '@/store'
interface SocketProps {
  children: React.ReactNode
}

const SocketHandler = (props: SocketProps) => {
  const { children } = props
  const toast = useToast()
  const updateWalletsBalances = useWalletStore((s) => s.updateWalletsBalances)

  const handleMessage = (message: WebSocketMessage) => {
    console.log('[WSS] ==>> ', message)
    if (message.message) {
      toast.success(message.message)
    }
    switch (message.eventName) {
      case WebSocketEventName.QUIT_USER_CURRENT_GAME_SESSION:
        handleQuitGameSession()
        break

      case WebSocketEventName.DISPLAY_NOTIFICATION:
        handleDisplayNotification(message)
        break

      case WebSocketEventName.REFRESH_WALLET_BALANCES:
        handleRefreshWalletBalances(message)
        break

      default:
        console.warn('Unknown WebSocket event:', message.eventName)
    }
  }

  const handleQuitGameSession = () => {
    queryClient.refetchQueries({
      queryKey: [WALLETS_QUERY_KEYS.USER_ACTIVE_BALANCE_WALLET]
    })

    queryClient.refetchQueries({
      queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS]
    })
  }

  const handleDisplayNotification = async (message: WebSocketMessage) => {
    await queryClient.refetchQueries({
      queryKey: [NOTIFICATIONS_QUERY_KEYS.USER_NOTIFICATIONS, message.userId]
    })
  }

  const handleRefreshWalletBalances = async (message: WebSocketMessage) => {
    updateWalletsBalances(message.parameters || {})
  }

  useStompWebSocket({
    onMessage: handleMessage
  })

  // const handleSendMockMessage = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   handleMessage({
  //     serviceName: 'wallet',
  //     eventName: 'REFRESH_WALLET_BALANCES',
  //     userId: '56ee4b99-7305-4592-87e0-79bef6602d19',
  //     message: '',
  //     timestamp: '2025-10-23T16:37:30.793332677Z',
  //     parameters: {
  //       '9b75941a-fa26-467f-abb5-90b3ef0bc3c9': '2020.000000000000',
  //       'dc93644f-2a80-4111-ac1c-61b048e21d13': '54984.000000000000'
  //     }
  //   } as any)
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   handleMessage({
  //     serviceName: 'wallet',
  //     eventName: 'REFRESH_WALLET_BALANCES',
  //     userId: '56ee4b99-7305-4592-87e0-79bef6602d19',
  //     message: '',
  //     timestamp: '2025-10-23T16:37:30.844983884Z',
  //     parameters: {
  //       '9b75941a-fa26-467f-abb5-90b3ef0bc3c9': '0',
  //       'dc93644f-2a80-4111-ac1c-61b048e21d13': '57004.000000000000'
  //     }
  //   } as any)
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   handleMessage({
  //     serviceName: 'wallet',
  //     eventName: 'QUIT_USER_CURRENT_GAME_SESSION',
  //     userId: '56ee4b99-7305-4592-87e0-79bef6602d19',
  //     message: '',
  //     timestamp: '2025-10-23T16:37:30.845254008Z',
  //     parameters: {
  //       'dc93644f-2a80-4111-ac1c-61b048e21d13': '57004.000000000000'
  //     }
  //   } as any)
  // }

  return <>{children}</>

  // return (
  //   <>
  //     <div className="fixed top-0 right-0 z-[9999] w-[100px] cursor-pointer h-10 bg-red-500">
  //       <button onClick={handleSendMockMessage}>Mock WebSocket</button>
  //     </div>
  //     {children}
  //   </>
  // )
}

export default SocketHandler
