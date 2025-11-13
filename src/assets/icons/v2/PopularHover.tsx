import { SVGProps } from 'react'
const PopularHoverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={18}
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.4627 6.37448C15.4839 10.3076 13.8583 15.5769 9.2149 16.3423C3.13478 17.6745 -0.921598 10.2508 3.64639 5.89854C3.89044 5.65773 4.56259 5.03424 4.84313 4.83398C4.84313 5.25072 5.21122 8.4785 5.78688 8.23442C8.15523 8.23442 8.7909 4.00048 8.46415 1.5C10.5957 2.61403 12.4013 4.16588 13.4627 6.37448Z"
      stroke="url(#paint0_linear_15001_15251)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_15001_15251"
        x1={11.9682}
        y1={0.563496}
        x2={6.32131}
        y2={20.075}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9CAEEF" />
        <stop offset={0.489872} stopColor="#C693DF" />
        <stop offset={1} stopColor="#E8CCCC" />
      </linearGradient>
    </defs>
  </svg>
)
export default PopularHoverIcon
