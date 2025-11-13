import FailIcon from '@/assets/icons/status/fail'
import Warning2Icon from '@/assets/icons/warning2'
import ValidatePass from '@/assets/images/login/validate-pass.svg'
import { ReactNode } from 'react'
import { toast } from 'sonner'

interface ToastOptions {
  duration?: number
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  description?: string
  action?: ReactNode
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || 3000,
      position: options?.position || 'bottom-center',
      description: options?.description,
      action: options?.action,
      icon: <img src={ValidatePass} alt="" className="w-4 h-4" />,
      style: {
        zIndex: 999999999,
        background: '#0B0A11',
        border: '1px solid #48E364',
        borderRadius: '10px',
        color: 'white'
      }
    })
  }

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration || 3000,
      position: options?.position || 'bottom-center',
      description: options?.description,
      action: options?.action,
      icon: <Warning2Icon className="w-4 h-4" />,
      style: {
        zIndex: 999999999,
        background: '#3C2C1A',
        border: '1px solid #E3B075',
        borderRadius: '10px',
        color: 'white'
      }
    })
  }

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || 3000,
      position: options?.position || 'bottom-center',
      description: options?.description,
      action: options?.action,
      icon: <FailIcon className="w-4 h-4" />,
      style: {
        zIndex: 999999999,
        background: '#0B0A11',
        border: '1px solid #D94244',
        borderRadius: '10px',
        color: 'white'
      }
    })
  }

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, {
      duration: options?.duration || 3000,
      position: options?.position || 'bottom-center',
      description: options?.description,
      action: options?.action,
      style: {
        zIndex: 999999999,
        background: '#0B0A11',
        border: '1px solid #9E90CF',
        borderRadius: '10px',
        color: 'white'
      }
    })
  }

  return {
    success: showSuccess,
    warning: showWarning,
    error: showError,
    info: showInfo
  }
}

export default useToast
