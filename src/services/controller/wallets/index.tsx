import { queryClient } from '@/services'
import { httpClient } from '@/services/api'
import { useWalletStore } from '@/store'
import { useMutation, useQuery, useInfiniteQuery } from '@tanstack/react-query'
// Query Key Constants
export const WALLETS_QUERY_KEYS = {
  WALLET: 'wallet',
  USER_WALLETS: 'user-wallets',
  USER_WALLET_CURRENCY: 'user-wallet-currency',
  BONUS_WALLET_CAN_BE_USED: 'bonus-wallet-can-be-used',
  USER_ACTIVE_BALANCE: 'user-active-balance',
  USER_ACTIVE_BALANCE_WALLET: 'user-active-balance-wallet',
  USER_WALLET_ORDER: 'user-wallet-order',
  USER_ORDER_HISTORY_WALLET: 'user-order-history-wallet'
}

// Interfaces
export interface Wallet {
  id: string
  userId: string
  currency: string
  amount: number
  isDefault: boolean
  isBonus: boolean
  createdAt: string
  updatedAt: string
  orders: any[]
  sign: string
  network: string
}

export interface CreateWalletRequest {
  userId: string
  currency: string
  network?: string
  initialBalance?: number
}

export interface WalletsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    content: Wallet[]
    total: number
  }
}

export interface WalletResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Wallet
}

export interface UpdateMainWalletRequest {
  userId: string
  currency: string
  walletId?: string
}

export interface ActiveBalanceResponse {
  timestamp: string
  contentType: string
  content: {
    id: string
    userId: string
    currency: string
    amount: number
    isDefault: boolean
    isBonus: boolean
    createdAt: string
    updatedAt: string
    orders?: any[]
    sign?: string
  }
}

export interface OrderBalanceOrderResponse {
  content: any[]
  totalElements: number
  totalPages: number
}

export interface OrderBalanceResponse {
  data: any
  timestamp: string
  contentType: string
  content: {
    id: string
    userId: string
    currency: string
    amount: number
    isDefault: boolean
    isBonus: boolean
    createdAt: string
    updatedAt: string
    orders: OrderBalanceOrderResponse
    cryptoOrders: OrderBalanceOrderResponse
    sign?: string
  }
}

