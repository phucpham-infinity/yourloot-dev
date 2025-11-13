import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function SwitchCommon({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer cursor-pointer border-[#C3A2F1] data-[state=checked]:bg-gradient-brand-active data-[state=unchecked]:bg-gradient-muted shadow:6px 6px 12px 0px rgba(22, 20, 24, 0.50), -6px -6px 24px 0px rgba(148, 95, 255, 0.15) focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-1 shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          " w-3 h-3 data-[state=checked]:bg-[#D9CEFF] data-[state=unchecked]:bg-[#605E68]  pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchCommon };
