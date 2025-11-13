import { useTranslation } from 'react-i18next'
import { useProfileStore, useV2WithdrawStore, useWalletStore } from '@/store'
import { CryptoCurrencyCode, cryptoCurrencyNetworkKey } from '@/constants'
import { orderController } from '@/services/controller/orders'
import { getCurrencySymbol } from '@/utils/currency-symbol'
import { CTYPTO_BANNER } from '@/constants/banner.constants'

export const useWithdraw = () => {
  const { t } = useTranslation()
  const wallets = useWalletStore((state) => state.wallets)
  const profile = useProfileStore((s) => s.profile)

  const setIsOpenInputInfo = useV2WithdrawStore((s) => s.setIsOpenInputInfo)
  const setIsOpenWithdrawUnavailable = useV2WithdrawStore(
    (s) => s.setIsOpenWithdrawUnavailable
  )
  const status = useV2WithdrawStore((s) => s.status)
  const defaultWallet = wallets.find((wallet) => wallet.isDefault)

  const { mutateAsync: getWagersAsync, isPending: isPendingGetWagers } =
    orderController().useMutationWagers()

  const handleStartWithDraw = async (method: any) => {
    const wagers = await getWagersAsync({
      walletId: defaultWallet?.id || '',
      userId: profile?.userId || ''
    })
    if (
      !wagers?.isWageringRequirementsMet &&
      Number(wagers?.amountToMainWager) !== 0
    ) {
      setIsOpenWithdrawUnavailable(true)
      return
    }
    if (status === 'inProgress') {
      setIsOpenWithdrawUnavailable(true)
    } else {
      setIsOpenInputInfo(true, method)
    }
  }

  const defaultWalletCurrency = defaultWallet?.currency || ''
  const defaultWalletNetwork = defaultWallet?.network || ''

  const cryptoIcon = cryptoCurrencyNetworkKey[defaultWalletCurrency]?.icon

  const methods = [
    // {
    //   id: 'bank-card',
    //   title: t('depositWithdrawV2.methods.bankCards', 'Bank Cards'),
    //   badge: null,
    //   iconSrc: '/images/bank-card.svg',
    //   iconClass: 'h-6',
    //   col: 6,
    //   isActive: ['RUB'].includes(defaultWalletCurrency),
    //   subtitle: `from 5 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
    //   rightBanner: (
    //     <>
    //       <div className="h-[30px] w-[60px] absolute top-[30px] left-[-50px] z-[3]">
    //         <img src="/images/v2/deposit/visa.svg" className="h-full" />
    //       </div>
    //       <div className="h-[32px] w-[100px] absolute bottom-[-16px] left-[-32px] z-[2]">
    //         <img src="/images/v2/deposit/mc.svg" className="h-full" />
    //       </div>
    //       <div className="h-[52px] w-[120px] absolute top-[0px] left-[-28px] z-[1]">
    //         <img src="/images/v2/deposit/mir.svg" className="h-full" />
    //       </div>
    //     </>
    //   ),
    //   onClick: () => {
    //     handleStartWithDraw('bank-card')
    //   }
    // },
    {
      id: 'fps',
      title: t('depositWithdrawV2.methods.fps', 'FPS'),
      badge: null,
      iconSrc: '/images/sbp.svg',
      iconClass: 'h-5',
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isLoading: isPendingGetWagers,
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-74px]">
            <img src="/images/payment/FPS.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 3 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      onClick: () => {
        handleStartWithDraw('fps')
      }
    },
    {
      id: 'cryptocurrency',
      title: `${defaultWalletCurrency} ${defaultWalletNetwork || ''}`,
      badge: null,
      iconSrc: cryptoIcon ? null : '/images/crypto/Btc.svg',
      iconClass: 'h-5',
      cryptoIcon,
      isLoading: isPendingGetWagers,
      col: 6,
      subtitle: `from 5 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      isActive: [...CryptoCurrencyCode].includes(defaultWalletCurrency),
      rightBanner: (CTYPTO_BANNER as any)?.[
        `${defaultWalletCurrency}-${defaultWalletNetwork}`.toLowerCase()
      ],
      onClick: () => {
        handleStartWithDraw('cryptocurrency')
      }
    }
  ]

  const methodsActive = methods.filter((method) => method.isActive)

  return {
    methods,
    methodsActive,
    defaultWalletCurrency,
    defaultWalletNetwork,
    cryptoIcon,
    handleStartWithDraw
  }
}
