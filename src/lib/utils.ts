import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export { css } from '@emotion/react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DOMAIN_IMAGE_LOOT = 'https://usercontent.cc/i/s6'
export const DOMAIN_IMAGE_LOOT_BANNER = 'https://usercontent.cc/b'
export const DOMAIN_IMAGE_PROVIDER_LOOT = 'https://usercontent.cc'

export const WIDTH_SIDEBAR = 62
export const WIDTH_SIDEBAR_EXPANDED = 233
