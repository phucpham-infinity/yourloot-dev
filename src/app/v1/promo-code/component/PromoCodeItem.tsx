import SwitchCodeDialog from '@/app/v1/promo-code/component/dialog/SwitchCodeDialog'
import CustomButton from '@/components/common/custom-button'
import { css } from '@/lib/utils.ts'
import { useDialogStore } from '@/store'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface Props {
  customCss: any
  canSwitch?: boolean
  validTime?: string

  name?: string
  description: string
}

export default function PromoCodeItem(props: Props) {
  const dialog = useDialogStore()
  const { customCss, canSwitch = false, validTime } = props
  const [timeLeft, setTimeLeft] = useState('')
  // Function to calculate time left
  function calculateTimeLeft() {
    if (!validTime) {
      setTimeLeft('N/A')
      return
    }

    const end = new Date(validTime).getTime()
    const now = new Date().getTime()
    const diff = end - now // Time left from now

    if (diff <= 0) {
      setTimeLeft('Expired')
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    setTimeLeft(`${days}d ${hours}h ${minutes}m `)
  }

  useEffect(() => {
    calculateTimeLeft() // Calculate the initial time left

    const timer = setInterval(calculateTimeLeft, 1000) // Update every second

    return () => clearInterval(timer) // Cleanup on component unmount
  }, [validTime]) // Re-run when startTime or endTime changes

  return (
    <div
      className="max-lg:flex-col w-full mx-auto justify-between inline-flex rounded-2xl border border-[#403b4a] bg-[#2a2446] items-center mb-5 p-5"
      css={customCss.call(null)}
    >
      <div className="w-full justify-start items-start flex-colpb-0">
        <div className="text-white text-xl font-black font-['Satoshi']">
          {props.name}
        </div>
        <div>
          <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            {props.description}
          </span>
        </div>
      </div>
      <div className="max-lg:p-3 max-lg:gap-5 max-lg:inline-flex max-lg:justify-between max-lg:items-center w-full lg:justify-end lg:items-end text-right lg:flex lg:flex-col">
        <div
          className="max-lg:rounded-[15px] max-lg:border max-lg:border-[#3f335b] max-lg:p-3 justify-center inline-flex gap-2 pb-2 max-lg:w-2/3 max-lg:text-center"
          css={isMobile ? cssLabelFnc() : ''}
        >
          <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
            Time left:
          </div>
          <div className="text-[#c5c0d8] text-xs font-black font-['Satoshi']">
            {timeLeft}
          </div>
        </div>
        {!canSwitch ? (
          <CustomButton
            label="Cancel"
            className="w-fit max-lg:w-1/3 items-end text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-end"
            variant="muted"
            onClick={() => {
              dialog.open({
                content: (
                  <SwitchCodeDialog
                    canSwitch={!canSwitch}
                    onClose={dialog.close}
                  />
                ),
                width: 400
              })
            }}
          />
        ) : (
          <CustomButton
            label="Switch"
            className="w-fit max-lg:w-1/3 items-end text-center text-[#9d90cf] text-xs font-medium font-['Satoshi'] inline-flex gap-1 justify-end"
            variant="default"
            onClick={() => {
              dialog.open({
                content: <SwitchCodeDialog canSwitch onClose={dialog.close} />,
                width: 400
              })
            }}
          />
        )}
      </div>
    </div>
  )
}

const cssLabelFnc = () => {
  return css`
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 12px 0px rgba(148, 95, 255, 0.15);
    background-image: linear-gradient(
      0deg,
      rgba(22, 20, 24, 0.3) 0%,
      rgba(22, 20, 24, 0.3) 100%
    );
  `
}
