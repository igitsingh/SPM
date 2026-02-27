# SPM Backend Architecture Specification

## Recommended Tech Stack

- **Backend framework**: Node.js + NestJS
- **DB**: Postgres (>=13) (relational fits orders/invoices/transactions)
- **ORM**: Prisma
- **Auth**: JWT + refresh tokens + RBAC
- **File storage**: S3-compatible (AWS S3 / MinIO)
- **Background jobs**: BullMQ / Redis
- **Search**: Postgres full-text
- **PDF invoices**: puppeteer 
- **Monitoring**: Prometheus + Grafana, Sentry for errors
- **Container**: Docker + Kubernetes (or Cloud Run)
- **CI**: GitHub Actions

## Top-level folder structure (server repo)

```
spm-backend/
├─ src/
│  ├─ main.ts
│  ├─ app.module.ts
│  ├─ config/
│  │  ├─ index.ts
│  │  └─ env.schema.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ partners/
│  │  ├─ customers/
│  │  ├─ books/
│  │  ├─ orders/
│  │  ├─ invoices/
│  │  ├─ referral/
│  │  ├─ admin/
│  │  ├─ payments/
│  │  ├─ analytics/
│  │  └─ notifications/
│  ├─ lib/  (helpers, middleware, guards)
│  └─ jobs/ (workers)
├─ prisma/ (schema.prisma)
├─ tests/
├─ Dockerfile
├─ docker-compose.yml
├─ README.md
└─ package.json
```

## Core Data Model (Postgres)

### users (admin + partner + customers)
- **id**: uuid PK
- **email**: text (unique)
- **password_hash**: text
- **role**: enum('admin','partner','customer')
- **name**, **phone**, **metadata** (jsonb)
- **is_active**: boolean

### partners (partner-specific)
- **id**: uuid PK (FK to users.id)
- **shop_name**: text
- **gstin**: text
- **category**: varchar (A/B/C)
- **credit_limit**: numeric
- **used_credit**: numeric
- **board_mix**: jsonb

### customers (schools / parents)
- **id**: uuid PK (FK to users.id)
- **school_name**, **school_type**, **address**, **city**, **state**

### books
- **id**: uuid PK
- **code**: text (AL01 etc.)
- **title**: text
- **class**, **board**
- **price_retail**: numeric
- **price_partner**: numeric
- **stock**: int
- **metadata**: jsonb

### orders
- **id**: uuid PK
- **order_number**: text (SPM-YYYY-XXXX)
- **buyer_user_id**: uuid (FK users.id)
- **placed_by_id**: uuid (FK users.id)
- **type**: enum('customer','partner')
- **status**: enum('draft','pending','confirmed','dispatched','delivered','cancelled')
- **subtotal**, **discount_total**, **tax_total**, **total**
- **payment_status**: enum('unpaid','partial','paid','refunded')
- **shipping_address**: jsonb

### order_items
- **id**, **order_id** FK, **book_id** FK
- **qty**, **unit_price**, **line_total**

### invoices
- **id**, **order_id**
- **invoice_number**, **pdf_url**, **amount**
- **issued_at**, **paid_at**

### referrals
- **id**: uuid
- **referrer_partner_id**: uuid
- **referred_email**: text
- **referred_user_id**: uuid (nullable)
- **referral_code**: text
- **status**: enum('sent','registered','qualified','rewarded')
- **qualifying_order_total**: numeric
- **reward_percent**: numeric
- **reward_amount**: numeric

## API Endpoints Overview

### Auth
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/register`

### Orders
- `POST /api/v1/orders` (Create Order with Referral Logic)
- `GET /api/v1/orders/:id`
- `GET /api/v1/orders/:id/invoice`

### Partners & Referrals
- `POST /api/v1/referrals/create`
- `GET /api/v1/referrals/my`
- `POST /api/v1/referrals/validate` (Internal logic for qualifying orders)

## Referral Logic Rules

1. **5% Discount**: If referred user's qualifying order >= ₹5,00,000.
2. **10% Discount**: If referred user's qualifying order >= ₹10,00,000.
3. **Reward**: Applied as credit to referrer's account or voucher.
4. **Idempotency**: Only first qualifying order counts (or within X days).

