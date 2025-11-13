/**
 * PromoCodeButton Component
 *
 * This component displays a button for a predefined promo code.
 * It is used in the PromoCodes component.
 */
interface PromoCodeButtonProps {
  code: string
  onClick: (code: string) => void
}

export default function PromoCodeButton({
  code,
  onClick
}: PromoCodeButtonProps) {
  return (
    <button
      onClick={() => onClick(code)}
      data-show-icon-left="false"
      data-show-icon-right="false"
      data-show-text="true"
      data-state="Rest"
      className="h-7 px-2.5 py-5 rounded-[10px] bg-gradient-muted hover:bg-gradient-muted-hover border-[#3a3049] active:bg-gradient-muted-active border flex justify-center items-center gap-[5px] "
    >
      <div className="flex justify-start items-center gap-[5px]">
        <div className="text-center justify-center text-v2-app-medium-14 text-app-white font-['Satoshi']">
          {code}
        </div>
      </div>
    </button>
  )
}
