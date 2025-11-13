import ArrowLeftIcon from '@/assets/icons/arrowLeft'
import CustomButton from '@/components/common/custom-button'
import { CustomDrawer } from '@/components/common/custom-drawer'
import notificationIcon from '@/assets/images/notification.svg'
import menuIcon from '@/assets/images/menu.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface HeaderProps {
  onClose?: () => void
  onMarkAllAsRead?: () => void
  isAuthorized?: boolean
}

const Header = ({ onClose, onMarkAllAsRead, isAuthorized }: HeaderProps) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMarkAll = () => {
    onMarkAllAsRead?.()
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile header: keep existing sticky bar UI */}
      <div className="md:hidden sticky top-0 z-50 h-14 w-full border-b border-[#453561] backdrop-blur-lg flex items-center gap-2 pb-4 mb-2 px-6">
        <div className="flex-1 flex items-center">
          <CustomButton
            aria-label="Back"
            onClick={() => (onClose ? onClose() : navigate('/'))}
            variant="muted"
            label={<ArrowLeftIcon className="w-4 h-4 text-slate-300" />}
            className="w-fit min-w-0"
          />
        </div>

        <div className="flex-shrink-0 h-4 grid grid-flow-col auto-cols-max justify-center items-center gap-2">
          <img src={notificationIcon} alt="" aria-hidden className="w-8 h-8" />
          <div className="justify-center text-white text-base font-black font-['Satoshi'] py-1">
            Notifications
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end">
          {isAuthorized ? (
            <CustomButton
              aria-label="Options"
              variant="muted"
              label={
                <img src={menuIcon} alt="" aria-hidden className="w-4 h-4" />
              }
              className="w-fit min-w-0"
              onClick={() => setIsMenuOpen(true)}
            />
          ) : null}
        </div>

        <CustomDrawer
          hideHeader
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          title=""
          contentClassName="border-none"
          bodyClassName="py-6 px-0"
        >
          <div className="w-full flex justify-center">
            <div className="w-96 mx-auto bg-[#040305] rounded-tl-[20px] rounded-tr-[20px] backdrop-blur-lg inline-flex flex-col justify-start items-center">
              <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <CustomButton
                  onClick={handleMarkAll}
                  variant="muted"
                  label="Mark all as read"
                  className="self-stretch h-10"
                />
              </div>
            </div>
          </div>
        </CustomDrawer>
      </div>

      {/* Desktop header: simple text block per raw.tsx */}
      <div className="hidden md:block">
        <div className="inline-flex flex-col justify-start items-start gap-3 py-2">
          <div className="self-stretch justify-start text-white text-xl font-black font-['Satoshi']">
            Notifications
          </div>
          <div className="justify-center text-slate-400 text-sm font-medium font-['Satoshi']">
            Stay updated with your account activity and promotions
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
