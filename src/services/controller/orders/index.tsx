import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'
import { toast } from 'react-toastify'

// Query Key Constants
export const ORDERS_QUERY_KEYS = {
  ORDER: 'order',
  CHECK_NSPK_AVAILABLE: 'check-nspk-available',
  WAGERS: 'wagers'
}

// Interfaces
export interface Order {
  orderId: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  paymentMethod: string
  paymentDetails: Record<string, any>
  shippingAddress?: ShippingAddress
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  itemId: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface ShippingAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneNumber: string
}

export interface CreateOrderRequest {
  userId: string
  currency: string
  paymentMethod: string
  paymentSystem: string
  userIp: string
  card: string
  owner: string
  amount: number
  bank: string
  orderType: 'DEPOSIT' | 'WITHDRAWAL'
  extra: {
    userAgent: string
    fingerprint: string | null
    registeredAt: number
  }
}

export interface CreateOrderCryptoRequest {
  userId: string
  currency: string
  orderType: 'DEPOSIT' | 'WITHDRAWAL'
  network: string
}

export interface OrderCallbackRequest {
  orderId: string
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  transactionId?: string
  paymentDetails?: Record<string, any>
}

export interface OrderResponse {
  success: boolean
  externalID: string
  phoneNumber: string
  bankName?: string
  amount: number
  status: string
  cardHolderName?: string
  walletName?: string
  card?: string
  cardNumber?: string
  successUrl?: string
  orderId?: string
}

export interface OrderCryptoResponse {
  orderId: string
  address: string
  destinationTag: number
  result: number
  walletName?: string
  network?: string
  cryptocurrencyName?: string
}

export const orderController = () => {
  // Create order
  const useCreateOrderBank = () =>
    useMutation<any, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post('/wallets/orders', data)
        return response.data?.content
      }
    })

  const useCreateCardOrder = () =>
    useMutation<any, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/card',
          data
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useCreateSbpOrder = () =>
    useMutation<any, Error, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/sbp',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateTpayOrder = () =>
    useMutation<OrderResponse, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/t-pay',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateSbpSberOrder = () =>
    useMutation<OrderResponse, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/fps-sber',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateNSPKOrder = () =>
    useMutation<OrderResponse, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/nspk',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateRedirectPayOrder = () =>
    useMutation<OrderResponse, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/redirect-pay',
          data
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useCreateOrderCrypto = () =>
    useMutation<any, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/crypto',
          data
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useCreateOrderAlfa = () =>
    useMutation<any, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/fps-alfa',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateOrderB2b = () =>
    useMutation<any, Error, any>({
      onError: () => {
        toast.error('Oops! Attempt failed! Please try again 😊')
      },
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/b2b',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCheckNSPKAvailable = ({ userId }: { userId: string }) =>
    useQuery<any, Error, any>({
      queryKey: [ORDERS_QUERY_KEYS.CHECK_NSPK_AVAILABLE, userId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/wallets/deposits/users/${userId}/is-nspk-available`
        )
        return response.data?.content
      }
    })

  // Process order callback
  const useProcessOrderCallback = () =>
    useMutation<OrderResponse, Error, OrderCallbackRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/orders/callback', data)
        return response.data?.content
      }
    })

  const useCreateCancelOrder = () =>
    useMutation<OrderResponse, Error, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/operations/cancel',
          data
        )
        return response.data?.content
      }
    })

  const useCreateSbpWithdrawOrder = () =>
    useMutation<any, any, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/withdrawals/sbp',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateBankCardWithdrawOrder = () =>
    useMutation<any, any, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/withdrawals/bank-card',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useCreateCryptoWithdrawOrder = () =>
    useMutation<any, any, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/withdrawals/crypto',
          data,
          import.meta.env.VITE_APP_MODE === 'development'
            ? {
                baseURL: 'http://localhost:3001'
              }
            : {}
        )
        return response.data?.content
      }
    })

  const useGetOrderStatus = ({
    userId,
    orderId,
    isProcessing
  }: {
    userId: string
    orderId: string
    isProcessing: boolean
  }) =>
    useQuery<any, Error, any>({
      enabled: !!userId && !!orderId,
      refetchInterval: isProcessing ? 5000 : false,
      queryKey: ['order', userId, orderId],
      queryFn: async () => {
        const response = await httpClient.get(
          `/wallets/users/${userId}/orders/${orderId}/operation-status`
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useGetWagers = ({
    walletId,
    userId
  }: {
    walletId: string
    userId: string
  }) =>
    useQuery<
      any,
      Error,
      {
        amountToMainWager: number
        isWageringRequirementsMet: boolean
        walletId: string
      }
    >({
      queryKey: [ORDERS_QUERY_KEYS.WAGERS, walletId, userId],
      enabled: !!walletId && !!userId,
      queryFn: async () => {
        const response = await httpClient.get(
          `/wallets/${walletId}/users/${userId}/wagers`
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useMutationWagers = () =>
    useMutation<any, Error, any>({
      mutationFn: async ({
        walletId,
        userId
      }: {
        walletId: string
        userId: string
      }) => {
        const response = await httpClient.get(
          `/wallets/${walletId}/users/${userId}/wagers`
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  const useConfirmationSbpOrder = () =>
    useMutation<any, Error, any>({
      mutationFn: async (data) => {
        const response = await httpClient.post(
          '/wallets/deposits/sbp/confirmation',
          data
          // import.meta.env.VITE_APP_MODE === 'development'
          //   ? {
          //       baseURL: 'http://localhost:3001'
          //     }
          //   : {}
        )
        return response.data?.content
      }
    })

  return {
    useCreateCardOrder,
    useCreateOrderBank,
    useProcessOrderCallback,
    useCreateOrderCrypto,
    useCreateSbpOrder,
    useCreateSbpWithdrawOrder,
    useGetOrderStatus,
    useCreateCryptoWithdrawOrder,
    useCreateSbpSberOrder,
    useCreateTpayOrder,
    useCreateRedirectPayOrder,
    useCreateCancelOrder,
    useCreateBankCardWithdrawOrder,
    useCheckNSPKAvailable,
    useCreateNSPKOrder,
    useGetWagers,
    useCreateOrderAlfa,
    useConfirmationSbpOrder,
    useCreateOrderB2b,
    useMutationWagers
  }
}
