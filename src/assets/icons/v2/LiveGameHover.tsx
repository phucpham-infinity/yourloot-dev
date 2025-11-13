import { SVGProps } from 'react'
const LiveGameHoverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.7927 1.6709L8.99891 5.06657L5.30078 1.6709M4.85757 16.3286H13.1433C14.9968 16.3286 16.5 14.8253 16.5 12.971V8.42399C16.5 6.56965 14.9968 5.06641 13.1433 5.06641H4.85757C3.00324 5.06641 1.5 6.56965 1.5 8.42399V12.971C1.5 14.8253 3.00324 16.3286 4.85757 16.3286Z"
      stroke="url(#paint0_linear_15001_13672)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_15001_13672"
        x1={13.7111}
        y1={0.755767}
        x2={9.05425}
        y2={20.31}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CAEEF" />
        <stop offset={0.489872} stopColor="#C693DF" />
        <stop offset={1} stopColor="#E8CCCC" />
      </linearGradient>
    </defs>
  </svg>
)
export default LiveGameHoverIcon