export const walletsController = () => {
  // Create wallet
  const useCreateWallet = () =>
    useMutation<WalletResponse, Error, CreateWalletRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/wallets', data)
        return response.data
      },
      onSuccess: (_, variables) => {
        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS, variables.userId]
        })
      }
    })

  // Get user wallets
  const useGetUserWallets = (userId?: string) =>
    useQuery<WalletsListResponse>({
      queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS, userId],
      queryFn: async () => {
        useWalletStore.getState().isLoading = true
        const response = await httpClient.get(
          `/wallets/users/${userId}?size=50`
        )
        if (response.data) {
          useWalletStore.getState().setWallets(response.data.content.content)
          useWalletStore.getState().isLoading = false
        }
        return response.data
      },
      enabled: !!userId
    })

  const useCheckBonusWalletCanBeUsed = () =>
    useMutation<{ content: boolean }, Error, string>({
      mutationFn: async (userId) => {
        const response = await httpClient.get(
          `/wallets/bonus/${userId}/can-be-used`
        )
        return response.data
      }
    })

  // Get user wallet by currency
  const useGetUserWalletByCurrency = ({
    userId,
    currency,
    refetchInterval
  }: {
    userId: string
    currency: string
    refetchInterval?: number
    enabled?: boolean
  }) =>
    useQuery<Wallet>({
      queryKey: [WALLETS_QUERY_KEYS.USER_WALLET_CURRENCY, userId, currency],
      refetchInterval: refetchInterval,
      refetchIntervalInBackground: true,
      enabled: !!userId && !!currency,
      queryFn: async () => {
        const response = await httpClient.get(
          `/wallets/users/${userId}/currencies/${currency}`
        )
        useWalletStore.getState().updateWallet(response.data?.content)
        return response.data?.content
      }
    })

  const useUpdateMainWallet = (walletId: string) =>
    useMutation<WalletResponse, Error, UpdateMainWalletRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.patch(
          `/wallets/${walletId}/set-to-default`,
          data
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_ACTIVE_BALANCE_WALLET]
        })

        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS]
        })
      }
    })

  const useUpdateMainWallet2 = () =>
    useMutation<WalletResponse, Error, UpdateMainWalletRequest>({
      mutationFn: async (data: any) => {
        const response = await httpClient.patch(
          `/wallets/${data?.walletId}/set-to-default`,
          data
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_ACTIVE_BALANCE_WALLET]
        })

        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS]
        })
      }
    })

  const useUserActiveBalance = (userId: string) =>
    useMutation<ActiveBalanceResponse, Error, void>({
      mutationFn: async () => {
        const response = await httpClient.patch(
          `/wallets/users/${userId}/active-balance`
        )
        return response.data
      },
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_ACTIVE_BALANCE_WALLET]
        })

        queryClient.refetchQueries({
          queryKey: [WALLETS_QUERY_KEYS.USER_WALLETS]
        })
      }
    })

  const useCheckUserActiveBalanceWallet = (userId: string) =>
    useQuery<ActiveBalanceResponse, Error>({
      queryKey: [WALLETS_QUERY_KEYS.USER_ACTIVE_BALANCE_WALLET, userId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/wallets/users/${userId}/active-balance-wallet`
        )
        return response.data
      },
      enabled: !!userId
    })

  type Variables = {
    userId: string
    walletId: string
    page?: number
    size?: number
    orderType?: string
  }

  const useFetchUserOrderBalanceWallet = () =>
    useMutation<OrderBalanceResponse, Error, Variables>({
      mutationFn: async ({
        userId,
        walletId,
        page = 0,
        size = 20,
        orderType
      }: Variables): Promise<OrderBalanceResponse> => {
        const params: Record<string, any> = { page, size }

        if (orderType) {
          params.orderType = orderType
        }

        const response = await httpClient.get<OrderBalanceResponse>(
          `/wallets/${walletId}/users/${userId}/orders`,
          { params }
        )

        return response.data
      }
    })

  const useQueryUserOrderHistoryWallet = ({
    userId,
    walletId,
    params
  }: {
    userId?: string
    walletId?: string
    params?: Record<string, any>
  }) =>
    useQuery<OrderBalanceOrderResponse, Error, OrderBalanceOrderResponse>({
      enabled: !!userId && !!walletId,
      queryKey: [
        WALLETS_QUERY_KEYS.USER_ORDER_HISTORY_WALLET,
        userId,
        walletId,
        JSON.stringify(params)
      ],
      queryFn: async () => {
        const response = await httpClient.get<OrderBalanceResponse>(
          `/wallets/${walletId}/users/${userId}/orders`,
          { params }
        )
        return {
          content: [
            ...(response.data?.content?.orders?.content ?? []),
            ...(response.data?.content?.cryptoOrders?.content ?? [])
          ],
          totalElements:
            response.data?.content?.orders?.totalElements +
            response.data?.content?.cryptoOrders?.totalElements,
          totalPages: Math.max(
            response.data?.content?.orders?.totalPages,
            response.data?.content?.cryptoOrders?.totalPages
          )
        }
      }
    })

  const useInfiniteQueryUserOrderHistoryWallet = ({
    userId,
    walletId,
    params
  }: {
    userId?: string
    walletId?: string
    params?: Record<string, any>
  }) =>
    useInfiniteQuery<any, Error, any>({
      enabled: !!userId && !!walletId,
      queryKey: [
        WALLETS_QUERY_KEYS.USER_ORDER_HISTORY_WALLET,
        userId,
        walletId,
        JSON.stringify(params)
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await httpClient.get<OrderBalanceResponse>(
          `/wallets/${walletId}/users/${userId}/orders`,
          {
            params: {
              ...params,
              page: pageParam,
              size: params?.size || 20
            }
          }
        )
        return {
          content: [
            ...(response.data?.content?.orders?.content ?? []),
            ...(response.data?.content?.cryptoOrders?.content ?? [])
          ],
          totalElements:
            response.data?.content?.orders?.totalElements +
            response.data?.content?.cryptoOrders?.totalElements,
          totalPages: Math.max(
            response.data?.content?.orders?.totalPages,
            response.data?.content?.cryptoOrders?.totalPages
          )
        }
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const totalPages = lastPage.totalPages || 0
        const currentPage = allPages.length - 1
        return currentPage < totalPages - 1 ? currentPage + 1 : undefined
      }
    })

  return {
    useCreateWallet,
    useGetUserWallets,
    useGetUserWalletByCurrency,
    useUpdateMainWallet,
    useUpdateMainWallet2,
    useCheckBonusWalletCanBeUsed,
    useUserActiveBalance,
    useCheckUserActiveBalanceWallet,
    useFetchUserOrderBalanceWallet,
    useQueryUserOrderHistoryWallet,
    useInfiniteQueryUserOrderHistoryWallet
  }
}
