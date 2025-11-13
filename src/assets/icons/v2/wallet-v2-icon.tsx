import { cn } from '@/lib/utils'

interface WalletV2IconProps {
  className?: string
  size?: number
  color?: string
  strokeWidth?: number
}

function WalletV2Icon({
  className,
  size = 14,
  color = 'currentColor',
  strokeWidth = 1.5
}: WalletV2IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(color, className)}
    >
      <path
        d="M13.0002 8.60413H10.0976C9.36653 8.60413 8.775 8.01193 8.775 7.2816V6.55186C8.775 5.82153 9.36653 5.2293 10.0976 5.2293H13.0002M10.3321 6.8793H10.3297M4.29053 1.45898H9.70927C11.5267 1.45898 12.9998 2.93204 12.9998 4.74952V9.24912C12.9998 11.0666 11.5267 12.5397 9.70927 12.5397H4.29053C2.47305 12.5397 1 11.0666 1 9.24912V4.74952C1 2.93204 2.47305 1.45898 4.29053 1.45898Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default WalletV2Icon
