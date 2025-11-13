import { SVGProps } from 'react'
const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={13}
        height={13}
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clip-path="url(#clip0_7407_51389)">
            <path d="M6.5 12.5C3.18629 12.5 0.5 9.81368 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81368 0.5 12.5 3.18629 12.5 6.5C12.5 9.81368 9.81368 12.5 6.5 12.5ZM7.1 6.5V3.5H5.9V7.7H9.5V6.5H7.1Z" fill="#0B0A11"/>
        </g>
        <defs>
            <clipPath id="clip0_7407_51389">
                <rect width="12" height="12" fill="white" transform="translate(0.5 0.5)"/>
            </clipPath>
        </defs>
    </svg>
)
export default ClockIcon