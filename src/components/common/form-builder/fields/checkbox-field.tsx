import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldApi } from '../type';
import { cn } from '@/lib/utils';

export interface CheckBoxFieldProps {
  field: FormFieldApi;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}
export const CheckBoxField = (props: CheckBoxFieldProps) => {
  const { field, label, className, style } = props;
  return (
    <div className={cn('w-full relative flex gap-2', className)} style={style}>
      <Checkbox
        name={field.name}
        id={field.name}
        value={field.state.value}
        onCheckedChange={field.handleChange}
      />
      <label
        htmlFor={field.name}
        className="block text-body-small font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="absolute bottom-[-18px] left-0 flex flex-col">
        {field.state.meta.isTouched &&
          field.state.meta.errors?.length > 0 &&
          field.state.meta.errors.map((error, index) => (
            <span key={index} className="ml-2 text-body-small text-red-500">
              {error.message}
            </span>
          ))}
      </div>
    </div>
  );
};
