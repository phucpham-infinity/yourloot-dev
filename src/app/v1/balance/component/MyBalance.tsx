import DataTable from '@/app/v1/balance/component/DataTable'
import ArrowLeft from '@/assets/icons/arrowLeft.tsx'
import Plus from '@/assets/images/achievement/plus.svg'
import Coin from '@/assets/images/wallet/coin.svg'
import Dinamond from '@/assets/images/wallet/dinamond.svg'
import Wallet1 from '@/assets/images/wallet/wallet-1.svg'
import Wallet2 from '@/assets/images/wallet/wallet-2.svg'

import DoubleCoin from '@/assets/images/wallet/double-coin.svg'
import CustomButton from '@/components/common/custom-button'

import checkmarkIcon from '@/assets/icons/balance/checkmark.svg'
import historyIcon from '@/assets/icons/history.svg'
import IconBtn from '@/components/common/icon-button'
import Loader from '@/components/common/loader'
import IconWidthShadow from '@/components/common/ui/IconWidthShadow'
import { css } from '@/lib/utils.ts'
import { walletsController } from '@/services/controller'
import { useAuthStore, useWalletStore } from '@/store'
import { useDialogStore } from '@/store/slices/dialog'
import { useHomeStore } from '@/store/slices/home'
import formatAmount from '@/utils/format-amount'
import { startTransition, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface PropsData {
  mainWallet: any
  bonusWallet: any
  yourLoot: any
  isLoading: boolean
}
export default function MyBalance(props: PropsData) {
  const {
    mainWallet = { amount: 0, currency: 'RUB', sign: '₽', id: ' ' },
    bonusWallet = { amount: 0, currency: 'RUB', sign: '₽', id: ' ' },
    yourLoot,
    isLoading = false
  } = props

  const navigate = useNavigate()
  const { setIsScroll } = useHomeStore()
  const { t } = useTranslation()
  const [historyHidden, setHistoryHidden] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [currency, setCurrency] = useState('')
  const [label] = useState(t('balance.history'))
  const [preTab, setPreTab] = useState('')
  const fstBtnlabel = t('balance.deposits')
  const sndBtnLabel = t('balance.withdrawals')
  const dialog = useDialogStore()
  const [oType, setOType] = useState('')
  const {
    useUserActiveBalance,
    useCheckUserActiveBalanceWallet,
    useFetchUserOrderBalanceWallet
  } = walletsController()
  const { userId } = useAuthStore()
  const { prevPage } = useWalletStore()

  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [walletId, setWalletId] = useState('')

  const { data: userActiveBalanceWallet } = useCheckUserActiveBalanceWallet(
    userId!
  )

  const { mutateAsync: fetchUserOrderBalanceWallet } =
    useFetchUserOrderBalanceWallet()

  const [activeBalance, setActiveBalance] = useState(
    userActiveBalanceWallet?.content?.isBonus
  )

  useEffect(() => {
    if (userActiveBalanceWallet) {
      setActiveBalance(userActiveBalanceWallet?.content?.isBonus)
    }
  }, [userActiveBalanceWallet])

  useEffect(() => {
    if (userActiveBalanceWallet) {
      setActiveBalance(userActiveBalanceWallet?.content?.isBonus)
    }
  }, [userActiveBalanceWallet])

  const {
    mutate: updateActiveBalance,
    isSuccess: isSuccessUpdateActiveBalance,
    isError: isErrorUpdateActiveBalance
    // error: errorUpdateActiveBalance
  } = useUserActiveBalance(userId!)

  const fetchOrders = async ({
    walletId,
    isNew = false,
    orderType
  }: {
    walletId: string
    isNew?: boolean
    orderType?: string
  }) => {
    try {
      const nextPage = isNew ? 0 : page + 1
      const type = orderType ?? ''
      setOType(type)
      setPage(nextPage)

      const result = await fetchUserOrderBalanceWallet({
        userId: userId!,
        walletId: walletId!,
        page: nextPage,
        orderType: type
      })

      const orders = result?.content?.orders?.content ?? []
      const cryptoOrders = result?.content?.cryptoOrders?.content ?? []
      const combined = orders.concat(cryptoOrders)

      setWalletId(walletId)

      setData((prev) => (isNew ? combined : [...prev, ...combined]))

      const totalPages =
        result?.content?.orders?.totalElements !== 0
          ? result?.content?.orders?.totalPages
          : result?.content?.cryptoOrders?.totalPages
      setHasMore(nextPage < totalPages)
    } catch (err) {
      console.error('Fetch orders failed:', err)
      setData([])
    } finally {
      setIsLoadingOrder(false)
    }
  }

  const handleUpdateActiveBalance = () => {
    dialog.openBasicDialog({
      type: 'warning',
      meta: {
        title: t('balance.switchWallet.title'),
        description: t('balance.switchWallet.description'),
        button: (
          <div className="inline-flex items-center justify-between w-full gap-3 pr-5">
            <CustomButton
              variant={'muted'}
              className="w-3/5"
              label={t('balance.switchWallet.cancel')}
              onClick={() => dialog.closeBasicDialog()}
            />
            <CustomButton
              variant={'default'}
              className="w-2/5 text-center"
              label={t('balance.switchWallet.confirm')}
              onClick={() => {
                updateActiveBalance()
                dialog.openBasicDialog({
                  type: 'loading',
                  meta: {
                    description:
                      'Your wallet is switching. Please wait a little bit ...'
                  }
                })
              }}
            />
          </div>
        )
      }
    })
  }

  useEffect(() => {
    if (isSuccessUpdateActiveBalance) {
      dialog.openBasicDialog({
        type: 'successful',
        meta: {
          title: t('balance.walletChanged.title'),
          description: 'Bonus wallet balance set as active',
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

    if (isErrorUpdateActiveBalance) {
      dialog.openBasicDialog({
        type: 'warning',
        meta: {
          title: 'Warning',
          // description: (errorUpdateActiveBalance as any)?.content?.message,
          description: t('balance.errorSwitchWallet'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateActiveBalance, isErrorUpdateActiveBalance])

  return (
    <div>
      <div className="inline-flex items-center justify-between w-full pt-3 pb-3 mx-auto">
        <div className="flex items-center justify-start gap-1 lg:gap-5">
          <div data-svg-wrapper className="relative">
            <IconWidthShadow
              icon={Wallet1}
              iconShadow={Wallet2}
              iconShadowStyle={{
                position: 'absolute',
                left: '50%',
                top: '61%',
                transform: `translate(-50%, -50%) scale(1.6)`,
                zIndex: 0
              }}
            />
          </div>
          <div className="text-white text-2xl font-black font-['Satoshi']">
            {t('balance.myWallets')}
          </div>
        </div>
        <div className="flex items-center justify-start gap-5 ">
          <CustomButton
            label={isMobile ? '' : t('balance.back')}
            prefixIcon={<ArrowLeft />}
            className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
            variant="muted"
            onClick={() => {
              setIsScroll(false)
              // navigate(-1)
              navigate(prevPage)
            }}
          />
          <CustomButton
            label={isMobile ? '' : t('balance.createNewWallet')}
            prefixIcon={
              isMobile ? (
                <div data-svg-wrapper>
                  <img src={Plus} alt="Logo" className="w-[10px]" />
                </div>
              ) : (
                <div />
              )
            }
            className="w-fit items-center text-center text-16px text-[#9d90cf] font-medium font-['Satoshi']"
            variant="default"
            onClick={() =>
              navigate(`/new-wallet?close-back=${location.pathname}`)
            }
          />
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative inline-flex items-start justify-between w-full max-lg:flex-col">
          <div
            className={
              historyHidden
                ? 'relative w-full pt-8 lg:inline-flex max-lg:flex-col justify-between items-center gap-5'
                : 'relative w-1/2 max-lg:w-full pt-8 flex-col justify-between items-center gap-5'
            }
          >
            <div className="relative flex-col items-center justify-center w-full mb-5">
              <div className="text-white text-2xl font-black font-['Satoshi'] pb-5">
                {t('balance.mainBalance')}
              </div>
              <div
                className="w-full justify-center flex-col rounded-2xl border border-[#403b4a] items-center"
                css={mainCssFn()}
              >
                <div className="inline-flex items-center justify-between w-full p-2 pr-5">
                  <div data-svg-wrapper className="relative p-3">
                    <img src={Coin} alt="Logo" className="w-[43px]" />
                  </div>
                  <div className="flex flex-row gap-2">
                    <IconBtn
                      icon={
                        <img src={historyIcon} className="w-[12px] h-[12px]" />
                      }
                      onClick={async () => {
                        startTransition(() => {
                          setIsLoadingOrder(true)
                        })
                        if (preTab.toLowerCase() === 'history') {
                          setHistoryHidden(true)
                          setPreTab('')
                        } else {
                          setHistoryHidden(false)
                          setCurrency(mainWallet?.currency)
                          await fetchOrders({
                            walletId: mainWallet?.id,
                            isNew: true
                          })
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex-col justify-start p-5">
                  <div className="text-white text-2xl font-black font-['Satoshi'] pb-2">
                    {mainWallet.sign} {formatAmount(mainWallet.amount)}
                  </div>
                  <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
                    {t('balance.inCurrency', { currency: mainWallet.currency })}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-col justify-center w-full mb-5 items-centern">
              <div className="text-white text-2xl font-black font-['Satoshi'] pb-5">
                {t('balance.otherBalances')}
              </div>
              <div className="items-center justify-between w-full gap-5 lg:inline-flex max-lg:flex-col">
                <div className="lg:w-1/2 max-lg:w-full">
                  <div
                    className="w-full flex-col max-lg:flex-col rounded-2xl border border-[#403b4a] items-cente max-lg:mb-5"
                    css={bonusBalanceCss()}
                  >
                    <div className="inline-flex items-center justify-between w-full p-6">
                      <div data-svg-wrapper className="relative">
                        <img src={DoubleCoin} alt="Logo" className="w-[41px]" />
                      </div>

                      <IconBtn
                        icon={
                          <img
                            src={historyIcon}
                            className="w-[12px] h-[12px]"
                          />
                        }
                        onClick={async () => {
                          startTransition(() => {
                            setIsLoadingOrder(true)
                          })
                          if (preTab.toLowerCase() === 'history') {
                            setHistoryHidden(true)
                            setPreTab('')
                            setData([])
                          } else {
                            setHistoryHidden(false)
                            setCurrency(bonusWallet?.currency)
                            setCurrency(bonusWallet?.currency)
                            await fetchOrders({
                              walletId: bonusWallet?.id,
                              isNew: true
                            })
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between w-full p-5">
                      <div className="flex-col justify-start ">
                        <div className="text-white text-2xl font-black font-['Satoshi'] pb-2">
                          {bonusWallet.sign} {formatAmount(bonusWallet.amount)}
                        </div>
                        <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
                          {t('balance.bonus')}
                        </div>
                      </div>
                      <CustomButton
                        label={t('balance.activeBalance')}
                        onClick={handleUpdateActiveBalance}
                        prefixIcon={
                          <img
                            src={checkmarkIcon}
                            className="w-[12px] h-[12px]"
                          />
                        }
                        labelStyle={{
                          color: activeBalance
                            ? 'oklch(0.723 0.219 149.579)'
                            : '#9d90cf'
                        }}
                        className="inline-flex items-center justify-start gap-1 text-xs font-medium text-center w-fit"
                        variant="muted"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="relative lg:w-1/2 max-lg:w-full overflow-hidden border border-[#403b4a] rounded-2xl"
                  css={mainCssFn()}
                >
                  <div className="absolute w-200 h-200 bottom-40 -left-55 bg-[#487438] rounded-full blur-[40px]"></div>
                  <div className="flex-col items-center">
                    <div className="inline-flex items-center justify-between w-full p-6">
                      <div data-svg-wrapper className="relative">
                        <img src={Dinamond} alt="Logo" className="w-[41px]" />
                      </div>
                    </div>
                    <div className="flex-col justify-start p-5">
                      <div className="text-white text-2xl font-black font-['Satoshi'] pb-2">
                        {formatAmount(yourLoot)}
                      </div>
                      <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
                        {t('balance.yourLoot')}
                      </div>
                    </div>
                  </div>
                </div>
                <DataTable
                  label={label}
                  firstButtonLabel={fstBtnlabel}
                  secondButtonLabel={sndBtnLabel}
                  isHidden={!(!historyHidden && isMobile)}
                  isLoading={isLoadingOrder}
                  data={data}
                  currency={currency}
                  onClose={() => {
                    setHistoryHidden(true)
                    setPreTab('')
                  }}
                  onDeposit={async () => {
                    setData([]) // Clear previous data
                    await fetchOrders({
                      walletId: walletId,
                      isNew: true,
                      orderType: 'DEPOSIT'
                    })
                  }}
                  onWithDraw={async () => {
                    setData([]) // Clear previous data
                    await fetchOrders({
                      walletId: walletId,
                      isNew: true,
                      orderType: 'WITHDRAWAL'
                    })
                  }}
                  onLoadMore={() =>
                    fetchOrders({ walletId: walletId, orderType: oType })
                  }
                  hasMore={hasMore}
                />
              </div>
            </div>
          </div>

          <DataTable
            label={label}
            firstButtonLabel={fstBtnlabel}
            secondButtonLabel={sndBtnLabel}
            isHidden={!!historyHidden}
            currency={currency}
            isLoading={isLoadingOrder}
            data={data}
            onClose={() => {
              setHistoryHidden(true)
              setPreTab('')
            }}
            onDeposit={async () => {
              setData([]) // Clear previous data
              await fetchOrders({
                walletId: walletId,
                isNew: true,
                orderType: 'DEPOSIT'
              })
            }}
            onWithDraw={async () => {
              setData([]) // Clear previous data
              await fetchOrders({
                walletId: walletId,
                isNew: true,
                orderType: 'WITHDRAWAL'
              })
            }}
            onLoadMore={() =>
              fetchOrders({ walletId: walletId, orderType: oType })
            }
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  )
}

const mainCssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2e274e 30%, #171526 95%);
  `
}

const bonusBalanceCss = () => {
  return css`
    background-image: linear-gradient(340deg, #213453 15%, #2c254a 80%);
  `
}
