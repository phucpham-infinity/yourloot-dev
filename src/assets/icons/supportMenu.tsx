import { SVGProps } from 'react'
const SupportMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_770_194419)">
      <path
        d="M24 10.5V14.5C24 15.6031 23.1031 16.5 22 16.5H21.4555C20.6906 21.0328 16.7477 24.5 12 24.5C11.5578 24.5 11.2 24.1422 11.2 23.7C11.2 23.2578 11.5578 22.9 12 22.9C16.4109 22.9 20 19.3109 20 14.9V10.1C20 5.68906 16.4109 2.1 12 2.1C7.58906 2.1 4 5.68906 4 10.1V15.7C4 16.1422 3.64219 16.5 3.2 16.5H2C0.896875 16.5 0 15.6031 0 14.5V10.5C0 9.39688 0.896875 8.5 2 8.5H2.54453C3.30938 3.96719 7.25234 0.5 12 0.5C16.7477 0.5 20.6906 3.96719 21.4555 8.5H22C23.1031 8.5 24 9.39688 24 10.5ZM12 3.7C8.47109 3.7 5.6 6.57109 5.6 10.1V14.1C5.6 17.6289 8.47109 20.5 12 20.5C15.5289 20.5 18.4 17.6289 18.4 14.1V10.1C18.4 6.57109 15.5289 3.7 12 3.7Z"
        fill={props.fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_770_194419">
        <rect
          width={24}
          height={24}
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
)
export default SupportMenu
