import CodeApplyDialog from '@/app/v1/promo-code/component/dialog/CodeApplyDialog'
import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils.ts'
import { useDialogStore } from '@/store'

interface Props {
  onClose?: () => void
  canSwitch?: boolean
}

export default function SwitchCodeDialog(props: Props) {
  const { onClose, canSwitch } = props
  const dialog = useDialogStore()
  return (
    <div className="p-10 w-full flex-col justify-center" css={cssFn()}>
      <div className="pb-5">
        <div className="text-white text-5xl font-black font-['Satoshi']">
          ⚠️
        </div>
      </div>
      <div className="flex-col justify-start items-center pb-5">
        <div className="text-white text-xl font-black font-['Satoshi'] pb-3">
          Warning!
          <br />
          You have active promocode!
        </div>
        <div className="w-[289px]">
          <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            Are you sure you want to switch current promocode "
          </span>
          <span className="text-[#c5c0d8] text-xs font-bold font-['Satoshi']">
            Welcome Bonus
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            " to "
          </span>
          <span className="text-[#c5c0d8] text-xs font-bold font-['Satoshi']">
            Another Promocode
          </span>
          <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            "? This will disable your previous promocode.
          </span>
        </div>
      </div>
      <div className="inline-flex justify-between items-center w-full">
        <CustomButton
          label="Cancel"
          className="w-2/3 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
          variant="muted"
          onClick={onClose}
        />
        <CustomButton
          label="Confirm"
          className="w-2/7 items-center text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-start"
          variant="default"
          onClick={() => {
            dialog.open({
              content: (
                <CodeApplyDialog
                  canSwitch={canSwitch}
                  promoCode={''}
                  onClose={dialog.close}
                />
              ),
              width: 400
            })
          }}
        />
      </div>
    </div>
  )
}

const cssFn = () => {
  return css`
    background-image: linear-gradient(180deg, #2a2446 20%, #151323 70%);
  `
}
