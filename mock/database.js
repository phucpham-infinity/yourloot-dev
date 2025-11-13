import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Tạo kết nối database
const db = new sqlite3.Database(join(__dirname, 'wallet.db'))

// Khởi tạo schema
export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tạo bảng orders để lưu trữ thông tin deposits và trạng thái
      db.run(
        `
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId TEXT UNIQUE NOT NULL,
          userId TEXT NOT NULL,
          externalId TEXT NOT NULL,
          currency TEXT NOT NULL,
          userIp TEXT NOT NULL,
          amount REAL NOT NULL,
          bank TEXT NOT NULL,
          card TEXT NOT NULL,
          bankName TEXT NOT NULL,
          cardHolderName TEXT NOT NULL,
          countryName TEXT NOT NULL,
          fee REAL NOT NULL,
          status TEXT NOT NULL DEFAULT 'WAITING_APPROVAL',
          failCause TEXT,
          extra TEXT,
          createdAt INTEGER NOT NULL,
          updatedAt INTEGER NOT NULL
        )
      `,
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log('Database initialized successfully')
            resolve()
          }
        }
      )
    })
  })
}

// Các trạng thái có thể có
export const ORDER_STATUS = {
  WAITING_APPROVAL: 'WAITING_APPROVAL',
  ACTIVE: 'ACTIVE',
  COMPLETED_WITH_SUCCESS: 'COMPLETED_WITH_SUCCESS',
  DENIED: 'DENIED',
  COMPLETED_WITH_FAILURE: 'COMPLETED_WITH_FAILURE',
  CANCELED_ON_TIMEOUT: 'CANCELED_ON_TIMEOUT'
}

// Tạo order mới
export function createOrder(orderData) {
  return new Promise((resolve, reject) => {
    const {
      orderId,
      userId,
      externalId,
      currency,
      userIp,
      amount,
      bank,
      card,
      bankName,
      cardHolderName,
      countryName,
      fee,
      extra
    } = orderData

    const now = Date.now()

    db.run(
      `
      INSERT INTO orders (
        orderId, userId, externalId, currency, userIp, amount, bank,
        card, bankName, cardHolderName, countryName, fee, extra,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        orderId,
        userId,
        externalId,
        currency,
        userIp,
        amount,
        bank,
        card,
        bankName,
        cardHolderName,
        countryName,
        fee,
        JSON.stringify(extra),
        now,
        now
      ],
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ orderId, id: this.lastID })
        }
      }
    )
  })
}

// Lấy thông tin order
export function getOrder(userId, orderId) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT * FROM orders 
      WHERE userId = ? AND orderId = ?
    `,
      [userId, orderId],
      (err, row) => {
        if (err) {
          reject(err)
        } else {
          if (row && row.extra) {
            row.extra = JSON.parse(row.extra)
          }
          resolve(row)
        }
      }
    )
  })
}

// Cập nhật trạng thái order
export function updateOrderStatus(userId, orderId, status, failCause = null) {
  return new Promise((resolve, reject) => {
    const now = Date.now()

    db.run(
      `
      UPDATE orders 
      SET status = ?, failCause = ?, updatedAt = ?
      WHERE userId = ? AND orderId = ?
    `,
      [status, failCause, now, userId, orderId],
      function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ changes: this.changes })
        }
      }
    )
  })
}

// Lấy tất cả orders cần cập nhật trạng thái
export function getOrdersForStatusUpdate() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT * FROM orders 
      WHERE status IN ('WAITING_APPROVAL', 'ACTIVE')
      ORDER BY createdAt ASC
    `,
      (err, rows) => {
        if (err) {
          reject(err)
        } else {
          const orders = rows.map((row) => {
            if (row.extra) {
              row.extra = JSON.parse(row.extra)
            }
            return row
          })
          resolve(orders)
        }
      }
    )
  })
}

export default db
