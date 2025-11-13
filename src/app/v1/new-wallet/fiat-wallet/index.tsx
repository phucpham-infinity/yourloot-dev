import { cn, css } from '@/lib/utils.ts'
import { walletsController } from '@/services/controller'
import { useAuthStore, useDialogStore } from '@/store'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CustomButton from '@/components/common/custom-button'

const WALLETS = [
  {
    icon: '$',
    label: 'US Dollars',
    width: 32,
    currency: 'USD'
  },
  {
    icon: '₽',
    label: 'Russian Rubles',
    width: 32,
    currency: 'RUB'
  },
  {
    icon: '€',
    label: 'Euro',
    width: 32,
    currency: 'EUR'
  },
  {
    icon: '£',
    label: 'Pound',
    width: 32,
    currency: 'GBP'
  },
  {
    icon: '֏',
    label: 'Armenian dram',
    width: 32,
    currency: 'AMD'
  },
  {
    icon: '₼',
    label: 'Manat Azerbaijan',
    width: 32,
    currency: 'AZN'
  },
  {
    icon: 'Br',
    label: 'Belarusian rubles',
    width: 32,
    currency: 'BYN'
  },
  {
    icon: '₸',
    label: 'Kazakhstani Tenge',
    width: 32,
    currency: 'KZT'
  },
  {
    icon: 'KGS',
    label: 'Kyrgyz som',
    width: 32,
    currency: 'KGS'
  },
  {
    icon: 'TJS',
    label: 'Tajikistani somoni',
    width: 32,
    currency: 'TJS'
  }
]

export default function FiatWallet() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number>(-1)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const dialog = useDialogStore()
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
    <div className="flex-col justify-start items-start gap-3 max-lg:items-center max-lg:justify-center">
      <div className="flex-col justify-center p-7 pb-2">
        <div className="justify-center text-white text-xl font-black font-['Satoshi'] pb-5">
          Select cryptocurrency
        </div>
        <div className="justify-center text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
          Select desired cryptocurrency
        </div>
      </div>
      <div
        className="gap-2 grid grid-cols-2 w-full p-6 md:grid-cols-3 max-h-[400px] lg:max-h-96 md:max-h-80 overflow-y-scroll"
        css={cssForCard()}
      >
        {WALLETS.map((item, index) => {
          const { icon, label } = item
          return (
            <div
              key={index}
              className={cn(
                'card-item flex-col items-center justify-start rounded-[20px] border-1 p-5 ',
                { active: selected === index }
              )}
              onClick={() => selectWalletType(index)}
            >
              <div className="relative justify-center text-white text-2xl font-black font-['Satoshi'] pb-5">
                {icon}
              </div>
              <div className="relative justify-center text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
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
