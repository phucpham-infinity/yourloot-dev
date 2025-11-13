export const DepositRightContent = ({
  children
}: {
  children?: React.ReactNode
}) => {
  return (
    <div data-slot="deposit-right-content" className="w-full h-full">
      {children}
    </div>
  )
}
