import LogoFullIcon from '@/assets/icons/logoFull'
import TelegramIcon from '@/assets/icons/social/telegram'
import CustomButton from '@/components/common/custom-button'
import { FormBuilder } from '@/components/common/form-builder'
import IconBtn from '@/components/common/icon-button'
import { YourLootSupportBotLink } from '@/constants'
import { useDialogStore } from '@/store'
import { ArrowLeftIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function ContacPtage() {
  const [showFeedback, setShowFeedback] = useState(false)
  const formRef = useRef<any>(null)
  const navigate = useNavigate()
  const dialog = useDialogStore()
  const { t } = useTranslation()
  const handleClick = () => {
    window.open(YourLootSupportBotLink, '_blank')
  }

  const handleSubmitLogin = () => {
    dialog.openBasicDialog({
      type: 'successful',
      meta: {
        title: t('contact.form.success'),
        description: (
          <>
            <span>{t('contact.form.thanks')}</span>
          </>
        ),
        button: (
          <div className="w-full">
            <CustomButton
              variant={'default'}
              className="w-full text-center"
              label={t('contact.form.great')}
              onClick={() => {
                dialog.closeBasicDialog()
              }}
            />
          </div>
        )
      }
    })
  }
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-full  basis-0 flex-col gap justify-start items-start">
        <div className="flex items-center pb-5 justify-between w-full">
          <div className="text-white text-2xl gap-6 font-black">
            {t('contact.title')}
          </div>
          <CustomButton
            height="40px"
            variant="muted"
            prefixIcon={<ArrowLeftIcon />}
            label={t('contact.back')}
            className="w-fit flex text-[#9d90cf] gap-3 hover:bg-[#15121D] transition-all duration-300"
            onClick={() => navigate('/')}
          />
        </div>
        <div className={`flex flex-col md:flex-row gap-6  w-full h-full`}>
          <div
            className={`self-stretch rounded-[20px] p-10 h-auto lg:h-full  border border-[#413c4a] justify-start items-start overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent  
             scrollbar-thumb-[#322849] ${showFeedback ? 'w-full' : 'lg:w-full w-full'}`}
          >
            {/* <div className="  h-150 ml-100 -mt-145 bg-[#6330aa] rounded-full blur-[400px]"></div> */}
            <div className="self-stretch h-full flex flex-col gap-5 ">
              <LogoFullIcon />
              <div className="flex-col justify-start items-start gap-5 inline-flex">
                <div className="text-white text-2xl font-black font-['Satoshi']">
                  {t('contact.title')}
                </div>
                <div>
                  <span className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                    {t('contact.description')}
                  </span>
                  <span className="text-white text-xs font-medium font-['Satoshi'] underline">
                    info@yourloot.xyz
                  </span>
                </div>
                <div className="text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                  {t('contact.form.message')}
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    onClick={() => setShowFeedback(true)}
                    label={t('contact.sendFeedback')}
                    className="w-fit flex gap-3 bg[#0F0D13]"
                  />
                  <CustomButton
                    label={t('contact.contactSupport')}
                    className="w-fit flex gap-3 bg[#0F0D13]"
                    onClick={() => handleClick()}
                  />
                </div>
              </div>

              <div className="flex flex-col  justify-start items-start gap-5">
                <div className="text-white text-2xl font-black font-['Satoshi']">
                  {t('about.ourLinks')}
                </div>
                <div className="self-stretch text-[#c5c0d8] text-xs font-medium font-['Satoshi']">
                  {t('contact.socialMedia.description')}
                </div>

                <div className="flex gap-2 pt-5 w-full">
                  <IconBtn
                    icon={<TelegramIcon />}
                    className="border-0"
                    onClick={handleClick}
                  />
                  {/* <IconBtn icon={<TwitterIcon />} className="border-0" />
                  <IconBtn icon={<InstagramIcon />} className="border-0" />
                  <IconBtn icon={<FaceBookIcon />} className="border-0" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback form */}
          <div
            className={` border border-[#413c4a]  rounded-[20px] ${showFeedback ? 'opacity-100 w-full lg:w-1/3' : 'opacity-0 md:hidden'}`}
          >
            <div className="bg-[#1A1526] rounded-2xl p-10">
              <h2 className="text-xl font-bold text-white mb-4">
                {t('contact.form.feedback.title')}
              </h2>
              <p className="text-[#9d90cf] text-sm mb-6">
                {t('contact.form.feedback.description')}
              </p>

              <div className="w-full">
                <FormBuilder
                  gap={40}
                  ref={formRef}
                  fields={[
                    {
                      name: 'name',
                      type: 'text',
                      label: t('contact.form.feedback.yourName'),
                      placeholder: t('contact.form.feedback.yourName'),
                      colSpan: 12
                    },
                    {
                      name: 'email',
                      type: 'text',
                      label: t('contact.form.feedback.yourEmail'),
                      placeholder: 'example@example.com',
                      colSpan: 12
                    },
                    {
                      name: 'question',
                      type: 'text',
                      label: t('contact.form.feedback.yourQuestion'),
                      placeholder: t('contact.form.feedback.yourQuestion'),
                      colSpan: 12
                    }
                  ]}
                  onSubmit={() => {
                    handleSubmitLogin()
                  }}
                  defaultValues={{
                    email: '',
                    name: '',
                    question: ''
                  }}
                />
                <div className="flex justify-between gap-2 pt-5 w-full">
                  <CustomButton
                    onClick={() => {}}
                    variant="muted"
                    label={t('contact.form.feedback.cancel')}
                    className="w-fit flex gap-3 bg[#0F0D13]"
                  />
                  <CustomButton
                    onClick={() => {
                      formRef.current?.submit()
                    }}
                    label={t('contact.form.feedback.sendMessage')}
                    className="w-[200px] flex gap-3 bg[#0F0D13]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
