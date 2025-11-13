import { SVGProps } from 'react'
const MenuHoverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.75 16.0547H17.0833"
      stroke="url(#paint0_linear_13238_97931)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 4.3877H17.0833"
      stroke="url(#paint1_linear_13238_97931)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.75 10.2217H17.0833"
      stroke="url(#paint2_linear_13238_97931)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_13238_97931"
        x1={14.6043}
        y1={15.9923}
        x2={14.5785}
        y2={17.4015}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CAEEF" />
        <stop offset={0.489872} stopColor="#C693DF" />
        <stop offset={1} stopColor="#E8CCCC" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_13238_97931"
        x1={14.6043}
        y1={4.32526}
        x2={14.5785}
        y2={5.73451}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CAEEF" />
        <stop offset={0.489872} stopColor="#C693DF" />
        <stop offset={1} stopColor="#E8CCCC" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_13238_97931"
        x1={14.6043}
        y1={10.1592}
        x2={14.5785}
        y2={11.5685}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CAEEF" />
        <stop offset={0.489872} stopColor="#C693DF" />
        <stop offset={1} stopColor="#E8CCCC" />
      </linearGradient>
    </defs>
  </svg>
)
export default MenuHoverIcon
