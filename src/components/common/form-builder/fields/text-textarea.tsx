import { Textarea } from '@/components/ui/textarea'
import { cn, css } from '@/lib/utils'
import { compact } from 'lodash-es'
import { FormFieldApi } from '../type'

export interface TextareaFieldProps {
  field: FormFieldApi
  label: string
  placeholder?: string
  rows?: number
  className?: string
  style?: React.CSSProperties
  description?: string
  disabled: boolean
  renderDescription?: (content: string) => React.ReactNode
}

const defaultDescription = (description: string) => (
  <div css={descriptionStyle} className="description">
    {description}
  </div>
)

export const TextareaField = (props: TextareaFieldProps) => {
  const {
    field,
    placeholder,
    rows = 3,
    label,
    className,
    style,
    description,
    disabled = false,
    renderDescription = defaultDescription
  } = props

  return (
    <div
      className={cn('w-full relative flex flex-col', className)}
      style={style}
      css={stylesFn(disabled)}
    >
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <Textarea
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          field.state.meta.isTouched &&
            compact(field.state.meta.errors)?.length > 0 &&
            'border-red-500!'
        )}
        placeholder={placeholder}
        rows={rows}
      />
      <div className="absolute w-full bottom-[-18px] left-0 flex flex-col">
        {field.state.meta.isTouched &&
          field.state.meta.errors?.length > 0 &&
          field.state.meta.errors.map((error, index) => (
            <span key={index} className="description">
              {error}
            </span>
          ))}
        {description &&
          field.state.meta.errors?.length === 0 &&
          renderDescription(description)}
      </div>
    </div>
  )
}

const descriptionStyle = css`
  color: #6c6395;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

const stylesFn = (isDisabled: boolean) => css`
  gap: 10px;
  .label {
    color: #9e90cf;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    ${isDisabled && 'color: #605E68'}
  }
  textarea {
    display: flex;
    height: auto;
    padding: 20px;
    justify-content: flex-end;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #2e273c;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
    outline: none;
    box-shadow:
      6px 6px 12px 0px rgba(22, 20, 24, 0.5),
      -6px -6px 24px 0px rgba(148, 95, 255, 0.15);

    color: #6c6395;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    &:hover {
      outline: none;
      border: 1px solid #453561;
      background:
        linear-gradient(
          0deg,
          rgba(154, 103, 255, 0.2) 0%,
          rgba(154, 103, 255, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }

    &:focus {
      border: 1px solid #2a2339;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
    }
    &:disabled {
      cursor: not-allowed;
      border: 1px solid #3a3248;
      background:
        linear-gradient(
          0deg,
          rgba(97, 97, 97, 0.2) 0%,
          rgba(97, 97, 97, 0.2) 100%
        ),
        linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 100%);
      box-shadow:
        6px 6px 12px 0px rgba(22, 20, 24, 0.5),
        -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      &:hover,
      &:focus {
        background:
          linear-gradient(
            0deg,
            rgba(97, 97, 97, 0.2) 0%,
            rgba(97, 97, 97, 0.2) 100%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.1) 100%
          );
        box-shadow:
          6px 6px 12px 0px rgba(22, 20, 24, 0.5),
          -6px -6px 24px 0px rgba(148, 95, 255, 0.15);
      }
    }
  }
  .description {
    color: #6c6395;
    font-size: 10px;
    font-weight: 700;
    line-height: normal;
    padding-top: 10px;
  }
`
