import { cn, css } from '@/lib/utils.ts'
import { useEffect, useState } from 'react'
import Bitcoin from '@/assets/images/bitcoin.svg'
import Tether from '@/assets/images/tether.svg'
import LiteCoin from '@/assets/images/lite-coin.svg'
import ETH from '@/assets/images/eth.svg'
import TRX from '@/assets/images/trx.svg'
import TON from '@/assets/images/ton.svg'
import Binance from '@/assets/images/bnb.svg'
import { useAuthStore, useDialogStore } from '@/store'
import { walletsController } from '@/services/controller'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomButton from '@/components/common/custom-button'

const WALLETS = [
  {
    icon: Bitcoin,
    label: 'Bitcoin',
    width: 24,
    currency: 'BTC',
    iconWidth: '21px'
  },
  {
    icon: LiteCoin,
    label: 'Lite Coin',
    width: 24,
    currency: 'LTC',
    iconWidth: '21px'
  },
  {
    icon: Binance,
    label: 'Binance',
    width: 24,
    currency: 'BNB',
    iconWidth: '21px'
  },
  {
    icon: Tether,
    label: 'Tether',
    width: 24,
    currency: 'USDT',
    iconWidth: '21px'
  },
  {
    icon: TRX,
    label: 'Tron',
    width: 32,
    currency: 'TRX',
    iconWidth: '100px'
  },
  {
    icon: ETH,
    label: 'Etherium',
    width: 32,
    currency: 'ETH',
    iconWidth: '100px'
  },
  {
    icon: TON,
    label: 'Toncoin',
    width: 32,
    currency: 'TON',
    iconWidth: '100px'
  }
]

