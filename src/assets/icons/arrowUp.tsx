import { SVGProps } from "react";
const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
      width="30" height="23" viewBox="0 0 30 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
      <g filter="url(#filter0_d_12822_100860)">
          <path d="M15 5.44008C15.2868 5.44008 15.5735 5.54957 15.7921 5.76808L22.6718 12.6478C23.1094 13.0854 23.1094 13.795 22.6718 14.2325C22.2343 14.6699 21.5249 14.6699 21.0872 14.2325L15 8.14489L8.91279 14.2322C8.47515 14.6697 7.76581 14.6697 7.32839 14.2322C6.89054 13.7948 6.89054 13.0852 7.32839 12.6476L14.2079 5.76787C14.4267 5.54932 14.7134 5.44008 15 5.44008Z" fill="#9E90CF"/>
      </g>
      <defs>
          <filter id="filter0_d_12822_100860" x="0.6" y="0.64043" width="28.8" height="21.9201" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="1.6"/>
              <feGaussianBlur stdDeviation="3.2"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12822_100860"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12822_100860" result="shape"/>
          </filter>
      </defs>
  </svg>
);
export default ArrowUp;
