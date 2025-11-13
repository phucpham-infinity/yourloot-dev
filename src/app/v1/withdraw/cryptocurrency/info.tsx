import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { getCurrencySymbol } from '@/helper'
import { orderController } from '@/services/controller/orders'
import { useProfileStore, useWithdrawStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CryptocurrencyLayout from './layout'

const CryptocurrencyInfo = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cryptocurrencyName, walletName, networkName } = useParams()
  const { t } = useTranslation()
  const formAmountRef = useRef<any>(null)
  const formAddressRef = useRef<any>(null)
  const fiatSign = getCurrencySymbol(walletName ?? '')
  const { profile } = useProfileStore()
  const { setCryptoWithdrawOrder, setInProgress, setMode } = useWithdrawStore()
  const [amount, setAmount] = useState(0)

  const {
    mutate: createCryptoWithdrawOrder,
    data: cryptoWithdrawOrder,
    isPending,
    isSuccess,
    error
  } = orderController().useCreateCryptoWithdrawOrder()

  const handleAddAmount = (value: number) => {
    formAmountRef.current?.clearError('amount')
    const currentAmount = formAmountRef?.current?.getFieldValue('amount')
    formAmountRef?.current?.setFieldValue(
      'amount',
      Number(currentAmount) + value
    )
  }

  const handleWithdraw = ({ address, amount }: any) => {
    createCryptoWithdrawOrder({
      userId: profile?.userId!,
      currency: cryptocurrencyName,
      addressTo: address,
      amount,
      network: networkName
    })
  }

  useEffect(() => {
    if (error) {
      console.log(error)
      toast.error(
        error?.content?.message ?? 'Oops! Attempt failed! Please try again 😊'
      )
      // setCryptoWithdrawOrder({
      //   userId: profile?.userId!,
      //   currency: cryptocurrencyName,
      //   walletName: walletName,
      //   network: networkName,
      //   orderId: Math.floor(10000 + Math.random() * 90000),
      //   transactionId: '1111',
      //   addressTo: '',
      //   amount: 0
      // })
      // setMode('cryptocurrency')
      // setInProgress(true)
      // navigate(
      //   `/withdraw/${walletName}/cryptocurrency/${cryptocurrencyName}/network/${networkName}/process${location.search}`
      // )
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      setCryptoWithdrawOrder({
        currency: cryptocurrencyName,
        walletName: walletName,
        network: networkName,
        ...cryptoWithdrawOrder
      })
      setMode('cryptocurrency')
      setInProgress(true)
      navigate(
        `/withdraw/${walletName}/cryptocurrency/${cryptocurrencyName}/network/${networkName}/process${location.search}`
      )
    }
  }, [isSuccess])

  return (
    <CryptocurrencyLayout
      showLeftContent
      title={t('withdraw.cryptocurrency.title')}
      description={t('withdraw.cryptocurrency.description')}
      networkName={networkName}
      cryptocurrencyName={cryptocurrencyName}
    >
      <div
        className={
          'flex flex-col lg:flex-row w-full items-end gap-[5px] lg:gap-[10px] h-[150px] lg:h-full'
        }
      >
        <FormBuilder
          className={'w-full flex-1'}
          ref={formAmountRef}
          fields={[
            {
              type: 'text',
              name: 'amount',
              inputType: 'currency',
              label: t('withdraw.cryptocurrency.amount'),
              placeholder: t('withdraw.cryptocurrency.amountPlaceholder', {
                currency: fiatSign
              }),
              description: t('withdraw.cryptocurrency.amountDescription', {
                currency: fiatSign
              }),
              validators: {
                onSubmit: ({ value }: any) => {
                  const amount = Number(value)
                  if (amount < 500 || amount > 100000) {
                    return (
                      <span className="text-red-500">
                        {t('withdraw.cryptocurrency.amountDescription', {
                          currency: fiatSign
                        })}
                      </span>
                    )
                  }
                  return null
                }
              }
            }
          ]}
          onSubmit={(value) => {
            setAmount(value.amount)
            formAddressRef.current?.submit()
          }}
          defaultValues={{ amount: '' }}
        />
        <div
          className={
            'flex-1 gap-[10px] flex items-center justify-between w-full'
          }
        >
          <CustomButton
            className={'w-[100px] lg:w-[72px]'}
            label={`+${fiatSign} 100`}
            onClick={() => handleAddAmount(100)}
          />
          <CustomButton
            className={'w-[100px] lg:w-fit'}
            label={`+${fiatSign} 1000`}
            onClick={() => handleAddAmount(1000)}
          />
          <CustomButton
            className={'w-[100px] lg:w-[90px]'}
            label={`+${fiatSign} 3000`}
            onClick={() => handleAddAmount(3000)}
          />
        </div>
      </div>
      <FormBuilder
        className={'w-full flex-1 mt-[20px]'}
        ref={formAddressRef}
        fields={[
          {
            type: 'text',
            name: 'address',
            label: t('withdraw.cryptocurrency.walletAddress'),
            placeholder: t('withdraw.cryptocurrency.walletAddressPlaceholder'),
            validators: {
              onSubmit: ({ value }: any) => {
                if (!value) {
                  return (
                    <span className="text-red-500">
                      {'Wallet address is required'}
                    </span>
                  )
                }
                return null
              }
            }
          }
        ]}
        onSubmit={(value) => {
          handleWithdraw({
            address: value.address,
            amount: amount
          })
        }}
        defaultValues={{
          address: ''
        }}
      />

      <div className={'mt-[30px] lg:mt-[60px] flex w-full justify-end'}>
        <CustomButton
          disabled={isPending}
          onClick={() => {
            formAmountRef.current?.submit()
          }}
          className={'w-[200px]'}
          label={t('withdraw.cryptocurrency.withdraw')}
        />
      </div>
    </CryptocurrencyLayout>
  )
}

export default CryptocurrencyInfo
