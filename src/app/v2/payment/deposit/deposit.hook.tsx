import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiatCurrencyCode, CryptoCurrencyCode } from '@/constants'
import { CTYPTO_BANNER } from '@/constants/banner.constants'

import { useWalletStore, useV2DepositStore, useProfileStore } from '@/store'
import { orderController } from '@/services/controller/orders'
import { getCurrencySymbol } from '@/utils'
import { useCreateOrderCrypto } from '@/components/v2/hooks'
import { useScreen } from '@/hooks'

export const useDeposit = () => {
  const { isMobile } = useScreen()
  const { t } = useTranslation()
  const profile = useProfileStore((s) => s.profile)
  const cryptoCurrency = useV2DepositStore((s) => s.cryptoCurrency)
  const network = useV2DepositStore((s) => s.network)

  const setIsOpenInputInfo = useV2DepositStore((s) => s.setIsOpenInputInfo)
  const setIsOpenCoinSelect = useV2DepositStore((s) => s.setIsOpenCoinSelect)
  const setSelectedCryptoCurrency = useV2DepositStore(
    (s) => s.setSelectedCryptoCurrency
  )
  const setSelectedMethod = useV2DepositStore((s) => s.setSelectedMethod)
  const setNetwork = useV2DepositStore((s) => s.setNetwork)
  const setMethod = useV2DepositStore((s) => s.setMethod)
  const setCryptoCurrency = useV2DepositStore((s) => s.setCryptoCurrency)
  const setPendingNetwork = useV2DepositStore((s) => s.setPendingNetwork)
  const setIsOpenCreateCryptoWallet = useV2DepositStore(
    (s) => s.setIsOpenCreateCryptoWallet
  )

  // const selectedMethod = useV2DepositStore((s) => s.selectedMethod)
  const [isShowMore, setIsShowMore] = useState(false)

  const { createOrderCrypto, isPendingCreateOrderCrypto } =
    useCreateOrderCrypto()

  const setIsOpenDepositFailed = useV2DepositStore(
    (s) => s.setIsOpenDepositFailed
  )
  const setIsOpenDepositSuccessful = useV2DepositStore(
    (s) => s.setIsOpenDepositSuccessful
  )
  const setIsOpenDepositTimeOut = useV2DepositStore(
    (s) => s.setIsOpenDepositTimeOut
  )
  const setSelectedNetwork = useV2DepositStore((s) => s.setSelectedNetwork)
  const status = useV2DepositStore((s) => s.status)

  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )

  const wallets = useWalletStore((state) => state.wallets)
  const defaultWallet = wallets.find((wallet) => wallet.isDefault)
  const defaultWalletCurrency = defaultWallet?.currency || ''

  const { data: isNSPKAvailable } = orderController().useCheckNSPKAvailable({
    userId: profile?.userId || ''
  })

  const clearDepositAlert = () => {
    setIsOpenDepositSuccessful(false)
    setIsOpenDepositFailed(false)
    setIsOpenDepositTimeOut(false)
  }

  const handleCreateOrderCrypto = ({
    network,
    cryptoCurrency
  }: {
    network: string
    cryptoCurrency: string
  }) => {
    if (!defaultWallet) return
    if (isPendingCreateOrderCrypto) return
    setSelectedMethod('cryptocurrency')
    setSelectedNetwork(network)
    setSelectedCryptoCurrency(cryptoCurrency)

    if (status === 'inProgress') {
      setOpenDepositInporcess(true)
      return
    }
    const wallet = wallets.find((w) => w.currency === cryptoCurrency)
    setMethod('cryptocurrency')
    setCryptoCurrency(cryptoCurrency)
    setNetwork(network)

    if (!wallet) {
      setPendingNetwork(network)
      setIsOpenCreateCryptoWallet(true, () => {
        createOrderCrypto({
          network,
          cryptoCurrency
        })
      })
    } else {
      createOrderCrypto({
        network,
        cryptoCurrency
      })
    }
  }

  const handleSelectBankMethod = (method: any) => {
    setSelectedMethod(method)
    setIsOpenInputInfo(true, method)
  }

  const methodsFiat = [
    {
      id: '1-click-pay',
      title: '1 Click Pay',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute top-[-16px] right-[-18px]">
            <img src="/images/payment/1-click.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 1 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('1-click-pay')
      }
    },
    {
      id: 'mobile',
      title: 'Mobile',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-18px] left-[-72px] z-[3]">
            <img src="/images/payment/mobile.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 100 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('mobile')
      }
    },
    {
      id: 'sber-pay',
      title: 'SberPay',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-64px]">
            <img src="/images/payment/SberPay.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 1 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('sber-pay')
      }
    },
    {
      id: 'fps-alfa',
      title: 'Alfa',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-74px]">
            <img src="/images/payment/alfa.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 1 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('fps-alfa')
      }
    },
    {
      id: 'ozon',
      title: 'Ozon',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-74px]">
            <img src="/images/payment/T-Pay.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 100 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isShow: false,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      onClick: () => {
        handleSelectBankMethod('ozon')
      }
    },

    {
      id: 'sber',
      title: 'Sber',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/serb.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 1 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('sber')
      }
    },
    {
      id: 'fps-cis',
      title: 'FPS CIS',
      rightBanner: (
        <>
          <div className="h-[24px] w-[24px] absolute top-[0px] right-[38px] z-[2]">
            <img src="/images/v2/deposit/Flags.svg" className="h-full" />
          </div>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/fast.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 3 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('fps-cis')
      }
    },

    {
      id: 't-pay',
      title: 'T-Pay',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-64px]">
            <img src="/images/payment/T-Pay.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 500 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('t-pay')
      }
    },
    {
      id: 'see-more',
      title: 'See more',
      rightBanner: (
        <>
          <div className="h-[72px] w-[72px] absolute bottom-[-10px] right-[-14px]">
            <img src="/images/v2/deposit/more.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `+2 methods`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      isShowMoreButton: false,
      onClick: () => {
        setIsShowMore(!isShowMore)
      }
    },
    {
      id: 'fps',
      title: t('depositWithdrawV2.methods.fps', 'FPS'),
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-74px]">
            <img src="/images/payment/FPS.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 3 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('fps')
      }
    },
    {
      id: 'uzcard',
      title: t('depositWithdrawV2.methods.uzcard', 'Uzcard'),
      rightBanner: (
        <>
          <div className="h-[86px] w-[100px] absolute bottom-[-16px] left-[-60px]">
            <img src="/images/payment/uzcard.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 10 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['UZS'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('uzcard')
      }
    },
    {
      id: 'humo',
      title: t('depositWithdrawV2.methods.humo', 'Humo'),
      rightBanner: (
        <>
          <div className="h-[86px] w-[100px] absolute bottom-[-16px] left-[-64px]">
            <img src="/images/payment/humo.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 10 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['UZS'].includes(defaultWalletCurrency),
      isShow: true,
      onClick: () => {
        handleSelectBankMethod('humo')
      }
    },
    {
      id: 'fps-abkhazia',
      title: (
        <span className="!leading-[17px]">
          FPS to <br />
          Abkhazia
        </span>
      ),
      rightBanner: (
        <>
          <div className="h-[24px] w-[50px] absolute top-[0px] right-[12px] z-[2]">
            <img src="/images/v2/deposit/MNP.svg" className="h-full" />
          </div>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/fast.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 3 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('fps-abkhazia')
      }
    },
    {
      id: 'psb',
      title: 'PSB',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/psb.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 500 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('psb')
      }
    },
    {
      id: 'wb',
      title: 'WB',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/wb.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 500 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('wb')
      }
    },
    {
      id: 'yandex',
      title: 'Yandex',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/yandex.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 500 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('yandex')
      }
    },
    {
      id: 'yukassa',
      title: 'ЮKassa',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/kassa.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 300 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('yukassa')
      }
    },
    {
      id: 'bank-card',
      title: 'Bank Cards',
      rightBanner: (
        <>
          <div className="h-[88px] w-[100px] absolute bottom-[-16px] left-[-64px]">
            <img src="/images/payment/bank-card.png" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 5 000 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('bank-card')
      }
    },
    {
      id: 'vtb',
      title: 'VTB',
      rightBanner: (
        <>
          <div className="h-[64px] w-[100px] absolute bottom-[-16px] left-[-52px]">
            <img src="/images/v2/deposit/vtb.svg" className="h-full" />
          </div>
        </>
      ),
      subtitle: `from 500 ${getCurrencySymbol(defaultWalletCurrency)}`,
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      isShow: false,
      onClick: () => {
        handleSelectBankMethod('vtb')
      }
    }
  ]
  const methodsCrypto = [
    {
      id: 'usdt-erc20',
      title: 'USDT (ERC20)',
      network: 'ERC20',
      giftLabel: '+7%',
      col: 6,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'ERC20',
      isActive: true,
      isShow: true,
      rightBanner: CTYPTO_BANNER['usdt-erc20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'ERC20', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-trc20',
      title: 'USDT (TRC20)',
      network: 'TRC20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'TRC20',
      rightBanner: CTYPTO_BANNER['usdt-trc20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'TRC20', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-bep20',
      title: 'USDT (BEP20)',
      network: 'BEP20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'BEP20',
      rightBanner: CTYPTO_BANNER['usdt-bep20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'BEP20', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-solana',
      title: 'USDT (Solana)',
      network: 'Solana',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'Solana',
      rightBanner: CTYPTO_BANNER['usdt-solana'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Solana', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-polygon',
      title: 'USDT (Polygon)',
      network: 'Polygon',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'Polygon',
      rightBanner: CTYPTO_BANNER['usdt-polygon'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Polygon', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-ton',
      title: 'USDT (TON)',
      network: 'TON',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'TON',
      rightBanner: CTYPTO_BANNER['usdt-ton'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'TON', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-arbitrum',
      title: 'USDT (Arbitrum One)',
      network: 'Arbitrum',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'Arbitrum',
      rightBanner: CTYPTO_BANNER['usdt-arbitrum'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Arbitrum', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-optimism',
      title: 'USDT (Optimism)',
      network: 'Optimism',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'Optimism',
      rightBanner: CTYPTO_BANNER['usdt-optimism'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Optimism', cryptoCurrency: 'USDT' })
      }
    },
    {
      id: 'usdt-avalanche',
      title: 'USDT (Avalanche C-Chain)',
      network: 'Avalanche',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'USDT' &&
        network === 'Avalanche',
      rightBanner: CTYPTO_BANNER['usdt-avalanche'],
      onClick: () => {
        handleCreateOrderCrypto({
          network: 'Avalanche',
          cryptoCurrency: 'USDT'
        })
      }
    },
    {
      id: 'btc-bitcoin',
      title: 'BTC (Bitcoin)',
      network: 'Bitcoin',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'BTC' &&
        network === 'Bitcoin',
      rightBanner: CTYPTO_BANNER['btc-bitcoin'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Bitcoin', cryptoCurrency: 'BTC' })
      }
    },
    {
      id: 'btc-bep20',
      title: 'BTC (BEP20)',
      network: 'BEP20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'BTC' &&
        network === 'BEP20',
      rightBanner: CTYPTO_BANNER['btc-bep20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'BEP20', cryptoCurrency: 'BTC' })
      }
    },
    {
      id: 'eth-erc20',
      title: 'ETH (ERC20)',
      network: 'ERC20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'ETH' &&
        network === 'ERC20',
      rightBanner: CTYPTO_BANNER['eth-erc20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'ERC20', cryptoCurrency: 'ETH' })
      }
    },
    {
      id: 'eth-arbitrum',
      title: 'ETH (Arbitrum One)',
      network: 'Arbitrum',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'ETH' &&
        network === 'Arbitrum',
      rightBanner: CTYPTO_BANNER['eth-arbitrum'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Arbitrum', cryptoCurrency: 'ETH' })
      }
    },
    {
      id: 'eth-bep20',
      title: 'ETH (BEP20)',
      network: 'BEP20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'ETH' &&
        network === 'BEP20',
      rightBanner: CTYPTO_BANNER['eth-bep20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'BEP20', cryptoCurrency: 'ETH' })
      }
    },
    {
      id: 'ton-toncoin',
      title: 'TON (Toncoin)',
      network: 'TON',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'TON' &&
        network === 'TON',
      rightBanner: CTYPTO_BANNER['ton-toncoin'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'TON', cryptoCurrency: 'TON' })
      }
    },
    {
      id: 'tron-trc20',
      title: 'Tron (TRC20)',
      network: 'TRC20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'TRX' &&
        network === 'TRC20',
      rightBanner: CTYPTO_BANNER['tron-trc20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'TRC20', cryptoCurrency: 'TRX' })
      }
    },
    {
      id: 'ltc-litecoin',
      title: 'LTC (Litecoin)',
      network: 'Litecoin',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'LTC' &&
        network === 'Litecoin',
      rightBanner: CTYPTO_BANNER['ltc-litecoin'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'Litecoin', cryptoCurrency: 'LTC' })
      }
    },
    {
      id: 'bnb-bep20',
      title: 'BNB (BEP20)',
      network: 'BEP20',
      giftLabel: '+7%',
      col: 6,
      isActive: true,
      isShow: true,
      isLoading:
        isPendingCreateOrderCrypto &&
        cryptoCurrency === 'BNB' &&
        network === 'BEP20',
      rightBanner: CTYPTO_BANNER['bnb-bep20'],
      onClick: () => {
        handleCreateOrderCrypto({ network: 'BEP20', cryptoCurrency: 'BNB' })
      }
    }
  ]
  const methods = [
    {
      id: 'cryptocurrency',
      title: t('depositWithdrawV2.methods.crypto', 'Crypto'),
      iconSrcs: [
        '/images/crypto/Btc.svg',
        '/images/crypto/ETH ERC20.svg',
        '/images/more.svg'
      ],
      rightBanner: <img src="/images/crypto/Btc.svg" className="w-5 h-5" />,
      subtitle: 'BTC',
      iconClasses: ['w-5 h-5', 'w-5 h-5', 'w-5 h-5'],
      badge: t('depositWithdrawV2.methods.cryptoBonus', '+7% Bonus'),
      badgeColor: 'purple',
      col: !isMobile ? 6 : defaultWalletCurrency === 'RUB' ? 6 : 12,
      isActive: [...FiatCurrencyCode, ...CryptoCurrencyCode].includes(
        defaultWalletCurrency
      ),
      onClick: () => {
        if (isMobile) {
          setSelectedMethod('cryptocurrency')
        } else {
          clearDepositAlert()
          setIsOpenCoinSelect(true)
        }
      },
      onMobileClick: () => {
        setSelectedMethod('cryptocurrency')
      }
    },
    {
      id: 'bank-card',
      title: t('depositWithdrawV2.methods.bankCards', 'Bank Cards'),
      iconSrcs: ['/images/bank-card.svg'],
      iconClasses: ['h-6'],
      col: 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      onClick: () => {
        clearDepositAlert()
        setIsOpenInputInfo(true, 'bank-card')
        setSelectedMethod('bank-card')
      }
    },
    {
      id: 'fps-cis',
      title: t('depositWithdrawV2.methods.fpsQr', 'FPS CIS'),
      iconSrcs: ['/images/sbp.svg', '/images/flags.svg'],
      iconClasses: ['h-5', 'h-5'],
      col: isMobile ? 6 : 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      onClick: () => {
        clearDepositAlert()
        setIsOpenInputInfo(true, 'fps-cis')
        setSelectedMethod('fps-cis')
      }
    },
    {
      id: 't-pay',
      title: t('depositWithdrawV2.methods.tPay', 'T-Pay'),
      iconSrcs: ['/images/tpay.svg'],
      iconClasses: ['h-5'],
      col: isMobile ? 6 : 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      onClick: () => {
        clearDepositAlert()
        setIsOpenInputInfo(true, 't-pay')
        setSelectedMethod('t-pay')
      }
    },
    {
      id: 'yukassa',
      title: t('depositWithdrawV2.methods.yukassa', 'ЮKassa'),
      iconSrcs: ['/images/yukassa.svg'],
      iconClasses: ['h-5'],
      col: isMobile ? 6 : 6,
      isActive: ['RUB'].includes(defaultWalletCurrency) && !isNSPKAvailable,
      onClick: () => {
        clearDepositAlert()
        setIsOpenInputInfo(true, 'yukassa')
        setSelectedMethod('yukassa')
      }
    },
    {
      id: 'fps-alfa',
      title: t('depositWithdrawV2.methods.alfa', 'Alfa Bank'),
      iconSrcs: ['/images/alfa.svg'],
      iconClasses: ['h-5'],
      col: isMobile ? 6 : 6,
      isActive: ['RUB'].includes(defaultWalletCurrency),
      onClick: () => {
        clearDepositAlert()
        setIsOpenInputInfo(true, 'fps-alfa')
        setSelectedMethod('fps-alfa')
      }
    }
  ]

  const tabsHeight = useMemo(() => {
    const activeMethodsCount = methods.filter(
      (method) => method.isActive
    ).length

    let rows = 0
    if (activeMethodsCount > 0) {
      if (activeMethodsCount <= 2) {
        rows = 1
      } else {
        rows = 1 + Math.ceil((activeMethodsCount - 2) / 3)
      }
    }
    const actionsHeight = rows * 81 + (rows - 1) * 16 + 50 + 110
    return actionsHeight
  }, [methods, defaultWalletCurrency, wallets])

  const methodsActive = methods.filter((method) => method.isActive)
  const methodsActiveFiat = methodsFiat.filter(
    (method) => method.isActive && method.isShow
  )
  const methodsActiveCrypto = methodsCrypto.filter(
    (method) => method.isActive && method.isShow
  )

  return {
    methods,
    methodsFiat,
    methodsCrypto,
    methodsActive,
    methodsActiveFiat,
    methodsActiveCrypto,
    defaultWalletCurrency,
    tabsHeight,
    clearDepositAlert,
    setSelectedMethod,
    setIsOpenInputInfo,
    setIsOpenCoinSelect
  }
}
