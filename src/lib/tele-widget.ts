import { Buffer } from 'buffer'

export const utf8ToBase64 = (user: Record<string, unknown>) => {
  if (typeof user !== 'object' || user === null) return ''

  const cleanedObj = trimObjectValues(user)

  const str = JSON.stringify(cleanedObj)
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export const trimObjectValues = <T extends Record<string, unknown>>(
  obj: T
): T => {
  if (typeof obj !== 'object' || obj === null) return obj
  const result: Record<string, unknown> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key] as unknown
      result[key] = typeof value === 'string' ? (value as string).trim() : value
    }
  }
  return result as T
}
