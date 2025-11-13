import CustomButton from '@/components/common/custom-button'
import CustomLabel from '@/components/common/custom-label'
import { cn, css } from '@/lib/utils.ts'
import { useDialogStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface Props {
  status: string
  name: string
  desc: string
  variant: string
  className?: string
}
export default function CategoryItem(props: Props) {
  const { status, name, desc, variant, className } = props
  const dialog = useDialogStore()
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'p-5 rounded-[15px] border border-[#483b69] flex-col justify-start items-start gap-5 inline-flex overflow-hidden w-full',
        className
      )}
      css={status.toLowerCase() === 'completed' ? activeItemCssFn() : ''}
      onClick={() =>
        status.toLowerCase() === 'completed'
          ? dialog.openBasicDialog({
              type: 'congratulation',
              meta: {
                title: t('achievements.congratulations'),
                description: desc,
                button: (
                  <CustomButton
                    variant="default"
                    className="w-full text-center"
                    label="Horray!"
                    onClick={() => {
                      dialog.closeBasicDialog()
                    }}
                  />
                )
              }
            })
          : ''
      }
    >
      <div className="justify-start items-start gap-5 inline-flex">
        <CustomLabel label={status} variant={variant} />
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
        <div className="h-12 text-white text-xl font-black font-['Satoshi'] text-ellipsis break-words grid place-items-center justify-start">
          {name}
        </div>
        <div className=" text-[#c5c0d8] text-xs font-medium font-['Satoshi'] text-ellipsis break-words grid place-items-center justify-start">
          {desc}
        </div>
      </div>
    </div>
  )
}

// const rareCssFn = (rareCssConfig:any) => {
//     const gradient =  rareCssConfig?.gradient || {from:"rgba(40, 34, 68, 0.5)",to:"rgba(20,13,31,0.4)"}
//     const {from,to}=gradient
//     return css`
//         background-image: linear-gradient(120deg, ${from} 0%, ${to} 90%);
//     `;
// }

const activeItemCssFn = () => {
  return css`
    border: 1px solid rgba(92, 70, 123, 0.5);
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    &:hover {
      background:
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #402c64 0%,
          #402c64 100%
        );
    }

    &:active {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #654ec8 0%,
          #372864 100%
        );
    }

    &.disabled {
      cursor: not-allowed;
      border: 1px solid #534b5f;
      .label {
        color: #605e68;
      }
      background: radial-gradient(
        103.94% 265.37% at 59.95% -118.74%,
        #474747 0%,
        #1c1c1c 100%
      );

      &:hover,
      &:active {
        background: radial-gradient(
          103.94% 265.37% at 59.95% -118.74%,
          #474747 0%,
          #1c1c1c 100%
        );
      }
    }
  `
}
