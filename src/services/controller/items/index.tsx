import { useMutation, useQuery } from '@tanstack/react-query'
import { httpClient } from '@/services/api'

// Query Key Constants
export const ITEMS_QUERY_KEYS = {
  ITEM: 'item',
  ITEMS: 'items',
  PLAYER_ITEMS: 'player-items',
  MY_ITEMS: 'my-items'
}

// Interfaces
export interface Item {
  id: string
  itemId: string
  name: string
  description: string
  type: string
  value: number
  currency: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface PlayerItem extends Item {
  playerId: string
  quantity: number
  acquiredAt: string
}

export interface CreateItemRequest {
  name: string
  description: string
  type: string
  value: number
  currency: string
}

export interface UpdateItemRequest {
  name?: string
  description?: string
  type?: string
  value?: number
  currency?: string
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface ItemsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    items: Item[]
    total: number
    page: number
    size: number
  }
}

export interface MyItemsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: PlayerItem[]
  playerId: string
  pageInfo: {
    totalPages: number
    totalElements: number
    first: boolean
    last: boolean
    empty: boolean
    size: number
    page: number
    numberOfElements: number
    sorted: boolean
  }
}

export interface PlayerItemsListResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: {
    items: PlayerItem[]
    total: number
    page: number
    size: number
  }
}

export interface ItemResponse {
  traceId: string
  timestamp: string
  contentType: string
  content: Item
}

export const itemsController = () => {
  // Get all MY items
  const useGetAllMyItems = (page: number = 0, size: number = 10) =>
    useQuery<MyItemsListResponse>({
      queryKey: [ITEMS_QUERY_KEYS.MY_ITEMS, page, size],
      queryFn: async () => {
        const response = await httpClient.get(
          '/loyalty/user/items?sort=DESC,acquiredAt',
          {
            params: { page, size }
          }
        )
        return response.data
      }
    })

  // Get all items
  const useGetAllItems = (page: number = 0, size: number = 10) =>
    useQuery<ItemsListResponse>({
      queryKey: [ITEMS_QUERY_KEYS.ITEMS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/items', {
          params: { page, size }
        })
        return response.data
      }
    })

  // Get single item by ID
  const useGetItem = (itemId: string) =>
    useQuery<ItemResponse>({
      queryKey: [ITEMS_QUERY_KEYS.ITEM, itemId],
      queryFn: async () => {
        const response = await httpClient.get(`/loyalty/items/${itemId}`)
        return response.data
      }
    })

  // Create new item
  const useCreateItem = () =>
    useMutation<ItemResponse, Error, CreateItemRequest>({
      mutationFn: async (data) => {
        const response = await httpClient.post('/loyalty/items', data)
        return response.data
      }
    })

  // Update item
  const useUpdateItem = () =>
    useMutation<
      ItemResponse,
      Error,
      { itemId: string; data: UpdateItemRequest }
    >({
      mutationFn: async ({ itemId, data }) => {
        const response = await httpClient.put(`/loyalty/items/${itemId}`, data)
        return response.data
      }
    })

  // Delete item
  const useDeleteItem = () =>
    useMutation<void, Error, string>({
      mutationFn: async (itemId) => {
        const response = await httpClient.delete(`/loyalty/items/${itemId}`)
        return response.data
      }
    })

  // Get player's items
  const useGetPlayerItems = (page: number = 0, size: number = 10) =>
    useQuery<PlayerItemsListResponse>({
      queryKey: [ITEMS_QUERY_KEYS.PLAYER_ITEMS, page, size],
      queryFn: async () => {
        const response = await httpClient.get('/loyalty/players/items', {
          params: { page, size }
        })
        return response.data
      }
    })

  // Add item to player
  const useAddItemToPlayer = () =>
    useMutation<PlayerItem, Error, { itemId: string; playerId: string }>({
      mutationFn: async ({ itemId, playerId }) => {
        const response = await httpClient.post(
          `/loyalty/players/items/${itemId}`,
          { playerId }
        )
        return response.data
      }
    })

  // Update player's item
  const useUpdatePlayerItem = () =>
    useMutation<
      PlayerItem,
      Error,
      { itemId: string; playerId: string; quantity: number }
    >({
      mutationFn: async ({ itemId, playerId, quantity }) => {
        const response = await httpClient.put(
          `/loyalty/players/items/${itemId}`,
          { playerId, quantity }
        )
        return response.data
      }
    })

  // Delete player's item
  const useDeletePlayerItem = () =>
    useMutation<void, Error, { itemId: string; playerId: string }>({
      mutationFn: async ({ itemId, playerId }) => {
        const response = await httpClient.delete(
          `/loyalty/players/items/${itemId}`,
          { data: { playerId } }
        )
        return response.data
      }
    })

  return {
    useGetAllMyItems,
    useGetAllItems,
    useGetItem,
    useCreateItem,
    useUpdateItem,
    useDeleteItem,
    useGetPlayerItems,
    useAddItemToPlayer,
    useUpdatePlayerItem,
    useDeletePlayerItem
  }
}
