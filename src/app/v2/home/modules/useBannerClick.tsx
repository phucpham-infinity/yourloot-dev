import { useAuthStore } from '@/store'
import { useNavigate } from 'react-router-dom'

export const useBannerClick = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  const handleBannerClick = (bannerTo?: string) => {
    if (!bannerTo) return

    // Check if this is a welcome bonus or crypto bonus banner
    const isWelcomeBonusLink =
      (bannerTo.includes('/v2/promotion/active') && bannerTo.includes('/')) ||
      bannerTo.includes('promotion')
    const isCryptoBonusLink =
      (bannerTo.includes('/v2/promotion/available') &&
        bannerTo.includes('crypto')) ||
      bannerTo.includes('promotion')

    const isBonusBanner = isWelcomeBonusLink || isCryptoBonusLink

    if (isBonusBanner && !isAuthenticated) {
      // User is not logged in and clicked on a bonus banner
      // Mobile: redirect to login page
      navigate('/auth/login')
    } else {
      // Normal navigation for logged in users or non-bonus banners
      navigate(bannerTo)
    }
  }

  return { handleBannerClick }
}