export default function CoinWallet() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number>(-1)
  const dialog = useDialogStore()
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [walletId, setWalletId] = useState<string>('')
  const { userId } = useAuthStore()
  const { useCreateWallet, useUpdateMainWallet } = walletsController()
  const { t } = useTranslation()

  const {
    mutate: createWallet,
    isPending: isPendingCreate,
    data: walletData,
    isError: isError
  } = useCreateWallet()

  const {
    mutate: updateMainWallet,
    isSuccess: isSuccessSwitchMain,
    isError: isErrorSwitchMain
  } = useUpdateMainWallet(walletId)

  const selectWalletType = (selectedPage: number) => {
    setSelected(selectedPage)
    const { currency } = WALLETS[selectedPage]
    setSelectedCurrency(currency)
  }

  const handleCancelAction = () => {
    navigate('/')
  }

  useEffect(() => {
    if (walletData) {
      setWalletId(walletData?.content?.id || '')
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: `Change main wallet confirmation`,
          description: `Your new wallet ${selectedCurrency} is created, Are you sure you want to switch your main balance? All your active bonuses can be canceled.`,
          button: (
            <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
              <CustomButton
                variant={'muted'}
                className="w-3/5"
                label="Cancel"
                isLoading={isPendingCreate}
                disabled={isPendingCreate}
                onClick={() => dialog.closeBasicDialog()}
              />
              <CustomButton
                variant={'default'}
                className="w-2/5 text-center"
                label="Confirm"
                isLoading={isPendingCreate}
                disabled={isPendingCreate}
                onClick={handleWalletChangedAlert}
              />
            </div>
          )
        }
      })
    }
  }, [walletData])

  useEffect(() => {
    if (isSuccessSwitchMain) {
      dialog.openBasicDialog({
        type: 'successful',
        meta: {
          title: t('balance.walletChanged.title'),
          description: t('balance.walletChanged.description').replace(
            'USDT',
            selectedCurrency
          ),
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label={t('balance.walletChanged.great')}
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }

    if (isErrorSwitchMain) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'Switching main wallet error',
          description: `Switching main wallet to ${selectedCurrency} is failed, please see the error message for more detail!`,
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label="Close"
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [isSuccessSwitchMain, isErrorSwitchMain])

  useEffect(() => {
    if (isError) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'Create wallet error',
          description:
            `Creating wallet ${selectedCurrency} is failed!\n` +
            `Wallet with currency ${selectedCurrency}'s already created, cannot create the same one!`,
          button: (
            <div className="w-full">
              <CustomButton
                variant={'default'}
                className="w-full text-center"
                label="Close"
                onClick={() => {
                  dialog.closeBasicDialog()
                }}
              />
            </div>
          )
        }
      })
    }
  }, [isError])

  const handleWalletCreate = () => {
    createWallet({
      userId: userId || '',
      currency: selectedCurrency,
      initialBalance: 0
    })
    dialog.openBasicDialog({
      type: 'loading',
      meta: {
        description: 'Your wallet is creating. Please wait a little bit ...'
      }
    })
  }

  const handleWalletChangedAlert = () => {
    updateMainWallet({
      userId: userId || '',
      currency: selectedCurrency
    })
    dialog.openBasicDialog({
      type: 'loading',
      meta: {
        description: 'Your request is processing. Please wait a little bit ...'
      }
    })
  }

  const confirmationDialog = () => {
    dialog.openBasicDialog({
      type: 'warning',
      meta: {
        title: `Wallet create confirmation`,
        description: `Are you sure want to create wallet ${selectedCurrency}?`,
        button: (
          <div className="w-full inline-flex justify-between items-center gap-3 pr-5">
            <CustomButton
              variant={'muted'}
              className="w-3/5"
              label="Cancel"
              isLoading={isPendingCreate}
              disabled={isPendingCreate}
              onClick={() => dialog.closeBasicDialog()}
            />
            <CustomButton
              variant={'default'}
              className="w-2/5 text-center"
              label="Confirm"
              isLoading={isPendingCreate}
              disabled={isPendingCreate}
              onClick={handleWalletCreate}
            />
          </div>
        )
      }
    })
  }

  return (
    <div className="flex-col md:justify-start md:items-start max-lg:items-center max-lg:justify-center gap-3 overflow-hidden">
      <div className="w-full flex-col justify-center p-7 pb-2">
        <div className="relative justify-center text-white text-xl font-black pb-5">
          Select cryptocurrency
        </div>
        <div className="relative justify-center text-[#c5c0d8] text-xs font-medium">
          Select desired cryptocurrency
        </div>
      </div>
      <div
        className="gap-2 grid grid-cols-2 w-full p-6 md:grid-cols-3"
        css={cssForCard()}
      >
        {WALLETS.map((item, index) => {
          const { icon, label} = item
          return (
            <div
              key={index}
              className={cn(
                'card-item flex-col items-center justify-start rounded-[20px] border-1 p-5',
                { active: selected === index }
              )}
              onClick={() => selectWalletType(index)}
            >
              <div data-svg-wrapper className="relative pb-3">
                <img src={icon} alt="Logo" className="w-[21px]" />
              </div>
              <div className="relative justify-center text-[#c5c0d8] text-sm font-medium  ">
                {label}
              </div>
            </div>
          )
        })}
      </div>
      <div className="w-full inline-flex justify-between items-center gap-5 p-7 max-lg:gap-2">
        <CustomButton
          variant={'muted'}
          className="w-1/4 max-lg:w-2/3"
          label="Cancel"
          onClick={handleCancelAction}
        />

        <CustomButton
          variant={'default'}
          className="w-3/4 max-lg:w-1/3"
          label="Confirm"
          onClick={confirmationDialog}
        />
      </div>
    </div>
  )
}

const cssForCard = () => {
  return css`
    .card-item {
      cursor: pointer;
      border-radius: 15px;
      border: 1px solid #493965;

      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.1) 100%
      );
      box-shadow:
        6px 6px 12px 0 rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0 rgba(148, 95, 255, 0.15);

      :hover {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }

      &.active {
        background:
          linear-gradient(
            0deg,
            rgba(154, 103, 255, 0.2) 0%,
            rgba(154, 103, 255, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
      }
    }
  `
}
