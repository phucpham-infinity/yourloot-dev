import { useMediaQuery } from '@uidotdev/usehooks'
import { isMobile } from 'react-device-detect'

// xs: 0 - 599px
// sm: 600 - 743px
// md: 744 - 1079px
// lg: 1080 - 1439px
// xl: 1440px - infinity

export const useScreen = () => {
  const xs = useMediaQuery('only screen and (max-width: 599px)')
  const sm = useMediaQuery(
    'only screen and (min-width: 600px) and (max-width: 743px)'
  )
  const md = useMediaQuery(
    'only screen and (min-width: 744px) and (max-width: 1079px)'
  )
  const lg = useMediaQuery(
    'only screen and (min-width: 1080px) and (max-width: 1439px)'
  )
  const xl = useMediaQuery('only screen and (min-width: 1440px)')
  return {
    isMobile: xs,
    isDeviceMobile: isMobile,
    xs,
    sm,
    md,
    lg,
    xl,
    size: xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xl'
  }
}
