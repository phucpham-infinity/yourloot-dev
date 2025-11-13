import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import ArrowLeft from "@/assets/icons/arrowLeft.tsx";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer gap-[81px] font-normal rounded-[15px] py-[14px] px-[12px] max-h-[40px] text-sm font-medium justify-center border border-solid border-[#C3A2F1]",
  {
    variants: {
      variant: {
        defaultMuted:
          "text-[#9d90CF] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted hover:bg-gradient-muted-hover",
        activateMuted:
          "text-[#9d90CF] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted-active",
        disabledMuted:
          "text-[#605E68] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] bg-gradient-muted-disabled ",

        default:
          "text-[#D9CEFF] bg-gradient-default hover:bg-gradient-muted-hover",
        activate: "text-[#D9CEFF] bg-gradient-default-active",
        disabled: "text-[#D9CEFF] bg-gradient-default-disabled text-[#605E68] ",

        defaultCTA:
          "text-[#D9CEFF] border border-[#C3A2F1] shadow-[6px 6px 12px 0px rgba(22, 20, 24, 0.50),-6px -6px 24px 0px rgba(113, 255, 95, 0.15)] bg-gradient-cta hover:bg-gradient-cta-hover",
        activateCTA:
          "text-[#D9CEFF]  border border-[#A6F1A2] shadow-[6px 6px 12px 0px rgba(22, 20, 24, 0.50),-6px -6px 24px 0px rgba(113, 255, 95, 0.15)] bg-gradient-cta-active",
        disabledCTA:
          "text-[#605E68] border shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(113,255,95,0.15)] border-solid border-[#A6F1A2] bg-gradient-cta-disabled",
        custom:
          "text-[#d8ceff] p-5 bg-[#372864] rounded-[16px] shadow-[6px_6px_12px_0px_rgba(22,20,24,0.50),-6px_-6px_24px_0px_rgba(148,95,255,0.15)] border border-[#59438a] justify-between items-center inline-flex",
      },
      size: {
        small:
          "text-[#605E68] p-[2px] bg-gradient-cta-disabled rounded-[10px] text-[10px] max-h-[28px] gap-[8px] border border-solid border-[#C3A2F1] bg-gradient-to-b from-[#39225B] to-[#130E1E]",
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

function ButtonMuted({
  className,
  variant,
  title,
  size,
  asChild = false,
  icon,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    icon?: any;
  }) {
  const Comp = asChild ? Slot : "button";

  // handle variant apply color icon
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className, size }))}
      {...props}
    >
      <div
        className={cn(
          "flex items-center h-[12px]",
          size === "small" ? "gap-[0px]" : "gap-[2px]"
        )}
      >
        {iconInside(icon)}
        <div className={cn(size === "small" ? "mb-[1px]" : "mb-[3px]")}>
          {title}
        </div>
      </div>
    </Comp>
  );
}

const iconInside = (icon: string) => {
  switch (icon) {
    case "arrowLeft":
      return <ArrowLeft />;
    default:
      return "";
  }
};

export default ButtonMuted;
