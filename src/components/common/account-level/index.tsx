import ProfileIcon from '@/assets/icons/profile'
import { css } from '@/lib/utils'
import IconBtn from '@/components/common/icon-button'
import { useNavigate } from 'react-router-dom'
import { isDesktop } from 'react-device-detect'
import { UserLevel } from '@/services/controller/levels'
import { GAME_LEVELS } from '@/constants'
interface AccountLevelProps {
  isAuthenticated: boolean
  level?: UserLevel | null
}

export default function AccountLevel(props: AccountLevelProps) {
  const { isAuthenticated, level } = props
  const navigate = useNavigate()

  const ProfileBtn = () => {
    return (
      <IconBtn
        height={'calc(var(--spacing)* 10 + 2px)'}
        onClick={() => {
          if (isAuthenticated) navigate('/profile')
          else navigate('/auth/login')
        }}
        icon={<ProfileIcon />}
      />
    )
  }

  return (
    <div
     
    >
      {isDesktop ? (
        <div
          css={style}
          className="w-[128px] shadow-header-balance bg-header-balance relative h-10 max-h-10 overflow-hidden p-5 rounded-[15px]  border border-[#3b2f51] justify-start items-center gap-2.5 inline-flex"
        >
          <div
            style={{
              width: level?.levelName
                ? `${(GAME_LEVELS[level.levelName]?.progress || 0) * 62}%`
                : '0%',
              display: level?.levelName ? 'block' : 'none'
            }}
            className="level-bar absolute top-50% left-[5px] h-[28.20px] rounded-[10px] border border-[#4f3c89]"
          />
          <div className="h-[9px] justify-start items-center gap-2.5 inline-flex">
            {level?.levelName && (
              <div className="relative z-2 text-center text-[#9d90cf] text-xs font-medium">
                {
                  GAME_LEVELS[level?.levelName as keyof typeof GAME_LEVELS]
                    ?.name
                }
              </div>
            )}
          </div>
          <div className="absolute right-[-1px]">
            <ProfileBtn />
          </div>
        </div>
      ) : (
        <ProfileBtn />
      )}
    </div>
  )
}

const style = css`
  .level-bar {
    background: radial-gradient(
      21.62% 55.2% at 21.7% 23.89%,
      #654ec8 0%,
      #372864 100%
    );
    box-shadow: -6px -6px 24px rgba(148.04, 94.56, 255, 0.15);
    z-index: 1;
  }
`