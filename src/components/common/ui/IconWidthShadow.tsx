export default function IconWidthShadow({
  icon,
  iconShadow,
  iconShadowStyle = {},
  iconStyle = {},
  className = ''
}: {
  icon: any
  iconShadow: any
  iconShadowStyle?: React.CSSProperties
  className?: any
  iconStyle?: React.CSSProperties
}) {
  const iconShadowStyleDefault: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '61%',
    transform: `translate(-50%, -50%) scale(1.6)`,
    zIndex: 0
  }
  return (
    <div className={`relative w-[40px] ${className}`}>
      <img style={{ zIndex: 1, position: 'relative' , ...iconStyle}} src={icon} alt="icon" />
      <img
        style={{ ...iconShadowStyleDefault, ...iconShadowStyle }}
        src={iconShadow}
        alt="icon-shadow"
      />
    </div>
  )
}
