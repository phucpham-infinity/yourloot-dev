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

export default function BalanceInfoV2(props: Props) {
  const { data, mainWallet } = props
  const { t } = useTranslation()

  const { showConfirmationDialog } = useChangeMainWalletDialog()

  return (
    <div
      className={cn(
        'relative flex-col rounded-2xl border border-[#403b4a] bg-[#2a2446]  mb-3 flex py-[10px] px-[12px]  justify-center items-start gap-10 self-stretch"'
      )}
      css={cssFn()}
    >
      <div className="flex py-[10px] px-[12px] flex-col justify-center items-start gap-10 self-stretch">
        <div className="flex-col justify-start p-5 pt-0">
          <div className="text-white text-2xl font-black font-['Satoshi'] pb-2">
            {data.sign} {formatAmount(data.amount ?? 0)}
          </div>
          <div className="text-[#c5c0d8] text-sm font-medium font-['Satoshi']">
            {data.currency}
          </div>
        </div>

        <div className="inline-flex items-center justify-between pr-3">
          {EXCLUDE_CURRENCY.indexOf(data.currency) == -1 ? (
            <>
              {mainWallet?.currency !== data?.currency && (
                <CustomButton
                  label={t('balance.makePrimary')}
                  className="w-fit items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
                  variant="muted"
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
