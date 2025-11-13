import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
export interface SeparatorFieldProps {
  className?: string;
  style?: React.CSSProperties;
}
export const SeparatorField = (props: SeparatorFieldProps) => {
  return <Separator style={props.style} className={cn('w-full', props.className)} />;
};
