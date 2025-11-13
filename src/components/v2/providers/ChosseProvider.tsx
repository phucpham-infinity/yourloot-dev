import { FormBuilder } from '@/components/common/form-builder'
import { cn, DOMAIN_IMAGE_PROVIDER_LOOT } from '@/lib/utils'
import { gameController } from '@/services/controller'
import { useMemo } from 'react'

const ChosseProvider = ({
  className,
  onChange,
  provider
}: {
  className?: string
  onChange?: (value: string) => void
  provider?: string
}) => {
  const { useGetGameProviders } = gameController()
  const { data: dataGameProviders } = useGetGameProviders()

  const listProviders = useMemo(() => {
    const data = [...(dataGameProviders?.content?.providers || [])]
    return data?.map((item) => ({
      label: item,
      value: item,
      flag: `${DOMAIN_IMAGE_PROVIDER_LOOT}/logos/providers_small/white/${item}.svg`
    }))
  }, [dataGameProviders])

  return (
    <div className={cn('w-full mt-8 mb-4', className)}>
      <FormBuilder
        className={'w-full h-10 text-xs font-medium'}
        fields={[
          {
            name: 'provider',
            type: 'select',
            placeholder: 'Choose provider',
            colSpan: 12,
            validators: {
              onChange: ({ value }: any) => {
                console.log('value', value)
                onChange?.(value)
              }
            },
            selectedRender: (origin, options) => {
              const item = options?.find((item) => item.value === origin)
              return (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
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
                <span className="w-4 h-4 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={origin.flag}
                    alt={origin.label}
                  />
                </span>
                <span>{origin.label}</span>
              </div>
            ),
            options: listProviders || []
          }
        ]}
        onSubmit={() => {}}
        defaultValues={{ provider: provider }}
      />
    </div>
  )
}

export default ChosseProvider
