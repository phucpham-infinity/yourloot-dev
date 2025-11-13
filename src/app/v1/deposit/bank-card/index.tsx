import { css } from '@/lib/utils.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { banks } from '@/constants'
import { useDepositStore } from '@/store'

import { useTranslation } from 'react-i18next'
import BankCardLayout from './layout'

export default function Index() {
  const { walletName } = useParams()
  const { t } = useTranslation()
  const setBank = useDepositStore((state) => state.setBank)

  const mode = useDepositStore((state) => state.mode)
  const isProcessing = useDepositStore((state) => state.isProcessing)
  const setTimeExpires = useDepositStore((state) => state.setTimeExpires)

  const navigate = useNavigate()

  const handleSelectBank = (bankCode: string) => {
    if (isProcessing && mode !== 'bank-card') {
      toast.warn(
        `You are currently processing a ${mode} payment. Please wait, or select ${mode} again to see the progress!`
      )
      return
    }
    setBank(bankCode)
    setTimeExpires(900)
    navigate(
      `/deposit/${walletName}/bank-card/${bankCode}/amount${location.search}`
    )
  }

  return (
    <BankCardLayout title={t('withdraw.bankCard.chooseBank')}>
      <div className="w-full justify-start gap-5 grid grid-cols-2 lg:grid-cols-3">
        {banks.map((bank) => (
          <div
            key={bank.bankCode}
            css={itemsStyle}
            onClick={() => handleSelectBank(bank.bankCode)}
            className="p-5 rounded-[15px] flex-col justify-start items-start gap-5 inline-flex overflow-hidden"
          >
            <div className="w-full">
              <img src={bank.logo} width={'100%'} alt={bank.bankName} />
            </div>
            <div className="self-stretch text-[#c5c0d8] text-app-medium-14 ">
              {bank.bankName}
            </div>
          </div>
        ))}
      </div>
    </BankCardLayout>
  )
}

const itemsStyle = css`
  cursor: pointer;
  /* width: 100%; */
  border-radius: 15px;
  border: 1px solid #40385a;
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
      linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
`
