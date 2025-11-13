import { SVGProps } from "react";
const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M2 8C2 11.3133 4.68605 14 8 14C11.3139 14 14 11.3133 14 8C14 4.68605 11.3139 2 8 2C4.68605 2 2 4.68605 2 8Z"
      stroke="#9E90CF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.0038 10.4621V7.59573M8 5.5695V5.52734"
      stroke="#9E90CF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Info;
