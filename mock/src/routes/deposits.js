import { v4 as uuidv4 } from 'uuid'
import { createOrder } from '../database.js'

// Helper function để generate mock card number
function generateMockCard() {
  const prefix = '4532' // Visa prefix
  let cardNumber = prefix

  // Generate 12 more digits
  for (let i = 0; i < 12; i++) {
    cardNumber += Math.floor(Math.random() * 10)
  }

  return cardNumber
}

// Helper function để generate mock phone number
function generateMockPhoneNumber() {
  const prefixes = [
    '+7900',
    '+7901',
    '+7902',
    '+7903',
    '+7904',
    '+7905',
    '+7906',
    '+7908',
    '+7909',
    '+7910',
    '+7911',
    '+7912',
    '+7913',
    '+7914',
    '+7915',
    '+7916',
    '+7917',
    '+7918',
    '+7919',
    '+7920',
    '+7921',
    '+7922',
    '+7924',
    '+7925',
    '+7926',
    '+7927',
    '+7928',
    '+7929',
    '+7930',
    '+7931',
    '+7932',
    '+7933',
    '+7934',
    '+7936',
    '+7937',
    '+7938',
    '+7939',
    '+7950',
    '+7951',
    '+7952',
    '+7953',
    '+7954',
    '+7955',
    '+7956',
    '+7958',
    '+7960',
    '+7961',
    '+7962',
    '+7963',
    '+7964',
    '+7965',
    '+7966',
    '+7967',
    '+7968',
    '+7969',
    '+7970',
    '+7971',
    '+7972',
    '+7973',
    '+7974',
    '+7975',
    '+7976',
    '+7977',
    '+7978',
    '+7980',
    '+7981',
    '+7982',
    '+7983',
    '+7984',
    '+7985',
    '+7986',
    '+7987',
    '+7988',
    '+7989',
    '+7991',
    '+7992',
    '+7993',
    '+7994',
    '+7995',
    '+7996',
    '+7997',
    '+7999'
  ]
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]

  // Generate 7 more digits
  let phoneNumber = prefix
  for (let i = 0; i < 7; i++) {
    phoneNumber += Math.floor(Math.random() * 10)
  }

  return phoneNumber
}

// SBP Banks list
const sbpBanks = [
  { value: 'sberbank', label: 'Сбербанк' },
  { value: 'raiffeisenbank', label: 'Райффайзенбанк' },
  { value: 'tinkoff', label: 'Тинькофф' },
  { value: 'alfa', label: 'Альфа-Банк' },
  { value: 'vtb', label: 'ВТБ' },
  { value: 'mkb', label: 'МКБ (Московский Кредитный Банк)' },
  { value: 'sovcombank', label: 'Совкомбанк' },
  { value: 'otkritie', label: 'Открытие' },
  { value: 'rosbank', label: 'Росбанк' },
  { value: 'gazprom', label: 'Газпромбанк' }
]

// Russian QR Pay providers
const russianQRProviders = [
  { value: 'sbp_qr', label: 'СБП QR' },
  { value: 'sberbank_qr', label: 'Сбербанк QR' },
  { value: 'tinkoff_qr', label: 'Тинькофф QR' },
  { value: 'alfa_qr', label: 'Альфа-Банк QR' },
  { value: 'vtb_qr', label: 'ВТБ QR' },
  { value: 'yandex_pay', label: 'Яндекс.Пэй' },
  { value: 'mir_pay', label: 'Мир Pay' },
  { value: 'qiwi_qr', label: 'QIWI QR' }
]

