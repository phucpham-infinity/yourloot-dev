import MainIcon from '@/assets/images/create-crypto-wallet.svg'
import { CustomDrawer } from '@/components/common/dw-drawer'
import { useToast } from '@/hooks/use-toast'
import { walletsController } from '@/services/controller/wallets'
import { useProfileStore, useV2DepositStore } from '@/store'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '@/components/common/custom-button'

const DepositCreateCryptoWallet = () => {
  const { useCreateWallet, useUpdateMainWallet2 } = walletsController()

  const { profile } = useProfileStore()
  const toast = useToast()
  const { t } = useTranslation()

  const isOpenCreateCryptoWallet = useV2DepositStore(
    (s) => s.isOpenCreateCryptoWallet
  )
  const setIsOpenCreateCryptoWallet = useV2DepositStore(
    (s) => s.setIsOpenCreateCryptoWallet
  )
  const network = useV2DepositStore((s) => s.network)
  const cryptoCurrency = useV2DepositStore((s) => s.cryptoCurrency)
  const onCreateWalletSuccess = useV2DepositStore(
    (s) => s.onCreateWalletSuccess
  )
  const setIsOpenSelectNetwork = useV2DepositStore(
    (s) => s.setIsOpenSelectNetwork
  )
  const {
    mutateAsync: updateMainWallet,
    isPending: isPendingUpdateMainWallet
  } = useUpdateMainWallet2()

  const {
    mutate: createWallet,
    isPending: isPendingCreateWallet,
    data: createWalletData,
    isError: isErrorCreateWallet
  } = useCreateWallet()

  const handleCreateWallet = () => {
    createWallet({
      currency: cryptoCurrency ?? '',
      network: network ?? '',
      userId: profile?.userId!,
      initialBalance: 0
    })
  }
  const handleCreateWalletSuccess = async () => {
    setIsOpenCreateCryptoWallet(false)
    onCreateWalletSuccess?.()
    try {
      await updateMainWallet({
        walletId: createWalletData?.content?.id,
        userId: profile?.userId!,
        currency: cryptoCurrency ?? ''
      } as any)
    } catch (error) {
      console.error(error)
      setIsOpenCreateCryptoWallet(false)
      toast.error('Primary wallet changed error.')
    }
  }

  useEffect(() => {
    if (createWalletData) {
      handleCreateWalletSuccess()
    }
  }, [createWalletData])

  useEffect(() => {
    if (isErrorCreateWallet) {
      setIsOpenCreateCryptoWallet(false)
      toast.error('Create wallet error.')
    }
  }, [isErrorCreateWallet])

  return (
    <CustomDrawer
      title={
        <div className="flex items-center justify-center w-full gap-2">
          <div className="text-app-medium-16">
            {t('wallet.createTitle', { defaultValue: 'Create Wallet' })}
          </div>
        </div>
      }
      open={isOpenCreateCryptoWallet}
      onOpenChange={(open) => setIsOpenCreateCryptoWallet(open)}
      name="DepositCreateCryptoWallet"
      type="deposit"
    >
      <div
        data-name="DepositCreateCryptoWallet"
        className="flex flex-col items-center gap-4"
      >
        <img src={MainIcon} className="w-20 h-20" />
        <div className="text-app-medium-14">
          {t('wallet.walletRequired', {
            cryptoCurrency: cryptoCurrency ?? ''
          })}{' '}
        </div>
        <div className="text-app-medium-12 w-[70%] text-center text-[#9E90CF]">
          {t('wallet.createDescription', {
            defaultValue:
              'You don’t have a wallet in this currency. Create one to continue.'
          })}
        </div>
        <div className="flex flex-row w-full gap-2 pt-4">
          <CustomButton
            label={t('common.create', { defaultValue: 'Create' })}
            variant="default"
            className="w-[48%]"
            onClick={handleCreateWallet}
            isLoading={isPendingCreateWallet || isPendingUpdateMainWallet}
          />
          <CustomButton
            label={t('common.close', { defaultValue: 'Close' })}
            variant="muted"
            className="w-[48%]"
            onClick={() => {
              setIsOpenCreateCryptoWallet(false)
              setIsOpenSelectNetwork(true)
            }}
          />
        </div>
      </div>
    </CustomDrawer>
  )
}

export default DepositCreateCryptoWallet
