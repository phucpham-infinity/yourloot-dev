import { SVGProps } from 'react'
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={65}
    height={65}
    viewBox="0 0 65 65"
    fill="none"
    {...props}
  >
    <g filter="url(#filter0_di_1083_255545)">
      <path
        d="M50.6094 38.99C49.5032 37.8838 46.0158 35.3088 42.5533 33.3151C42.5158 33.3714 42.4783 33.4276 42.4408 33.4901C46.3469 27.1965 45.5782 18.8154 40.1096 13.3468C33.7347 6.97816 23.4037 6.97816 17.0288 13.3468C10.6539 19.7279 10.6602 30.0527 17.0288 36.4276C22.4474 41.84 30.716 42.6587 36.9909 38.8713C38.7971 42.0087 41.4283 45.6899 42.672 46.9336C44.8595 49.1211 48.4219 49.1148 50.6094 46.9274C52.7969 44.7336 52.7969 41.1837 50.6094 38.99ZM35.8097 32.1276C31.8098 36.1213 25.3349 36.1213 21.335 32.1214C17.3414 28.1277 17.3351 21.6529 21.335 17.6529C25.3287 13.6593 31.8098 13.6593 35.8035 17.6529C39.8034 21.6529 39.8034 28.134 35.8097 32.1276Z"
        fill="url(#paint0_radial_1083_255545)"
      />
      <path
        d="M39.7562 13.7005C45.0399 18.9844 45.7979 27.0748 42.0511 33.1694C42.0383 33.1897 42.0253 33.2108 42.0122 33.2325L42.4477 33.4985L42.3038 33.7484C45.7502 35.7328 49.1945 38.2822 50.2559 39.3435C52.2482 41.3421 52.2481 44.5759 50.2553 46.5743C48.2623 48.5668 45.0169 48.5714 43.0256 46.5801C41.8283 45.3828 39.2231 41.7465 37.4242 38.6218L37.1695 38.1795L36.7325 38.4432C30.6502 42.1145 22.6347 41.3203 17.3822 36.0738C11.2089 29.894 11.203 19.886 17.3824 13.7003C23.562 7.52692 33.5766 7.52697 39.7562 13.7005ZM36.163 32.4815L36.1633 32.4812C40.3524 28.2921 40.352 21.4944 36.157 17.2994C31.9681 13.1105 25.1704 13.1105 20.9815 17.2994C16.7861 21.4948 16.7927 28.2862 20.9815 32.4749C25.1766 36.6701 31.9678 36.6701 36.163 32.4815Z"
        stroke="url(#paint1_linear_1083_255545)"
        strokeOpacity={0.25}
      />
    </g>
    <defs>
      <filter
        id="filter0_di_1083_255545"
        x={0.25}
        y={0.570312}
        width={64}
        height={64.001}
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
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.13434 0 0 0 0 0.608333 0 0 0 0 0.497735 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1083_255545"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1083_255545"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1083_255545"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1083_255545"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(36.6295 -0.599488) rotate(96.2408) scale(46.7286 94.9104)"
      >
        <stop stopColor="#94C1EB" />
        <stop offset={1} stopColor="#71B8A7" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_1083_255545"
        x1={32.25}
        y1={8.57031}
        x2={32.25}
        y2={48.5711}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} />
      </linearGradient>
    </defs>
  </svg>
)
export default SearchIcon
