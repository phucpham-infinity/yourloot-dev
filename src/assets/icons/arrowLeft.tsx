import { SVGProps } from 'react'
const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={12}
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.580057 5.99998C0.580057 5.78492 0.662174 5.56988 0.826061 5.40591L5.98586 0.24617C6.31408 -0.0820568 6.84625 -0.0820567 7.17434 0.24617C7.50243 0.574264 7.50243 1.10632 7.17434 1.43458L2.60867 5.99998L7.17418 10.5654C7.50227 10.8936 7.50227 11.4256 7.17418 11.7537C6.84609 12.0821 6.31392 12.0821 5.9857 11.7537L0.825902 6.59405C0.661988 6.43 0.580057 6.21496 0.580057 5.99998Z"
      fill={props.fill || '#9E90CF'}
    />
  </svg>
)
export default ArrowLeftIcon
