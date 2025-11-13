import FingerprintJS from '@fingerprintjs/fingerprintjs'

let cachedFingerprint: string | null = null

export const getFingerprint = async (): Promise<string> => {
  if (cachedFingerprint) {
    return cachedFingerprint
  }

  try {
    // Initialize an agent at application startup
    const fpPromise = FingerprintJS.load()
    
    // Get the visitor identifier when you need it
    const fp = await fpPromise
    const result = await fp.get()
    
    // Store the fingerprint in cache
    cachedFingerprint = result.visitorId
    return cachedFingerprint
  } catch (error) {
    console.error('Error generating fingerprint:', error)
    return 'fallback-fingerprint'
  }
} 