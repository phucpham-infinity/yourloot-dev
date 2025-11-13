import arrowRight from '@/assets/icons/home/arrowRight.svg'
import goldYellow from '@/assets/icons/home/goldYellow.svg'
import dinamond from '@/assets/images/wallet/dinamond.svg'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import { useNavigate } from 'react-router-dom'

export default function ExchangeIndex() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleExchange = () => {
    navigate(`/exchange/process${location.search}`)
  }

  return (
    <div className="h-full flex flex-col gap-10 lg:w-[600px]">
      <div className="flex flex-col gap-5">
        <div className="text-[20px] leading-5 font-black text-white">
          Choose amount
        </div>
        <div className="text-xs leading-3 font-normal text-[#C5C0D8]">
          Select the amount of Your Loot Coins you want to exchange.
        </div>
      </div>

      <div className="flex gap-1 lg:gap-2.5 flex-col lg:flex-row items-start lg:items-end lg:w-full">
        <div className="flex gap-2.5 lg:gap-5 flex-col lg:flex-row w-full">
          <div className="flex flex-col gap-2.5 lg:gap-5 lg:w-1/2">
            <img src={dinamond} alt="dinamond" className="w-[40px] h-[40px]" />
            <div className={'flex w-full items-end gap-[10px]'}>
              <FormBuilder
                className={'w-full flex-1'}
                fields={[
                  {
                    type: 'text',
                    name: 'amount',
                    label: 'You will receive:',
                    placeholder: '$ 1,923,234,99'
                  }
                ]}
                onSubmit={(value) => {
                  console.log(value)
                }}
                defaultValues={{ amount: 0 }}
              />
            </div>
          </div>

          <div className="flex items-end mt-5 lg:mt-0">
            <img
              src={arrowRight}
              alt="arrowRight"
              className="w-[20px] h-[20px] mb-0 lg:mb-2.5"
            />
          </div>

          <div className="flex flex-col gap-2.5 lg:gap-5 lg:w-1/2">
            <img
              src={goldYellow}
              alt="goldYellow"
              className="w-[35px] h-[40px]"
            />
            <div className={'flex w-full items-end gap-[10px]'}>
              <FormBuilder
                className={'w-full flex-1'}
                fields={[
                  {
                    type: 'text',
                    name: 'amount',
                    label: 'Exchange amount',
                    placeholder: '$ 1,923,234,99',
                    description: 'Limit $10 - $350000'
                  }
                ]}
                onSubmit={(value) => {
                  console.log(value)
                }}
                defaultValues={{ amount: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full gap-5">
        <CustomButton
          label="Cancel"
          className="w-1/3 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
          variant="muted"
          onClick={() => {
            handleBack()
          }}
        />
        <CustomButton
          label="Exchange"
          className="w-2/3 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
          variant="default"
          onClick={handleExchange}
        />
      </div>
    </div>
  )
}
