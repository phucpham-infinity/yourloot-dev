import { FormBuilder } from '@/components/common/form-builder'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface LanguageProps {
  className?: string
  showLabel?: boolean
  selectContentClassName?: string
  selectTriggerClassName?: string
}

export default function LanguageV2({
  className,
  showLabel = true,
  selectContentClassName,
  selectTriggerClassName
}: LanguageProps) {
  const { t, i18n } = useTranslation()

  return (
    <div className={cn('w-full mt-8 mb-4', className)}>
      <FormBuilder
        className={'w-full h-10 text-xs font-medium'}
        fields={[
          {
            name: 'language',
            type: 'select',
            placeholder: t('language.placeholder'),
            colSpan: 12,
            validators: {
              onChange: ({ value }: any) => {
                if (!value) {
                  return (
                    <span className="text-red-500">{t('language.select')}</span>
                  )
                }

                i18n.changeLanguage(value)
                return false
              }
            },
            selectedRender: (origin, options) => {
              const item = options?.find((item) => item.value === origin)
              return (
                <div className={cn('flex items-center gap-2')}>
                  <span
                    className={cn(
                      'w-3 h-3 rounded-full overflow-hidden',
                      !showLabel && 'rounded-[3px]'
                    )}
                  >
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={item?.flag}
                      alt={item?.label}
                    />
                  </span>
                  {showLabel && <span>{item?.label}</span>}
                </div>
              )
            },
            optionRender: (origin, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-2',
                  !showLabel && 'w-3 translate-x-[-2px]'
                )}
              >
                <span
                  className={cn(
                    'w-3 h-3 rounded-full overflow-hidden',
                    !showLabel && 'rounded-[3px]'
                  )}
                >
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={origin.flag}
                    alt={origin.label}
                  />
                </span>
                {showLabel && <span>{origin.label}</span>}
              </div>
            ),
            selectContentClassName,
            selectTriggerClassName,
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
              },
              {
                label: 'Spain',
                value: 'es',
                flag: 'https://flagcdn.com/w40/es.png'
              }
            ]
          }
        ]}
        onSubmit={() => {}}
        defaultValues={{ language: i18n.language }}
      />
    </div>
  )
}
