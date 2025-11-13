import { css } from '@emotion/react'
import { useState } from 'react'
import {
  Tabs,
  TabsContents,
  TabsContent
} from '@/components/animate-ui/components/tabs'
import { EmptyMethod } from '@/components/v2/empty-method'
import { useTranslation } from 'react-i18next'
import { useWithdraw } from './withdraw.hook'
import { PaymentMethodItem } from '@/components/v2/payment-method-item'

export const Withdraw = () => {
  const { t } = useTranslation()
  const { methodsActive } = useWithdraw()
  const [activeTab, setActiveTab] = useState('methods')

  const handleChangeTab = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col gap-4" css={styles}>
      <Tabs
        value={activeTab}
        className="w-full flex flex-col gap-6"
        onValueChange={handleChangeTab}
      >
        <TabsContents>
          <TabsContent className="flex flex-col gap-6" value="methods">
            {!!methodsActive?.length && (
              <div className="text-app-medium-16">
                {t('depositWithdrawV2.selectMethod', 'Select Method')}
              </div>
            )}
            <div className="grid grid-cols-12 gap-4">
              {methodsActive.length > 0 ? (
                methodsActive.map((method) => (
                  <PaymentMethodItem
                    key={method.id}
                    id={method.id}
                    title={method.title}
                    rightBanner={method.rightBanner}
                    subtitle={method.subtitle}
                    col={method.col}
                    onClick={method.onClick}
                  />
                ))
              ) : (
                <div
                  style={{
                    gridColumn: `span 12`
                  }}
                  className="text-app-medium-16"
                >
                  <EmptyMethod />
                </div>
              )}
            </div>
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  )
}

const styles = css`
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

export default Withdraw
