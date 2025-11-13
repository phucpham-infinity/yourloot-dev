import { cn, css } from '@/lib/utils'
import { FormFieldApi } from '../type'
import { CustomSelect } from '@/components/common/custom-select'

export interface SelectFieldProps {
  field: FormFieldApi
  label: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  options: any[]
  optionRender?: (origin: any, index: number) => React.ReactNode
  selectedRender?: (origin: any, options?: any[]) => React.ReactNode
  description?: string
  renderDescription?: (content: string) => React.ReactNode
  searchable?: boolean
  disabled?: boolean
  selectContentClassName?: string
  selectTriggerClassName?: string
}

const defaultDescription = (description: string) => (
  <div css={descriptionStyle} className="description">
    {description}
  </div>
)

export const SelectField = (props: SelectFieldProps) => {
  const {
    field,
    label,
    placeholder,
    className,
    style,
    options = [],
    optionRender,
    description,
    renderDescription = defaultDescription,
    disabled = false,
    selectContentClassName,
    selectTriggerClassName
  } = props

  return (
    <div
      css={styles}
      className={cn('w-full relative flex flex-col gap-[10px] ', className)}
      style={style}
    >
      <label htmlFor={field.name} className="select-label">
        {label}
      </label>
      <CustomSelect
        disabled={disabled}
        value={field.state.value}
        onValueChange={field.handleChange}
        placeholder={placeholder}
        options={options}
        optionRender={optionRender}
        className={cn(
          'rounded-[10px]',
          field.state.meta.isTouched &&
            field.state.meta.errors?.length > 0 &&
            'border-red-500!',
          selectTriggerClassName
        )}
        selectContentClassName={selectContentClassName}
      />
      <div className="absolute w-full bottom-[-13px] left-0 flex flex-col">
        {field.state.meta.isTouched && field.state.meta.errors?.length > 0
          ? field.state.meta.errors.map((error, index) => (
              <span key={index} className="description">
                {error}
              </span>
            ))
          : null}
        {description &&
          field.state.meta.errors?.length === 0 &&
          renderDescription(description)}
      </div>
    </div>
  )
}

const styles = css`
  .select-label {
    color: var(--YourLoot-Brand-Medium, #ffffff);
    font-size: 14px;
    font-weight: 700;
    line-height: 10px;
  }
  .description {
    color: #6c6395;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
  }
`

const descriptionStyle = css`
  color: #6c6395;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
