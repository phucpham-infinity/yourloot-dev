import i18n from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationAZ from '../locales/az/translation.json'
import translationEN from '../locales/en/translation.json'
import translationES from '../locales/es/translation.json'
import translationKZ from '../locales/kz/translation.json'
import translationRU from '../locales/ru/translation.json'
import translationYZ from '../locales/yz/translation.json'

// Resources object with imported translations
const resources = {
  en: {
    translation: translationEN
  },
  az: {
    translation: translationAZ
  },
  ru: {
    translation: translationRU
  },
  kz: {
    translation: translationKZ
  },
  yz: {
    translation: translationYZ
  },
  es: {
    translation: translationES
  }
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
