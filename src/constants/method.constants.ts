import { keyBy } from 'lodash-es'

export const UZS_BANK_METHOD = [
  {
    label: 'Uzcard',
    value: 'uzcard',
    isShow: true
  },
  {
    label: 'Humo',
    value: 'humo',
    isShow: true
  }
]

export const BANK_METHOD = [
  {
    label: '1 Click Pay',
    value: '1-click-pay',
    isShow: true
  },
  {
    label: 'Mobile',
    value: 'mobile',
    isShow: false
  },
  {
    label: 'SberPay',
    value: 'sber-pay',
    isShow: false
  },
  {
    label: 'Alfa',
    value: 'fps-alfa',
    isShow: true
  },
  {
    label: 'Ozon',
    value: 'ozon',
    isShow: false
  },
  {
    label: 'Sber',
    value: 'sber',
    isShow: false
  },
  {
    label: 'FPS CIS',
    value: 'fps-cis',
    isShow: false
  },
  {
    label: 'T-Pay',
    value: 't-pay',
    isShow: true
  },
  {
    label: 'FPS',
    value: 'fps',
    isShow: true
  },
  {
    label: 'FPS to Abkhazia',
    value: 'fps-abkhazia',
    isShow: false
  },
  {
    label: 'PSB',
    value: 'psb',
    isShow: false
  },
  {
    label: 'WB',
    value: 'wb',
    isShow: false
  },
  {
    label: 'Yandex',
    value: 'yandex',
    isShow: false
  },
  {
    label: 'Yukassa',
    value: 'yukassa',
    isShow: false
  },
  {
    label: 'Bank Card',
    value: 'bank-card',
    isShow: false
  },
  {
    label: 'VTB',
    value: 'vtb',
    isShow: false
  }
]

export const BANK_METHOD_MAP = keyBy(
  [...UZS_BANK_METHOD, ...BANK_METHOD],
  'value'
)
export const UZS_BANK_METHOD_MAP = keyBy(UZS_BANK_METHOD, 'value')
