import { environments } from '@/environments'
interface RefreshTokenRequest {
  refreshToken: string
  userId: string
}

interface RefreshTokenResponse {
  token: string
  refreshToken: string
}

export const tokenController = () => {
  const refreshToken = async (
    data: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await fetch(`${environments.apiConfig.uri}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: data.refreshToken,
        userId: data.userId
      })
    })
    const result = await response.json()
    return result?.content
  }

  return {
    refreshToken
  }
}
