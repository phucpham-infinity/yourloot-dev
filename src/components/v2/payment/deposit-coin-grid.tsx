import { cryptoCurrencyNetworkKey } from '@/constants'
import { useV2DepositStore } from '@/store'
import { css } from '@emotion/react'

export const DepositCoinGrid = () => {
  const setIsOpenSelectNetwork = useV2DepositStore(
    (s) => s.setIsOpenSelectNetwork
  )

  const setCryptoCurrency = useV2DepositStore((s) => s.setCryptoCurrency)

  const setOpenDepositInporcess = useV2DepositStore(
    (s) => s.setOpenDepositInporcess
  )
  const status = useV2DepositStore((s) => s.status)
  const handleSelectCrypto = (crypto: string) => {
    if (status === 'idle') {
      setIsOpenSelectNetwork(true)
      setCryptoCurrency(crypto)
    }
    if (status === 'inProgress') {
      setOpenDepositInporcess(true)
    }
  }
  const cryptos = [
    {
      id: 'usdt',
      title: 'USDT',
      icons: [cryptoCurrencyNetworkKey['USDT']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('USDT')
      }
    },
    {
      id: 'btc',
      title: 'BTC',
      icons: [cryptoCurrencyNetworkKey['BTC']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('BTC')
      }
    },
    {
      id: 'eth',
      title: 'ETH',
      icons: [cryptoCurrencyNetworkKey['ETH']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('ETH')
      }
    },

    {
      id: 'tron',
      title: 'TRON',
      icons: [cryptoCurrencyNetworkKey['TRX']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('TRX')
      }
    },
    {
      id: 'ton',
      title: 'TON',
      icons: [cryptoCurrencyNetworkKey['TON']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('TON')
      }
    },
    // {
    //   id: 'usdc',
    //   title: 'USDC',
    //   icons: [cryptoCurrencyNetworkKey['USDC']?.icon],
    //   col: 4
    // },
    {
      id: 'ltc',
      title: 'LTC',
      icons: [cryptoCurrencyNetworkKey['LTC']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('LTC')
      }
    },
    {
      id: 'bnb',
      title: 'BNB',
      icons: [cryptoCurrencyNetworkKey['BNB']?.icon],
      col: 4,
      onClick: () => {
        handleSelectCrypto('BNB')
      }
    }
    // {
    //   id: 'sol',
    //   title: 'SOL',
    //   icons: [cryptoCurrencyNetworkKey['SOL']?.icon],
    //   col: 4
    // },
    // {
    //   id: 'cardano',
    //   title: 'Cardano',
    //   icons: [cryptoCurrencyNetworkKey['Cardano']?.icon],
    //   col: 4
    // },
    // {
    //   id: 'uni',
    //   title: 'UNI',
    //   icons: [cryptoCurrencyNetworkKey['UNI']?.icon],
    //   col: 4
    // }
  ]
  return (
    <div css={styles} className="grid grid-cols-12 gap-4">
      {!!cryptos?.length &&
        cryptos?.map((crypto) => (
          <div
            key={crypto.id}
            className={`col-span-${crypto.col} border-app-default method-item`}
            onClick={crypto.onClick}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {crypto?.icons?.map((icon: any, index: number) => (
                  <div key={index}>{icon}</div>
                ))}
              </div>
              <div className="text-app-medium-14 whitespace-nowrap">
                {crypto.title}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

const styles = css`
  .warning-alert {
    border-radius: 10px;
    border: 1px solid #e3b075;
    background: #0b0a11;
  }
  .method-item {
    &-badge {
      font-size: 10px;
      font-weight: 700;
      line-height: 10px;
      padding: 4px;
      border-radius: 4px;
      background: var(
        --YourLoot-Brand-Gradient,
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        )
      );
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(
        180deg,
        rgba(195, 162, 241, 0.1) 0%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
  }
`
