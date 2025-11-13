import { Outlet } from 'react-router'
import { css } from '@emotion/react'
import { userController, walletsController } from '@/services/controller'
import { useAuthStore } from '@/store'

export const WalletLayout = () => {
  const { useGetUserProfile } = userController()
  const { useGetUserWallets } = walletsController()
  const { userId } = useAuthStore()
  useGetUserProfile(userId)
  useGetUserWallets(userId ?? '')
  return (
    <div css={styles} className="w-full flex flex-col  text-white">
      <Outlet />
    </div>
  )
}
const styles = css`
  .warning-alert {
    border-radius: 10px;
    border: 1px solid #e3b075;
    background: #0b0a11;
  }
`
