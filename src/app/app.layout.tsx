import './app.css'
import { Outlet } from 'react-router-dom'
import MainLayout from '@/components/common/main-layout'
import { CustomDialog } from '@/components/common/custom-dialog'
import { BasicDialog } from '@/components/common/basic-dialog'
import { AuthGuard } from '@/components/guard/auth-guard'

function App() {
  return (
    <AuthGuard>
      <MainLayout>
        <Outlet />
        <CustomDialog />
        <BasicDialog />
      </MainLayout>
    </AuthGuard>
  )
}

export default App
