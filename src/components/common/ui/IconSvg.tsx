import styled from '@emotion/styled'

export default function IconSvg({
  icon,
  width,
  height
}: {
  icon: string
  width?: string | number
  height?: string | number
}) {
  return (
    <IconSvgStyled width={width} height={height}>
      <img src={icon} alt="icon" />
    </IconSvgStyled>
  )
}

const IconSvgStyled = styled.div<any>`
  position: relative;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  max-width: ${(props) => props.width || 'auto'};
  max-height: ${(props) => props.height || 'auto'};
  overflow: hidden;
  img {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%) scale(1.15);
  }
`
