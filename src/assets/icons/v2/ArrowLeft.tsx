import { SVGProps } from 'react'
const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={21}
        height={26}
        viewBox="0 0 21 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_d_9326_4541)">
            <path d="M3.44008 7.99997C3.44008 7.71322 3.54957 7.4265 3.76808 7.20788L10.6478 0.328227C11.0854 -0.109409 11.795 -0.109409 12.2325 0.328227C12.6699 0.765686 12.6699 1.4751 12.2325 1.91277L6.14489 7.99997L12.2322 14.0872C12.6697 14.5249 12.6697 15.2342 12.2322 15.6716C11.7948 16.1095 11.0852 16.1095 10.6476 15.6716L3.76787 8.79207C3.54932 8.57334 3.44008 8.28662 3.44008 7.99997Z" fill="#9E90CF"/>
        </g>
        <defs>
            <filter id="filter0_d_9326_4541" x="-4.56055" y="-6" width="25.1211" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="2"/>
                <feGaussianBlur stdDeviation="4"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9326_4541"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9326_4541" result="shape"/>
            </filter>
        </defs>
    </svg>

)
export default ArrowLeft