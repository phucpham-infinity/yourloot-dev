import { cryptoCurrencyNetwork } from '@/constants'
import { css } from '@/lib/utils.ts'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import CryptocurrencyLayout from './layout.tsx'

const CryptocurrencyNetwork = () => {
  const navigate = useNavigate()
  const { walletName, cryptocurrencyName } = useParams()

  const networks =
    cryptoCurrencyNetwork.find((x) => x.currency === cryptocurrencyName)
      ?.networks ?? []

  const { t } = useTranslation()

  const handleSelect = (name: string) => {
    navigate(
      `/withdraw/${walletName}/cryptocurrency/${cryptocurrencyName}/network/${name}/info`
    )
  }

  return (
    <CryptocurrencyLayout
      title={t('deposit.selectNetwork')}
      description={t('deposit.descriptionNetwork')}
    >
      <div
        css={style}
        className="self-stretch flex-col justify-start items-start gap-5 flex"
      >
        <div className="self-stretch justify-start items-start flex-wrap gap-4 inline-flex">
          {networks.map((x, index) => (
            <div
              onClick={() => {
                handleSelect(x.network)
              }}
              key={index}
              style={{ minWidth: '105px', maxWidth: '105px' }}
              className="item p-5 rounded-[15px] flex-col justify-start items-start gap-5 inline-flex overflow-hidden"
            >
              {x.icon}
              <div
                style={{ fontSize: '12px' }}
                className="self-stretch text-[#c5c0d8] text-sm font-medium whitespace-nowrap"
              >
                {x.network}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CryptocurrencyLayout>
  )
}

const style = css`
  /* width: 100%; */
  .item {
    width: 140px;
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

export default CryptocurrencyNetwork
