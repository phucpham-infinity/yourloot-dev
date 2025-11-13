import { SVGProps } from 'react'
import { useMemo } from 'react'

const YLIcon = (props: SVGProps<SVGSVGElement>) => {
  const uniqueId = useMemo(() => Math.random().toString(36).substr(2, 9), [])
  
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M8.90791 6.56043L3.25344 6.10521L0 3.51224L2.0797 1.53516L8.8499 3.85589L8.90791 6.56043Z"
      fill={`url(#paint0_linear_${uniqueId})`}
    />
    <path
      d="M16 8.99259L11.7825 9.02829L8.79688 3.83789L15.5671 6.15415L16 8.99259Z"
      fill={`url(#paint1_linear_${uniqueId})`}
    />
    <path
      d="M12.6346 3.67229L5.86445 1.35156L2.02637 1.51669L4.95848 4.00255L11.7287 6.31882L15.5667 6.15369L12.6346 3.67229Z"
      fill={`url(#paint2_linear_${uniqueId})`}
    />
    <path
      d="M11.7815 9.0282L3.25293 6.10497L4.95775 4.00293L11.7279 6.3192L11.7815 9.0282Z"
      fill={`url(#paint3_linear_${uniqueId})`}
    />
    <path
      d="M4.96667 15.0081L3.25293 6.10449L11.7815 9.02772L4.96667 15.0081Z"
      fill={`url(#paint4_linear_${uniqueId})`}
    />
    <path
      d="M4.96719 15.0083L0 3.51172L3.25344 6.10469L4.96719 15.0083Z"
      fill={`url(#paint5_linear_${uniqueId})`}
    />
    <path
      d="M11.7816 9.02789L15.999 8.99219L4.9668 15.0082L11.7816 9.02789Z"
      fill={`url(#paint6_linear_${uniqueId})`}
    />
    <path
      d="M15.9973 8.99413L11.7798 8.96289C11.7441 8.96289 11.7129 8.99413 11.7129 9.02983C11.7129 9.06107 11.7307 9.08339 11.7575 9.09231C11.7664 9.09231 11.7709 9.09231 11.7798 9.09231C11.7798 9.09231 16.0017 9.00752 15.9973 8.98967V8.99413Z"
      fill={`url(#paint7_linear_${uniqueId})`}
    />
    <path
      d="M11.849 8.96303L11.7954 6.38345C12.2952 6.35667 15.5576 6.17369 15.5665 6.15583L11.7374 6.25402L4.99396 3.94222C4.99396 3.94222 2.19127 1.57686 2.08862 1.53223C2.08862 1.55008 4.49859 3.68336 4.869 4.00916L3.24452 6.01302L0 3.50931L3.19542 6.14244L4.77974 14.3721C4.77974 14.3721 4.77974 14.3721 4.77974 14.381C4.81991 14.622 4.88239 14.7872 4.96719 15.0148C4.99843 15.0059 3.53014 7.24033 3.33824 6.21385L11.6526 9.06121C10.8716 9.75297 4.94934 14.9925 4.96719 15.0148C4.97611 15.0282 5.48934 14.6444 5.4938 14.6399L11.8088 9.09692C11.8088 9.09692 15.9994 9.00319 15.9994 8.99427C15.4014 8.97641 12.3309 8.96303 11.849 8.96303ZM4.98058 4.08057L11.6615 6.37006L11.7151 8.93625L3.36502 6.0755L4.98058 4.08057Z"
      fill={`url(#paint8_linear_${uniqueId})`}
    />
    <path
      opacity="0.54"
      d="M2.72873 2.05078L0.769531 4.1082L1.56392 4.77318L3.49189 2.79163L2.72873 2.05078Z"
      fill={`url(#paint9_linear_${uniqueId})`}
    />
    <path
      opacity="0.54"
      d="M4.14287 3.3125L2.43359 5.45025L2.8174 5.75819L4.52669 3.61598L4.14287 3.3125Z"
      fill={`url(#paint10_linear_${uniqueId})`}
    />
    <path
      opacity="0.54"
      d="M4.45703 6.54395L4.97027 15.0101L5.47011 6.86528L4.45703 6.54395Z"
      fill={`url(#paint11_linear_${uniqueId})`}
    />
    <path
      opacity="0.54"
      d="M4.45898 6.54621L5.89603 4.32812L6.81093 4.64499L5.47207 6.86754L4.45898 6.54621Z"
      fill={`url(#paint12_linear_${uniqueId})`}
    />
    <path
      d="M5.33056 3.83919L5.5671 2.57617L4.98246 3.72314L4.21484 3.81687L4.76378 4.36135L4.52278 5.62436L5.11189 4.48184L5.87504 4.38813L5.33056 3.83919Z"
      fill={`url(#paint13_linear_${uniqueId})`}
    />
    <path
      d="M5.42862 4.03962L6.31672 3.11133L5.201 3.74507L4.5048 3.41034L4.66547 4.16458L3.77734 5.09288L4.89306 4.45467L5.58482 4.79386L5.42862 4.03962Z"
      fill={`url(#paint14_linear_${uniqueId})`}
    />
    <path
      d="M1.88131 2.08672L1.91702 1.61365L1.5332 1.35034L1.99735 1.38158L2.26065 0.984375L2.22494 1.45745L2.61323 1.72076L2.14462 1.68952L1.88131 2.08672Z"
      fill={`url(#paint15_linear_${uniqueId})`}
    />
    <defs>
      <linearGradient
        id={`paint0_linear_${uniqueId}`}
        x1="1.51774"
        y1="1.54816"
        x2="7.29774"
        y2="5.91052"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint1_linear_${uniqueId}`}
        x1="11.6416"
        y1="6.50678"
        x2="16.3095"
        y2="6.77552"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint2_linear_${uniqueId}`}
        x1="7.84755"
        y1="0.215493"
        x2="10.0301"
        y2="8.48295"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint3_linear_${uniqueId}`}
        x1="5.2523"
        y1="4.08773"
        x2="15.3921"
        y2="13.7097"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint4_linear_${uniqueId}`}
        x1="7.42572"
        y1="7.81826"
        x2="3.56969"
        y2="18.6498"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint5_linear_${uniqueId}`}
        x1="1.08694"
        y1="3.63146"
        x2="5.73695"
        y2="14.2396"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint6_linear_${uniqueId}`}
        x1="13.5131"
        y1="9.27546"
        x2="5.6071"
        y2="14.851"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3CD6F4" />
        <stop offset="0.16" stopColor="#37CBEF" />
        <stop offset="0.44" stopColor="#2BB0E3" />
        <stop offset="0.8" stopColor="#1884D0" />
        <stop offset="1" stopColor="#0C69C4" />
      </linearGradient>
      <linearGradient
        id={`paint7_linear_${uniqueId}`}
        x1="14.5587"
        y1="6.88119"
        x2="11.4945"
        y2="16.2665"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.14" stopColor="#FEF2FE" />
        <stop offset="0.34" stopColor="#FDDCFD" />
        <stop offset="0.6" stopColor="#FBB8FA" />
        <stop offset="0.89" stopColor="#F888F7" />
        <stop offset="1" stopColor="#F774F6" />
      </linearGradient>
      <linearGradient
        id={`paint8_linear_${uniqueId}`}
        x1="8.45078"
        y1="4.88717"
        x2="5.39072"
        y2="14.2741"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.14" stopColor="#FEF2FE" />
        <stop offset="0.34" stopColor="#FDDCFD" />
        <stop offset="0.6" stopColor="#FBB8FA" />
        <stop offset="0.89" stopColor="#F888F7" />
        <stop offset="1" stopColor="#F774F6" />
      </linearGradient>
      <linearGradient
        id={`paint9_linear_${uniqueId}`}
        x1="1.75658"
        y1="3.07682"
        x2="2.63802"
        y2="3.83637"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.1" stopColor="#F7F8FE" />
        <stop offset="0.26" stopColor="#E1F4FD" />
        <stop offset="0.46" stopColor="#BDEDFB" />
        <stop offset="0.68" stopColor="#8CE3F8" />
        <stop offset="0.93" stopColor="#4ED7F4" />
        <stop offset="1" stopColor="#3AD4F3" />
      </linearGradient>
      <linearGradient
        id={`paint10_linear_${uniqueId}`}
        x1="2.82993"
        y1="4.30521"
        x2="4.14298"
        y2="4.75502"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.1" stopColor="#F7F8FE" />
        <stop offset="0.26" stopColor="#E1F4FD" />
        <stop offset="0.46" stopColor="#BDEDFB" />
        <stop offset="0.68" stopColor="#8CE3F8" />
        <stop offset="0.93" stopColor="#4ED7F4" />
        <stop offset="1" stopColor="#3AD4F3" />
      </linearGradient>
      <linearGradient
        id={`paint11_linear_${uniqueId}`}
        x1="3.19999"
        y1="10.2405"
        x2="6.25253"
        y2="11.2862"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.1" stopColor="#F7F8FE" />
        <stop offset="0.26" stopColor="#E1F4FD" />
        <stop offset="0.46" stopColor="#BDEDFB" />
        <stop offset="0.68" stopColor="#8CE3F8" />
        <stop offset="0.93" stopColor="#4ED7F4" />
        <stop offset="1" stopColor="#3AD4F3" />
      </linearGradient>
      <linearGradient
        id={`paint12_linear_${uniqueId}`}
        x1="4.88405"
        y1="5.33249"
        x2="6.39976"
        y2="5.85173"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFFAFF" />
        <stop offset="0.1" stopColor="#F7F8FE" />
        <stop offset="0.26" stopColor="#E1F4FD" />
        <stop offset="0.46" stopColor="#BDEDFB" />
        <stop offset="0.68" stopColor="#8CE3F8" />
        <stop offset="0.93" stopColor="#4ED7F4" />
        <stop offset="1" stopColor="#3AD4F3" />
      </linearGradient>
      <linearGradient
        id={`paint13_linear_${uniqueId}`}
        x1="5.51995"
        y1="3.00936"
        x2="4.46212"
        y2="5.47751"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#FFFDFF" />
      </linearGradient>
      <linearGradient
        id={`paint14_linear_${uniqueId}`}
        x1="6.03945"
        y1="3.46719"
        x2="3.80218"
        y2="4.95281"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#FFFDFF" />
      </linearGradient>
      <linearGradient
        id={`paint15_linear_${uniqueId}`}
        x1="2.25163"
        y1="1.13772"
        x2="1.86454"
        y2="2.03354"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#FFFDFF" />
      </linearGradient>
    </defs>
  </svg>
  )
}
export default YLIcon
