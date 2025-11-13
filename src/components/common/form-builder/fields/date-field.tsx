import { cn, css } from '@/lib/utils'
import { FormFieldApi } from '../type'
import { useState } from 'react'
import { CustomSelect } from '../../custom-select'

export interface DateFieldProps {
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
}

const defaultDescription = (description: string) => (
  <div css={descriptionStyle} className="description">
    {description}
  </div>
)

export const DateField = (props: DateFieldProps) => {
  const {
    field,
    label,
    className,
    style,
    description,
    renderDescription = defaultDescription
  } = props

  const [day, setDay] = useState<number | undefined>(undefined)
  const [month, setMonth] = useState<number | undefined>(undefined)
  const [year, setYear] = useState<number | undefined>(undefined)

  return (
    <div
      css={styles}
      className={cn('w-full relative flex flex-col gap-[10px]', className)}
      style={style}
    >
      <label htmlFor={field.name} className="select-label">
        {label}
      </label>
      <div className="flex flex-row gap-2">
        <CustomSelect
          value={day}
          placeholder="Day"
          onValueChange={(value) => {
            setDay(Number(value))
            if (month && year) {
              field.handleChange(new Date(year, month - 1, Number(value)))
            }
          }}
          options={Array.from({ length: 31 }, (_, i) => ({
            label: String(i + 1),
            value: String(i + 1)
          }))}
        />
        <CustomSelect
          value={month}
          placeholder="Month"
          onValueChange={(value) => {
            setMonth(Number(value))
            if (day && year) {
              field.handleChange(new Date(year, Number(value) - 1, day))
            }
          }}
          options={Array.from({ length: 12 }, (_, i) => ({
            label: String(i + 1),
            value: String(i + 1)
          }))}
        />
        <CustomSelect
          placeholder="Year"
          value={year}
          onValueChange={(value) => {
            setYear(Number(value))
            if (day && month) {
              field.handleChange(new Date(Number(value), month - 1, day))
            }
          }}
          options={Array.from({ length: 100 }, (_, i) => ({
            label: String(new Date().getFullYear() - i),
            value: String(new Date().getFullYear() - i)
          }))}
        />
      </div>
      <div className="absolute w-full bottom-[-16px] left-0 flex flex-col">
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
    color: var(--YourLoot-Brand-Medium, #9e90cf);
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
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
