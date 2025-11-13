import flagsmith from 'flagsmith'

export interface FeatureFlagsConfig {
  environmentKey: string
  apiUrl?: string
  enableAnalytics?: boolean
}

export const featureFlags = flagsmith

export async function initFeatureFlags(config?: Partial<FeatureFlagsConfig>) {
  const environmentKey = (config?.environmentKey ||
    import.meta.env.VITE_FLAGSMITH_ENV_KEY) as string
  const apiUrl = (config?.apiUrl || import.meta.env.VITE_FLAGSMITH_API_URL) as
    | string
    | undefined
  if (!environmentKey) return

  await flagsmith.init({
    environmentID: environmentKey,
    api: apiUrl,
    cacheFlags: true,
    enableAnalytics: Boolean(config?.enableAnalytics ?? false),
    onChange: () => {}
  })
}

export function hasFlag(flag: string): boolean {
  try {
    return flagsmith.hasFeature(flag)
  } catch {
    return false
  }
}

export function getFlagValue<T = unknown>(flag: string): T | null {
  try {
    const value = flagsmith.getValue(flag)
    return (value as unknown as T) ?? null
  } catch {
    return null
  }
}