export async function depositsRoutes(fastify, options) {
  fastify.post('/wallets/deposits/sbp/confirmation', async (request, reply) => {
    try {
      const { orderId, userId } = request.body
      reply.send({ content: { orderId, userId, success: true } })
    } catch (error) {
      console.error('Error confirming SBP deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/deposits/card', async (request, reply) => {
    try {
      const {
        userId,
        currency,
        userIp,
        amount,
        bank = 'sberbank',
        extra
      } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const card = generateMockCard()
      const fee = Math.round(amount * 0.1) // 10% fee
      const totalAmount = amount + fee

      // Mock card holder names
      const cardHolderNames = [
        'John Doe',
        'Jane Smith',
        'Michael Johnson',
        'Sarah Wilson',
        'David Brown'
      ]
      const cardHolderName =
        cardHolderNames[Math.floor(Math.random() * cardHolderNames.length)]

      // Mock country names based on bank
      const countryMap = {
        'Deutsche Bank': 'Germany',
        'BNP Paribas': 'France',
        Santander: 'Spain',
        ING: 'Netherlands',
        default: 'Germany'
      }
      const countryName = countryMap[bank] || countryMap.default

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank,
        card,
        bankName: 'Sberbank',
        cardHolderName,
        countryName,
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu
      const response = {
        success: true,
        orderId,
        externalId,
        card,
        bankName: 'Sberbank',
        cardHolderName,
        countryName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  // API: Tạo deposit với SBP
  fastify.post('/wallets/deposits/sbp', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body
      throw new Error("You've reached your limit of 3 deposit attempts within the past 30 minutes.")

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const phoneNumber = generateMockPhoneNumber()
      const fee = Math.round(amount * 0.05) // 5% fee for SBP (lower than card)
      const totalAmount = amount + fee

      // Get bank name from SBP banks list
      const selectedBank =
        sbpBanks.find((b) => b.value === 'sbp') || sbpBanks[0]
      const bankName = selectedBank.label || 'SBP'

      // Mock Russian names for SBP
      const russianNames = [
        'Иван Иванов',
        'Петр Петров',
        'Анна Смирнова',
        'Мария Козлова',
        'Александр Соколов',
        'Елена Морозова',
        'Дмитрий Волков',
        'Ольга Новикова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: selectedBank?.value || 'sbp',
        card: phoneNumber, // Store phone number in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho SBP
      const response = {
        success: true,
        orderId,
        externalId,
        phoneNumber,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        information: bankName
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating SBP deposit:', error)
      reply.status(500).send({
        success: false,
        error: error.message || 'Internal server error',
        content: {
          message: error.message
        }
      })
    }
  })


  fastify.post('/wallets/deposits/b2b', async (request, reply) => {
    try {
      throw new Error("You've reached your limit of 3 deposit attempts within the past 30 minutes.")
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const phoneNumber = generateMockPhoneNumber()
      const fee = Math.round(amount * 0.05) // 5% fee for SBP (lower than card)
      const totalAmount = amount + fee

      // Get bank name from SBP banks list
      const selectedBank =
        sbpBanks.find((b) => b.value === 'sbp') || sbpBanks[0]
      const bankName = selectedBank.label || 'SBP'

      // Mock Russian names for SBP
      const russianNames = [
        'Иван Иванов',
        'Петр Петров',
        'Анна Смирнова',
        'Мария Козлова',
        'Александр Соколов',
        'Елена Морозова',
        'Дмитрий Волков',
        'Ольга Новикова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: selectedBank?.value || 'sbp',
        card: phoneNumber, // Store phone number in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho SBP
      const response = {
        success: true,
        orderId,
        externalId,
        phoneNumber,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        information: bankName
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating SBP deposit:', error)
      reply.status(500).send({
        success: false,
        error: error.message || 'Internal server error',
        content: {
          message: error.message
        }
      })
    }
  })

  fastify.post('/wallets/deposits/fps-alfa', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const phoneNumber = generateMockPhoneNumber()
      const fee = Math.round(amount * 0.05) // 5% fee for SBP (lower than card)
      const totalAmount = amount + fee

      // Get bank name from SBP banks list
      const selectedBank =
        sbpBanks.find((b) => b.value === 'sbp') || sbpBanks[0]
      const bankName = selectedBank.label || 'SBP'

      // Mock Russian names for SBP
      const russianNames = [
        'Иван Иванов',
        'Петр Петров',
        'Анна Смирнова',
        'Мария Козлова',
        'Александр Соколов',
        'Елена Морозова',
        'Дмитрий Волков',
        'Ольга Новикова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: selectedBank?.value || 'sbp',
        card: phoneNumber, // Store phone number in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho SBP
      const response = {
        success: true,
        orderId,
        externalId,
        phoneNumber,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        information: bankName
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating SBP deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  // API: Tạo deposit với QR Pay cho thị trường Nga
  fastify.post('/wallets/deposits/redirect-pay', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const qrCode = `RU_QR${Math.random().toString().substring(2, 15)}`
      const fee = Math.round(amount * 0.025) // 2.5% fee for Russian QR Pay (competitive rate)
      const totalAmount = amount + fee

      // Generate mock success URL for Russian market
      const successUrl = `https://payment.ru/success?orderId=${orderId}&status=completed&timestamp=${Date.now()}&market=ru`

      // Select random Russian QR provider
      const selectedProvider =
        russianQRProviders[
        Math.floor(Math.random() * russianQRProviders.length)
        ]
      const bankName = selectedProvider.label

      // Mock Russian names for QR Pay
      const russianNames = [
        'Александр Петров',
        'Екатерина Иванова',
        'Михаил Сидоров',
        'Анастасия Козлова',
        'Дмитрий Смирнов',
        'Ольга Васильева',
        'Сергей Федоров',
        'Татьяна Морозова',
        'Андрей Волков',
        'Мария Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: selectedProvider.value,
        card: qrCode, // Store QR code in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Russian QR Pay
      const response = {
        success: true,
        orderId,
        externalId,
        qrCode,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        successUrl,
        information: `${bankName} - Отсканируйте QR-код для завершения платежа`,
        market: 'russia'
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating Russian QR Pay deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/deposits/t-pay', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const qrCode = `RU_QR${Math.random().toString().substring(2, 15)}`
      const fee = Math.round(amount * 0.025) // 2.5% fee for Russian QR Pay (competitive rate)
      const totalAmount = amount + fee

      // Generate mock success URL for Russian market
      const successUrl = `https://payment.ru/success?orderId=${orderId}&status=completed&timestamp=${Date.now()}&market=ru`

      // Select random Russian QR provider
      const selectedProvider =
        russianQRProviders[
        Math.floor(Math.random() * russianQRProviders.length)
        ]
      const bankName = selectedProvider.label

      // Mock Russian names for QR Pay
      const russianNames = [
        'Александр Петров',
        'Екатерина Иванова',
        'Михаил Сидоров',
        'Анастасия Козлова',
        'Дмитрий Смирнов',
        'Ольга Васильева',
        'Сергей Федоров',
        'Татьяна Морозова',
        'Андрей Волков',
        'Мария Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: 't-pay',
        card: qrCode, // Store QR code in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Russian QR Pay
      const response = {
        success: true,
        orderId,
        externalId,
        qrCode,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        successUrl,
        information: `${bankName} - Отсканируйте QR-код для завершения платежа`,
        market: 'russia'
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating Russian QR Pay deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/deposits/sber-pay', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const qrCode = `RU_QR${Math.random().toString().substring(2, 15)}`
      const fee = Math.round(amount * 0.025) // 2.5% fee for Russian QR Pay (competitive rate)
      const totalAmount = amount + fee

      // Generate mock success URL for Russian market
      const successUrl = `https://payment.ru/success?orderId=${orderId}&status=completed&timestamp=${Date.now()}&market=ru`

      // Select random Russian QR provider
      const selectedProvider =
        russianQRProviders[
        Math.floor(Math.random() * russianQRProviders.length)
        ]
      const bankName = selectedProvider.label

      // Mock Russian names for QR Pay
      const russianNames = [
        'Александр Петров',
        'Екатерина Иванова',
        'Михаил Сидоров',
        'Анастасия Козлова',
        'Дмитрий Смирнов',
        'Ольга Васильева',
        'Сергей Федоров',
        'Татьяна Морозова',
        'Андрей Волков',
        'Мария Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: 'sber-pay',
        card: qrCode, // Store QR code in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Russian QR Pay
      const response = {
        success: true,
        orderId,
        externalId,
        qrCode,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        successUrl,
        information: `${bankName} - Отсканируйте QR-код для завершения платежа`,
        market: 'russia'
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating Russian QR Pay deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/deposits/nspk', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const qrCode = `RU_QR${Math.random().toString().substring(2, 15)}`
      const fee = Math.round(amount * 0.025) // 2.5% fee for Russian QR Pay (competitive rate)
      const totalAmount = amount

      // Generate mock success URL for Russian market
      const successUrl = `https://payment.ru/success?orderId=${orderId}&status=completed&timestamp=${Date.now()}&market=ru`

      // Select random Russian QR provider
      const selectedProvider =
        russianQRProviders[
        Math.floor(Math.random() * russianQRProviders.length)
        ]
      const bankName = selectedProvider.label

      // Mock Russian names for QR Pay
      const russianNames = [
        'Александр Петров',
        'Екатерина Иванова',
        'Михаил Сидоров',
        'Анастасия Козлова',
        'Дмитрий Смирнов',
        'Ольга Васильева',
        'Сергей Федоров',
        'Татьяна Морозова',
        'Андрей Волков',
        'Мария Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: 'kasssa',
        card: qrCode, // Store QR code in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Russian QR Pay
      const response = {
        success: true,
        orderId,
        externalId,
        qrCode,
        bankName,
        amount: totalAmount,
        fee,
        status: 'Accepted',
        failCause: null,
        successUrl,
        information: `${bankName} - Отсканируйте QR-код для завершения платежа`,
        market: 'russia'
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating Russian QR Pay deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  // API: Tạo deposit với FPS-Sber (Fast Payment System - Sberbank)
  fastify.post('/wallets/deposits/fps-sber', async (request, reply) => {
    try {
      const { userId, currency, userIp, amount, extra } = request.body

      // Validate required fields
      if (!userId || !currency || !userIp || !amount) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const phoneNumber = generateMockPhoneNumber()
      const fee = Math.round(amount * 0.03) // 3% fee for FPS-Sber
      const totalAmount = amount + fee

      // FPS-Sber specific bank name
      const bankName = 'Сбербанк FPS'

      // Mock Russian names for FPS-Sber
      const russianNames = [
        'Алексей Иванов',
        'Мария Петрова',
        'Владимир Сидоров',
        'Елена Козлова',
        'Николай Смирнов',
        'Анна Васильева',
        'Игорь Федоров',
        'Светлана Морозова',
        'Павел Волков',
        'Наталья Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount: totalAmount,
        bank: 'fps-sber',
        card: phoneNumber, // Store phone number in card field for compatibility
        bankName,
        cardHolderName,
        countryName: 'Russia',
        fee,
        extra: extra || {},
        statusCheckCount: 0
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho FPS-Sber
      const response = {
        success: true,
        orderId,
        externalId,
        amount: totalAmount,
        bankName,
        phoneNumber,
        cardHolderName,
        fee,
        status: 'Accepted',
        failCause: null,
        information: `${bankName} - Система быстрых платежей`
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating FPS-Sber deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/deposits/crypto', async (request, reply) => {
    try {
      const { userId, network, currency } = request.body

      // Validate required fields
      if (!userId || !network || !currency) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }
      const orderId = `ord_${uuidv4().replace(/-/g, '').substring(0, 12)}`

      const orderData = {
        orderId,
        userId,
        externalId: '1234567890',
        currency: currency,
        userIp: '127.0.0.1',
        amount: 3000,
        bank: network,
        card: network,
        bankName: network,
        cardHolderName: 'John Doe',
        countryName: 'Russia',
        fee: 1,
        extra: {},
        statusCheckCount: 0,
        address: '0x93948bc05175b93b0696c5d2bf09262bad4380b5'
      }

      // Lưu vào database
      await createOrder(orderData)

      const response = {
        success: true,
        orderId,
        externalId: '1234567890',
        amount: 100,
        bankName: network,
        card: network,
        cardHolderName: 'John Doe',
        fee: 1,
        status: 'Accepted',
        failCause: null,
        address: '0x93948bc05175b93b0696c5d2bf09262bad4380b5',
        memo: network
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating FPS-Sber deposit:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/withdrawals/bank-card', async (request, reply) => {
    try {
      const { userId, walletId, amount, bankCode, cardNumber, userIp, extra } =
        request.body

      // Validate required fields
      if (
        !userId ||
        !walletId ||
        !amount ||
        !bankCode ||
        !cardNumber ||
        !userIp
      ) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields'
        })
      }

      // Generate mock data
      const orderId = `wth_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const fee = Math.round(amount * 0.025) // 2.5% fee for bank card withdrawal
      const totalAmount = amount // For withdrawal, fee is deducted from amount

      // Mock Russian names for card holder
      const russianNames = [
        'Алексей Иванов',
        'Мария Петрова',
        'Владимир Сидоров',
        'Елена Козлова',
        'Николай Смирнов',
        'Анна Васильева',
        'Игорь Федоров',
        'Светлана Морозова',
        'Павел Волков',
        'Наталья Соколова',
        'Андрей Кузнецов',
        'Татьяна Попова',
        'Сергей Лебедев',
        'Ирина Новикова',
        'Максим Орлов',
        'Екатерина Смирнова',
        'Дмитрий Козлов',
        'Ольга Васильева',
        'Михаил Петров',
        'Юлия Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      // Mask card number for display (show only last 4 digits)
      const maskedCardNumber = `****-****-****-${cardNumber.slice(-4)}`

      const orderData = {
        orderId,
        userId,
        externalId,
        currency: 'RUB',
        userIp,
        amount: totalAmount,
        originalAmount: amount,
        bank: 'bank-card',
        card: cardNumber,
        bankName: 'bank-card',
        cardHolderName,
        countryName: 'Russia',
        fee,
        type: 'withdrawal',
        method: 'bank-card',
        cardNumber: maskedCardNumber,
        walletId,
        extra: extra || {},
        statusCheckCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Processing'
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Bank Card withdrawal
      const response = {
        success: true,
        orderId,
        externalId,
        amount: totalAmount,
        originalAmount: amount,
        fee,
        cardNumber: maskedCardNumber,
        bankName: 'bank-card',
        cardHolderName,
        currency: 'RUB',
        walletId,
        status: 'Processing',
        type: 'withdrawal',
        method: 'bank-card',
        failCause: null,
        estimatedTime: '15-30 минут',
        information: `Перевод на банковскую карту ${maskedCardNumber}`,
        processedAt: new Date().toISOString()
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating bank card withdrawal:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/withdrawals/sbp', async (request, reply) => {
    try {
      const { userId, walletId, amount, phoneNumber, userIp, extra } =
        request.body

      // Generate mock data
      const orderId = `wth_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const fee = Math.round(amount * 0.025) // 2.5% fee for bank card withdrawal
      const totalAmount = amount // For withdrawal, fee is deducted from amount

      // Mock Russian names for card holder
      const russianNames = [
        'Алексей Иванов',
        'Мария Петрова',
        'Владимир Сидоров',
        'Елена Козлова',
        'Николай Смирнов',
        'Анна Васильева',
        'Игорь Федоров',
        'Светлана Морозова',
        'Павел Волков',
        'Наталья Соколова',
        'Андрей Кузнецов',
        'Татьяна Попова',
        'Сергей Лебедев',
        'Ирина Новикова',
        'Максим Орлов',
        'Екатерина Смирнова',
        'Дмитрий Козлов',
        'Ольга Васильева',
        'Михаил Петров',
        'Юлия Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      // Mask card number for display (show only last 4 digits)
      const maskedCardNumber = `****-****-****-${phoneNumber.slice(-4)}`

      const orderData = {
        orderId,
        userId,
        externalId,
        currency: 'RUB',
        userIp,
        amount: totalAmount,
        originalAmount: amount,
        bank: 'bank-card',
        card: phoneNumber,
        bankName: 'bank-card',
        cardHolderName,
        countryName: 'Russia',
        fee,
        type: 'withdrawal',
        method: 'bank-card',
        cardNumber: maskedCardNumber,
        walletId,
        extra: extra || {},
        statusCheckCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Processing'
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Bank Card withdrawal
      const response = {
        success: true,
        orderId,
        externalId,
        amount: totalAmount,
        originalAmount: amount,
        fee,
        cardNumber: phoneNumber,
        bankName: 'bank-card',
        cardHolderName,
        currency: 'RUB',
        walletId,
        status: 'Processing',
        type: 'withdrawal',
        method: 'bank-card',
        failCause: null,
        estimatedTime: '15-30 минут',
        information: `Перевод на банковскую карту ${maskedCardNumber}`,
        processedAt: new Date().toISOString()
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating bank card withdrawal:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.post('/wallets/withdrawals/crypto', async (request, reply) => {
    try {
      const { userId, walletId, amount, phoneNumber, userIp, extra } =
        request.body

      // Generate mock data
      const orderId = `wth_${uuidv4().replace(/-/g, '').substring(0, 12)}`
      const externalId = Math.random().toString().substring(2, 17)
      const fee = Math.round(amount * 0.025) // 2.5% fee for bank card withdrawal
      const totalAmount = amount // For withdrawal, fee is deducted from amount

      // Mock Russian names for card holder
      const russianNames = [
        'Алексей Иванов',
        'Мария Петрова',
        'Владимир Сидоров',
        'Елена Козлова',
        'Николай Смирнов',
        'Анна Васильева',
        'Игорь Федоров',
        'Светлана Морозова',
        'Павел Волков',
        'Наталья Соколова',
        'Андрей Кузнецов',
        'Татьяна Попова',
        'Сергей Лебедев',
        'Ирина Новикова',
        'Максим Орлов',
        'Екатерина Смирнова',
        'Дмитрий Козлов',
        'Ольга Васильева',
        'Михаил Петров',
        'Юлия Соколова'
      ]
      const cardHolderName =
        russianNames[Math.floor(Math.random() * russianNames.length)]

      const orderData = {
        orderId,
        userId,
        externalId,
        currency: 'RUB',
        userIp: '127.0.0.1',
        amount: totalAmount,
        originalAmount: amount,
        bank: 'crypto',
        card: '0x93948bc05175b93b0696c5d2bf09262bad4380b5',
        bankName: 'crypto',
        cardHolderName,
        countryName: 'Russia',
        fee,
        type: 'withdrawal',
        method: 'bank-card',
        cardNumber: '0x93948bc05175b93b0696c5d2bf09262bad4380b5',
        walletId,
        extra: extra || {},
        statusCheckCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Processing'
      }

      // Lưu vào database
      await createOrder(orderData)

      // Response theo format yêu cầu cho Bank Card withdrawal
      const response = {
        success: true,
        orderId,
        externalId,
        amount: totalAmount,
        originalAmount: amount,
        fee,
        cardNumber: phoneNumber,
        bankName: 'bank-card',
        cardHolderName,
        currency: 'RUB',
        walletId,
        status: 'Processing',
        type: 'withdrawal',
        method: 'bank-card',
        failCause: null,
        estimatedTime: '15-30 минут',
        information: `Перевод на криптовалюту `,
        processedAt: new Date().toISOString()
      }

      reply.send({ content: response })
    } catch (error) {
      console.error('Error creating bank card withdrawal:', error)
      reply.status(500).send({
        success: false,
        error: 'Internal server error'
      })
    }
  })

  fastify.get(
    '/wallets/:walletId/users/:userId/wagers',
    async (request, reply) => {
      reply.send({
        content: {
          amountToMainWager: 0,
          isWageringRequirementsMet: true,
          walletId: request.params.walletId
        }
      })
    }
  )
}
