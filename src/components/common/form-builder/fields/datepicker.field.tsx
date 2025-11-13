import { cn } from "@/lib/utils";
import { FormFieldApi } from "../type";
import { DatePicker } from "@/components/ui/datepicker";

export interface DatePickerFieldProps {
  field: FormFieldApi;
  label: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DatePickerField = (props: DatePickerFieldProps) => {
  const { className, style, placeholder, label, field } = props;
  return (
    <div style={style} className={cn("w-full relative", className)}>
      <label
        htmlFor={field.name}
        className="block text-body-small font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <DatePicker
        value={field.state.value}
        onChange={(date) => field.handleChange(date)}
        placeholder={placeholder}
      />
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
