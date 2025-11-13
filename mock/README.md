# Wallet Mock Server

Mock server cho các API deposits và kiểm tra trạng thái order sử dụng Fastify và SQLite.

## Cài đặt và chạy

```bash
# Di chuyển vào thư mục mock
cd mock

# Cài đặt dependencies (đã cài đặt rồi)
npm install

# Chạy server
npm start

# Hoặc chạy với auto-reload
npm run dev

# Xóa database (để reset dữ liệu)
npm run cleanup
```

Server sẽ chạy trên `http://localhost:3001`

## API Endpoints

### 1. Tạo Deposit với Card

**POST** `/wallets/deposits/card`

**Request Body:**

```json
{
  "userId": "user123",
  "currency": "EUR",
  "userIp": "8.8.8.8",
  "amount": 100,
  "bank": "Deutsche Bank",
  "extra": {
    "userAgent": "Mozilla/5.0",
    "fingerprint": "1234567890123456",
    "registeredAt": 1744974068621
  }
}
```

**Response:**

```json
{
  "success": true,
  "orderId": "ord_abc123def456",
  "externalId": "78564932156",
  "card": "4532123456789012",
  "bankName": "Deutsche Bank",
  "cardHolderName": "John Doe",
  "countryName": "Germany",
  "amount": 111,
  "fee": 11,
  "status": "Accepted",
  "failCause": null
}
```

### 2. Tạo Deposit với SBP

**POST** `/wallets/deposits/sbp`

**Request Body:**

```json
{
  "userId": "user123",
  "currency": "RUB",
  "userIp": "8.8.8.8",
  "amount": 1000,
  "bank": "sberbank",
  "extra": {
    "userAgent": "Mozilla/5.0",
    "fingerprint": "1234567890123456",
    "registeredAt": 1744974068621
  }
}
```

**Response:**

```json
{
  "success": true,
  "orderId": "ord_abc123def456",
  "externalId": "78564932156",
  "phoneNumber": "+79001234567",
  "bankName": "Сбербанк",
  "amount": 1050,
  "fee": 50,
  "status": "Accepted",
  "failCause": null
}
```

**Supported SBP Banks:**

- `sberbank` - Сбербанк
- `raiffeisenbank` - Райффайзенбанк
- `tinkoff` - Тинькофф
- `alfa` - Альфа-Банк
- `vtb` - ВТБ
- `mkb` - МКБ (Московский Кредитный Банк)
- `sovcombank` - Совкомбанк
- `otkritie` - Открытие
- `rosbank` - Росбанк
- `gazprom` - Газпромбанк

### 3. Kiểm tra trạng thái Order

**GET** `/wallets/users/{userId}/orders/{orderId}/operation-status`

**Response:**

```json
{
  "success": true,
  "orderId": "ord_abc123def456",
  "status": "WAITING_APPROVAL",
  "failCause": null,
  "createdAt": 1744974068621,
  "updatedAt": 1744974068621
}
```

### 4. Health Check

**GET** `/health`

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2025-01-08T10:30:00.000Z"
}
```

## Trạng thái Orders

Server tự động mô phỏng thay đổi trạng thái theo thời gian:

1. **WAITING_APPROVAL** → **ACTIVE** → **COMPLETED_WITH_SUCCESS** (thành công - 80%)
2. **WAITING_APPROVAL** → **DENIED** (từ chối - 10%)
3. **WAITING_APPROVAL** → **COMPLETED_WITH_FAILURE** (thất bại - 10%)
4. **WAITING_APPROVAL** → **ACTIVE** → **CANCELED_ON_TIMEOUT** (timeout callback - 65 phút)
5. **WAITING_APPROVAL** → **CANCELED_ON_TIMEOUT** (timeout approval - 48 giờ)

### Thời gian mô phỏng:

- Sau 5 giây: WAITING_APPROVAL chuyển sang trạng thái khác
- Sau 10 giây: ACTIVE chuyển sang COMPLETED_WITH_SUCCESS
- Sau 65 phút: ACTIVE chuyển sang CANCELED_ON_TIMEOUT
- Sau 48 giờ: WAITING_APPROVAL chuyển sang CANCELED_ON_TIMEOUT

## Ví dụ sử dụng

### Tạo deposit với Card:

```bash
curl -X POST http://localhost:3001/wallets/deposits/card \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "currency": "EUR",
    "userIp": "8.8.8.8",
    "amount": 100,
    "bank": "Deutsche Bank",
    "extra": {
      "userAgent": "Mozilla/5.0",
      "fingerprint": "1234567890123456",
      "registeredAt": 1744974068621
    }
  }'
```

### Tạo deposit với SBP:

```bash
curl -X POST http://localhost:3001/wallets/deposits/sbp \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "currency": "RUB",
    "userIp": "8.8.8.8",
    "amount": 1000,
    "bank": "sberbank",
    "extra": {
      "userAgent": "Mozilla/5.0",
      "fingerprint": "1234567890123456",
      "registeredAt": 1744974068621
    }
  }'
```

### Kiểm tra trạng thái:

```bash
curl http://localhost:3001/wallets/users/user123/orders/ord_abc123def456/operation-status
```

## Database

Server sử dụng SQLite database (`wallet.db`) để lưu trữ thông tin orders. Database sẽ được tạo tự động khi server khởi chạy lần đầu.

## Logs

Server sẽ log tất cả requests và responses để dễ dàng debug và theo dõi.
