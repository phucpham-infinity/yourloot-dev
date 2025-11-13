import { useForm } from '@tanstack/react-form'
import React, { forwardRef, useImperativeHandle } from 'react'
import { CheckBoxField } from './fields/checkbox-field'
import { DateField } from './fields/date-field'
import { DatePickerField } from './fields/datepicker.field'
import { SelectField } from './fields/select-field'
import { SeparatorField } from './fields/separator-field'
import { TextField } from './fields/text-field'
import { TextareaField } from './fields/text-textarea'
import { TextInfoField } from './fields/text-info'
import { FieldConfig } from './type'
import { TextInfoConfirmField } from './fields/text-info-confirm'

const FIELD_COMPONENTS: any = {
  text: TextField,
  textarea: TextareaField,
  separator: SeparatorField,
  datepicker: DatePickerField,
  select: SelectField,
  checkbox: CheckBoxField,
  date: DateField,
  'text-info': TextInfoField,
  'text-info-confirm': TextInfoConfirmField
}

export interface FormBuilderProps {
  className?: string
  fields: FieldConfig[]
  onSubmit: (value: any) => void
  onFocus?: () => void
  defaultValues: any
  gap?: number
  footer?: React.ReactNode
  onBlur?: () => void
}

export interface FormBuilderRef {
  submit: () => void
}

export const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  (props, ref) => {
    const {
      fields,
      onSubmit,
      defaultValues,
      footer,
      gap,
      className,
      onFocus,
      onBlur
    } = props
    const form = useForm({
      defaultValues: defaultValues,
      onSubmit: ({ value }) => onSubmit(value)
    })

    useImperativeHandle(ref, () => {
      return {
        submit: form.handleSubmit,
        reset: form.reset,
        setFieldValue: (fieldName: string, value: any) => {
          form.setFieldValue(fieldName, value)
        },
        getFieldValue: (fieldName: string) => {
          return form.getFieldValue(fieldName)
        },
        clearError: (fieldName: string) => {
          form.setFieldMeta(fieldName, {
            errors: [],
            isTouched: false,
            isBlurred: true,
            isDirty: true,
            errorMap: { [fieldName]: null },
            isValidating: false,
            isPristine: false
          })
        },
        setError: (fieldName: string, message: string) => {
          form.setFieldMeta(fieldName, {
            errors: [{ message }],
            isTouched: true,
            isBlurred: true,
            isDirty: true,
            errorMap: { [fieldName]: message },
            isValidating: false,
            isPristine: false
          })
        }
      }
    }, [form])

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        autoFocus={true}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{
          rowGap: `${gap || 10}px`
        }}
        className={`grid grid-cols-12 ${className}`}
      >
        {!!fields.length &&
          fields.map((x) => {
            const FieldComponent = FIELD_COMPONENTS[x.type] as any
            return (
              <div
                key={x.name}
                style={{
                  gridColumn: `span ${x.colSpan || 12} / span ${
                    x.colSpan || 12
                  }`,
                  ...(x.styleItem || {})
                }}
              >
                <form.Field
                  validators={x.validators}
                  name={x.name}
                  children={(field) => <FieldComponent field={field} {...x} />}
                  listeners={x.listeners}
                />
              </div>
            )
          })}
        {footer}
      </form>
    )
  }
)
