import { cn } from "@/lib/utils";

export interface LabelFieldProps {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LabelField = (props: LabelFieldProps) => {
  return <div className={cn('w-full font-semibold text-body-medium', props.className)} style={props.style}>
    {props.label}
  </div>;
};