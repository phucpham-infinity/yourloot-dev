import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface DatePickerProps {
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: Date;
  onChange?: (date?: Date) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { value, onChange, placeholder, className, style } = props;
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-between text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
          style={style}
        >
          {value ? (
            format(value, 'PPP')
          ) : (
            <span className="w-full">{placeholder ?? ' '}</span>
          )}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
