import { FormBuilder } from '@/components/common/form-builder'
import { cn, css } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface LanguageProps {
  className?: string
}

export default function Language({ className }: LanguageProps) {
  const { t, i18n } = useTranslation()

  // Update the language when selectedValue changes

  return (
    <div
      css={style}
      className={cn(
        'w-full  p-5 bg-[#362c5a] rounded-[20px] border-app-default flex-col justify-center items-start gap-3 flex ',
        className
      )}
    >
      <div className="flex flex-col items-start self-stretch justify-start gap-1">
        <div className="text-xl font-black text-white ">
          {t('language.title')}
        </div>
        <FormBuilder
          className={' flex-1 w-[200px] text-xs font-medium'}
          fields={[
            {
              name: 'language',
              type: 'select',
              // label: '',
              placeholder: t('language.placeholder'),
              colSpan: 12,
              validators: {
                onChange: ({ value }: any) => {
                  if (!value) {
                    return (
                      <span className="text-red-500">
                        {t('language.select')}
                      </span>
                    )
                  }

                  i18n.changeLanguage(value)
                  return false
                }
              },
              selectedRender: (origin, options) => {
                const item = options?.find((item) => item.value === origin)
                return (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 overflow-hidden rounded-full">
                      <img
                        className="object-cover w-full h-full"
                        src={item?.flag}
                        alt={item?.label}
                      />
                    </span>
                    <span>{item?.label}</span>
                  </div>
                )
              },
              optionRender: (origin, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-4 h-4 overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full"
                      src={origin.flag}
                      alt={origin.label}
                    />
                  </span>
                  <span>{origin.label}</span>
                </div>
              ),
              options: [
                {
                  label: 'English',
                  value: 'en',
                  flag: 'https://flagcdn.com/w40/gb.png'
                },
                {
                  label: 'Azerbaijani',
                  value: 'az',
                  flag: 'https://flagcdn.com/w40/az.png'
                },
                {
                  label: 'Kazakh',
                  value: 'kz',
                  flag: 'https://flagcdn.com/w40/kz.png'
                },
                {
                  label: 'Uzbek',
                  value: 'yz',
                  flag: 'https://flagcdn.com/w40/uz.png'
                },
                {
                  label: 'Russian',
                  value: 'ru',
                  flag: 'https://flagcdn.com/w40/ru.png'
                }
              ]
            }
          ]}
          onSubmit={() => {}}
          defaultValues={{ language: i18n.language }}
        />
      </div>
    </div>
  )
}

const style = css`
  background: radial-gradient(
    237.29% 116.82% at 60.95% -22.92%,
    #362c5a 0%,
    #181526 100%
  );
`
