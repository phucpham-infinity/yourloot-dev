import { SVGProps } from 'react'
const DepositIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={27}
    viewBox="0 0 26 27"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_di_7407_50722)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2266 15.4362V12.7744H9.56375C8.54687 12.7744 8.54687 11.2269 9.56375 11.2269H12.2266V8.56406C12.2266 7.54719 13.7741 7.54719 13.7741 8.56406V11.2269H16.4359C17.4528 11.2269 17.4528 12.7744 16.4359 12.7744H13.7741V15.4362C13.7741 16.4531 12.2266 16.4531 12.2266 15.4362ZM13 20C17.4184 20 21 16.4187 21 12C21 7.58156 17.4184 4 13 4C8.58156 4 5 7.58156 5 12C5 16.4184 8.58156 20 13 20Z"
        fill="url(#paint0_radial_7407_50722)"
      />
      <path
        d="M13 4.2002C17.308 4.2002 20.7998 7.69202 20.7998 12C20.7998 16.3083 17.308 19.7998 13 19.7998C8.69202 19.7998 5.2002 16.308 5.2002 12C5.2002 7.69202 8.69202 4.2002 13 4.2002ZM13 7.60156C12.7649 7.60163 12.5231 7.67875 12.3369 7.8418C12.1468 8.0084 12.0264 8.25495 12.0264 8.56445V11.0273H9.56348C9.25421 11.0274 9.00835 11.1469 8.8418 11.3369C8.67861 11.5232 8.60156 11.7657 8.60156 12.001C8.60164 12.2361 8.67869 12.4779 8.8418 12.6641C9.00835 12.8541 9.25413 12.9745 9.56348 12.9746H12.0264V15.4365C12.0264 15.7459 12.1468 15.9917 12.3369 16.1582C12.5231 16.3213 12.7648 16.3984 13 16.3984C13.2353 16.3984 13.4778 16.3214 13.6641 16.1582C13.854 15.9917 13.9736 15.7458 13.9736 15.4365V12.9746H16.4355C16.7451 12.9746 16.9916 12.8542 17.1582 12.6641C17.3213 12.4779 17.3984 12.2361 17.3984 12.001C17.3984 11.7657 17.3214 11.5232 17.1582 11.3369C16.9916 11.1468 16.745 11.0273 16.4355 11.0273H13.9736V8.56445C13.9736 8.25499 13.8542 8.0084 13.6641 7.8418C13.4778 7.67861 13.2353 7.60156 13 7.60156Z"
        stroke="url(#paint1_linear_7407_50722)"
        strokeOpacity={0.25}
        strokeWidth={0.4}
      />
    </g>
    <defs>
      <filter
        id="filter0_di_7407_50722"
        x={0.2}
        y={0.8}
        width={25.6}
        height={25.6}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1.6} />
        <feGaussianBlur stdDeviation={2.4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.535556 0 0 0 0 1 0 0 0 0 0.129167 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_7407_50722"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_7407_50722"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={0.8} />
        <feGaussianBlur stdDeviation={0.8} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_7407_50722"
        />
      </filter>
      <radialGradient
        id="paint0_radial_7407_50722"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(14.7518 0.332152) rotate(96.2409) scale(18.6911 37.9642)"
      >
        <stop stopColor="#36EBB8" />
        <stop offset={1} stopColor="#49F155" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_7407_50722"
        x1={13}
        y1={4}
        x2={13}
        y2={20}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
export default DepositIcon
