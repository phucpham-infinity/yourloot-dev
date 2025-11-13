import NewWalletMobile from './components/NewWalletMobile'
import NewWalletDesktop from './components/NewWalletDesktop'

export default function NewWalletLayoutV2({
  hideHeader = false,
  twoColumns = false
}: {
  hideHeader?: boolean
  twoColumns?: boolean
}) {
  // Wrapper component to delegate to platform-specific implementations
  // Keep API compatible with previous default export
  if (twoColumns) {
    return <NewWalletDesktop />
  }
  return <NewWalletMobile hideHeader={hideHeader} />
}
