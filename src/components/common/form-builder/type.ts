import React from 'react'
import { FieldApi, FieldListeners, FieldValidators } from '@tanstack/react-form'
import { CheckBoxFieldProps } from './fields/checkbox-field'
import { SelectFieldProps } from './fields/select-field'
import { TextFieldProps } from './fields/text-field'
import { DatePickerFieldProps } from './fields/datepicker.field'
import { SeparatorFieldProps } from './fields/separator-field'
import { TextareaFieldProps } from './fields/text-textarea'
import { LabelFieldProps } from './fields/label-field'
import { TextInfoFieldProps } from './fields/text-info'
import { TextInfoConfirmFieldProps } from './fields/text-info-confirm'

export type FormFieldApi = FieldApi<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

export type FieldType =
  | 'text'
  | 'textarea'
  | 'label'
  | 'separator'
  | 'select'
  | 'datepicker'
  | 'checkbox'
  | 'text-info'
  | 'date'
  | 'text-info-confirm'

export type FieldConfig = {
  name: string
  type: FieldType
  colSpan?: number
  description?: any
  renderDescription?: (content: string) => React.ReactNode
  listeners?: FieldListeners<any, any, any>
  styleItem?: React.CSSProperties
  validators?: FieldValidators<any, any, any, any, any, any, any, any, any, any>
} & Partial<DatePickerFieldProps> &
  Partial<TextFieldProps> &
  Partial<SelectFieldProps> &
  Partial<CheckBoxFieldProps> &
  Partial<SeparatorFieldProps> &
  Partial<TextareaFieldProps> &
  Partial<LabelFieldProps> &
  Partial<TextInfoFieldProps> &
  Partial<TextInfoConfirmFieldProps>
