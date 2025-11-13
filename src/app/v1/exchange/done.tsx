import CustomButton from '@/components/common/custom-button'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
export default function ExchangeDone() {
  const navigate = useNavigate()
  return (
    <div
      css={styled}
      className="w-full flex flex-col items-start justify-center gap-10 p-10 relative bg-white overflow-hidden"
    >
      <div className="relative self-stretch font-black text-yourlootwhite text-5xl ">
        👍
      </div>

      <div className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch text-app-white text-app-main-20">
          Exchange successful!
        </div>

        <p className="relative w-[289px] text-app-pale text-app-medium-12">
          Congratulations! <br />
          100 (RUB) have been credited to your main balance.
        </p>
      </div>

      <div className="flex gap-2.5 w-full items-end">
        <div className="flex gap-2.5 flex-col w-full">
          <div className="text-[#9E90CF] text-[10px] font-bold">
            New balance
          </div>
          <CustomButton
            label="# 1.433,432.00"
            className="w-[194px]"
            variant="muted"
            onClick={() => {}}
          />
        </div>
        <CustomButton
          label="Great"
          className="w-[96px]"
          variant="default"
          onClick={() => {
            navigate('/store')
          }}
        />
      </div>
    </div>
  )
}

export const styled = css`
  width: 390px;
  border-radius: 20px;
  border: 1px solid #544a80;
  background: url('/images/dialog-bg.svg') no-repeat center center;
  background-size: cover;
  background-color: #362c5a;
`
