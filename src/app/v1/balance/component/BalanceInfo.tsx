import Group from '@/assets/images/group.svg'
import CustomButton from '@/components/common/custom-button'
import { useChangeMainWalletDialog } from '@/hooks'
import { cn, css } from '@/lib/utils.ts'
import formatAmount from '@/utils/format-amount'
import { useTranslation } from 'react-i18next'

const EXCLUDE_CURRENCY = ['BBK']
interface Props {
  className?: string
  data: any
  mainWallet: any
}

export default function BalanceInfo(props: Props) {
  const { className, data, mainWallet } = props
  const { t } = useTranslation()

  const { showConfirmationDialog } = useChangeMainWalletDialog()

  return (
    <div
      className={cn(
        'relative flex-col rounded-2xl border border-[#403b4a] bg-[#2a2446] items-center mb-3',
        className
      )}
      css={cssFn()}
    >
      <div className="relative">
        <div className="inline-flex items-center justify-between w-full pr-3">
          <div data-svg-wrapper className="relative">
            <img src={Group} alt="Logo" className="w-[82px]" />
          </div>
          {EXCLUDE_CURRENCY.indexOf(data.currency) == -1 ? (
            <>
              {mainWallet?.currency !== data?.currency && (
                <CustomButton
                  label={t('balance.setAsMain')}
                  className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
                  variant="default"
                  onClick={() =>
                    showConfirmationDialog({
                      id: data.id,
                      currency: data.currency
                    })
                  }
                />
              )}
            </>
          ) : (
            <div />
          )}
        </div>
        <div className="flex-col justify-start p-5 pt-0">
          <div className="text-white text-2xl font-black font-['Satoshi'] pb-2">
            {data.sign} {formatAmount(data.amount)}
          </div>
          <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
            in {data.currency}
          </div>
        </div>
      </div>
      <div className="absolute w-200 h-200 top-55 -left-20  bg-[#6330aa] rounded-full blur-[50px]"></div>
    </div>
  )
}

const cssFn = () => {
  return css`
    width: 100%;
    background-image: linear-gradient(180deg, #1b1527 20%, #1c1827 70%);
    overflow: hidden;
  `
}
