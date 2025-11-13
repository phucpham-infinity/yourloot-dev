import { useTranslation } from 'react-i18next'

export const CreateWallet = () => {
  const { t } = useTranslation()
  return <div>{t('wallet.createWallet.title')}</div>
}
export default CreateWallet
