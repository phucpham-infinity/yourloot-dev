import { css } from '@/lib/utils.ts'

import { cryptoCurrencyNetwork } from '@/constants'
import { useDepositStore } from '@/store/slices/deposit'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CryptocurrencyLayout from './layout.tsx'

export default function Index() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const setCryptocurrencyCoin = useDepositStore(
    (state) => state.setCryptocurrencyCoin
  )
  const { walletName } = useParams()

  const handleSelect = (name: string) => {
    setCryptocurrencyCoin(name)
    navigate(
      `/deposit/${walletName}/cryptocurrency/${name}/network${location.search}`
    )
  }
  return (
    <CryptocurrencyLayout
      title={t('withdraw.cryptocurrency.selectTitle')}
      description={t('withdraw.cryptocurrency.selectDescription')}
    >
      <div
        css={style}
        className="grid w-full grid-cols-12 gap-5 lg:grid-cols-12"
      >
        {cryptoCurrencyNetwork.map((x, index) => (
          <div
            onClick={() => handleSelect(x.currency)}
            key={index}
            className={clsx(
              'item w-full p-5 rounded-[15px] flex-col justify-start items-start gap-5 inline-flex overflow-hidden',
              {
                'col-span-3': [0, 1, 2, 3].includes(index),
                'col-span-4': [4, 5, 6, 7, 8, 9].includes(index),
                'col-span-6': isMobile
              }
            )}
          >
            {x.icon}
            <div className="self-stretch text-[#c5c0d8] text-sm font-medium ">
              {x.name}
            </div>
          </div>
        ))}
      </div>
    </CryptocurrencyLayout>
  )
}

const style = css`
  /* width: 100%; */
  .item {
    width: 100%;
    border-radius: 15px;
    border: 1px solid #40385a;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
  }
`
