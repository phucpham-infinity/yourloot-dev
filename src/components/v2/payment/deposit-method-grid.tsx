import { useV2DepositStore } from '@/store/slices/v2/deposit.store'
import { css } from '@emotion/react'

export const DepositMethodGrid = ({ methods }: { methods: any[] }) => {
  const currentMethod = useV2DepositStore((s) => s.selectedMethod)
  const setSelectedMethod = useV2DepositStore((s) => s.setSelectedMethod)

  return (
    <div css={styles} className="grid grid-cols-12 gap-2">
      {methods
        .filter((method) => method.isActive)
        .map((method) => (
          <div
            key={method.id}
            onClick={() => {
              setSelectedMethod(method?.id)
              method.onClick()
            }}
            style={{
              gridColumn: `span ${method.col}`
            }}
            className={`border-app-default method-item ${
              method?.id === currentMethod ? 'active-method' : ''
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {method.iconSrcs?.map((iconSrc: string, index: number) => (
                  <img
                    key={index}
                    src={iconSrc}
                    className={method.iconClasses?.[index]}
                  />
                )) ||
                  method.icons?.map((icon: any, index: number) => (
                    <span key={index}>{icon}</span>
                  ))}
              </div>
              <div className="text-app-medium-14 whitespace-nowrap">
                {method.title}
              </div>
            </div>
            {method.badge && (
              <div className="text-app-medium-12 method-item-badge">
                {method.badge}
              </div>
            )}
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
    &.active-method {
      .method-item-badge {
        background: white;
        color: #0b0a11;
      }
      border-radius: 10px;
      background: var(
        --YourLoot-Brand-Gradient-Hover,
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        )
      ) !important;
    }
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
