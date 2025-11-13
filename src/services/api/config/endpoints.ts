export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },
    USER: {
      BASE: '/users',
      PROFILE: '/users/profile',
      BY_ID: (id: string) => `/users/${id}`,
    },
    PRODUCTS: {
      BASE: '/products',
      BY_ID: (id: string) => `/products/${id}`,
      CATEGORIES: '/products/categories',
    }
  } as const;