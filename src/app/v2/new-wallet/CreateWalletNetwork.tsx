import { CustomDrawer } from '@/components/common/custom-drawer'
import { cryptoCurrencyNetworkKey } from '@/constants'
import useToast from '@/hooks/use-toast'
import { walletsController } from '@/services/controller'
import { useAuthStore, useV2WalletStore } from '@/store'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const CreateWalletNetworkV2 = () => {
  const toast = useToast()
  const { t } = useTranslation()
  const { userId } = useAuthStore()
  const { useCreateWallet } = walletsController()
  const isOpenSelectNetwork = useV2WalletStore((s) => s.isOpenSelectNetwork)
  const setIsOpenSelectNetwork = useV2WalletStore(
    (s) => s.setIsOpenSelectNetwork
  )
  const setWalletId = useV2WalletStore((s) => s.setWalletId)
  const cryptoCurrency = useV2WalletStore((s) => s.currency)
  const networks = cryptoCurrencyNetworkKey[cryptoCurrency ?? '']?.networks
  const setIsCreateWalletSuccessfull = useV2WalletStore(
    (s) => s.setIsCreateWalletSuccessfull
  )

  const {
    mutate: createWallet,
    isPending: isPendingCreate,
    data: walletData,
    isError: isError
  } = useCreateWallet()

  const handleSelectNetwork = (network: string) => {
    createWallet({
      userId: userId || '',
      currency: cryptoCurrency!,
      network: network!,
      initialBalance: 0
    })
  }

  useEffect(() => {
    if (walletData) {
      setWalletId(walletData?.content?.id || '')
      setIsOpenSelectNetwork(false)
      setIsCreateWalletSuccessfull(true)
    }
  }, [walletData])

  useEffect(() => {
    if (isError) {
      setIsCreateWalletSuccessfull(false)
      toast.error(
        t('faq.sections.newWallet.createWalletError', 'Create wallet error'),
        {
          position: 'top-right'
        }
      )
    }
  }, [isError])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('faq.sections.newWallet.selectNetwork', 'Select Network')}
          </div>
        </div>
      }
      open={isOpenSelectNetwork}
      onOpenChange={(open) => setIsOpenSelectNetwork(open)}
    >
      {isPendingCreate ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {networks?.map((networkItem) => (
            <div
              key={networkItem.id}
              className="flex flex-col items-start gap-1 p-3 rounded-[10px] border-app-default"
              onClick={() => handleSelectNetwork(networkItem.network)}
            >
              <div className="flex-shrink-0">
                  {networkItem.icon}
              </div>

              <div className="items-start text-left text-white text-[14px] whitespace-nowrap">
                {networkItem.network}
              </div>
            </div>
          ))}
        </div>
      )}
    </CustomDrawer>
  )
}

export default CreateWalletNetworkV2
