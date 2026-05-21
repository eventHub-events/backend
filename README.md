# 🚀 EventHub Backend – Event Booking Platform

<div align="center">
  <img src="https://img.shields.io/badge/node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/stripe-%23635BFF.svg?style=for-the-badge&logo=stripe&logoColor=white" />
</div>

---

## 📖 Table of Contents
- [📌 Overview](#-overview)
- [🚀 Core Features](#-core-features)
- [🏗️ Architecture](#-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [▶️ Running the Backend](#️-running-the-backend)
- [📡 API Overview](#-api-overview)
- [🧩 Role-Based Workflows](#-role-based-workflows)
- [🐳 Docker Support](#-docker-support)
- [👨‍💻 Author](#-author)

---

## 📌 Overview
The EventHub backend is a scalable, production-ready API built using **Node.js** and **Express** with **TypeScript**.  
It powers a full-stack event booking platform supporting three distinct roles — **User, Organizer, and Admin** — each with dedicated workflows.

The system focuses on real-world features such as secure authentication, Stripe payment processing, subscriptions, chat systems, and admin moderation, all designed using **Clean Architecture** and **SOLID principles**.

---

## 🚀 Core Features

### 👥 Multi-Role System
- **User:** Discover, book, and review events  
- **Organizer:** Create/manage events, onboard Stripe accounts, manage subscriptions  
- **Admin:** Full platform control, monitoring, and moderation  

### 🔐 Authentication & Security
- OTP-based authentication  
- JWT-secured sessions  
- Role-based access control  

### 🎟️ Event & Booking System
- Event creation and management  
- Booking system with tracking  
- Reporting user, events, and chat messages  
- Reviews and ratings  

### 💳 Payments & Subscriptions
- Stripe integration for payments  
- Connected accounts for organizer payouts  
- Multiple Stripe account onboarding  
- Subscription plans with feature-based access  

### 💬 Chat System
- One-to-one chat (User ↔ Organizer)  
- Community chat  
- Chat message reporting and moderation  

### 🛡️ Reporting & Moderation
- Report events, organizers, and messages  
- Admin review and action workflows  
- Full moderation capabilities  

### ☁️ Media Handling
- Cloudinary integration for image and document uploads  

---

## 🏗️ Architecture
- **Clean Architecture:** Layered structure for separation of concerns
- **SOLID Principles:** Robust and maintainable code patterns
- **Dependency Injection:** Enhanced testability and flexibility
- **Modular Design:** Built for scalability and easy extension

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, OTP |
| **Payments** | Stripe (Connected Accounts) |
| **Storage** | Cloudinary |
| **DevOps** | Docker, Nginx |

---

## 🗂️ Project Structure

```bash
server/
├── src/
│   ├── domain/             # Entities & interfaces (Core logic)
│   ├── application/        # Use cases & business logic
│   ├── infrastructure/     # DB, external services, & repositories
│   └── interfaceAdapter/   # Routes, controllers, & middlewares
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Orchestration
└── package.json            # Dependencies & scripts
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js:** v18+
- **MongoDB:** Local instance or MongoDB Atlas
- **Stripe:** Developer account for API keys
- **Cloudinary:** Account for media storage

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# App Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=info

# Database (MongoDB)
MONGO_URI=your_mongodb_connection_string

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# JWT Security
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
JWT_REFRESH_TOKEN_EXPIRY=30d
JWT_RESET_EXPIRY=15m
ACCESS_TOKEN_TIME=15m
REFRESH_TOKEN_TIME=7d

# Stripe Integration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Stripe Redirect URLs
NEXT_PUBLIC_STRIPE_BOOKING_SUCCESS_URL=http://localhost:5173/success
NEXT_PUBLIC_STRIPE_BOOKING_CANCEL_URL=http://localhost:5173/cancel
NEXT_PUBLIC_STRIPE_SUBSCRIPTION_SUCCESS_URL=http://localhost:5173/sub-success
NEXT_PUBLIC_STRIPE_SUBSCRIPTION_CANCEL_URL=http://localhost:5173/sub-cancel
NEXT_PUBLIC_STRIPE_ONBOARDING_SUCCESS_URL=http://localhost:5173/onboard-success
NEXT_PUBLIC_STRIPE_ONBOARDING_REFRESH_URL=http://localhost:5173/onboard-refresh

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AWS S3 Configuration
S3_BUCKET_NAME=your_bucket_name
AWS_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Email / OTP Service (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
EMAIL_FROM=noreply@eventhub.com

# Resend API (Alternative Email Service)
RESEND_API_KEY=your_resend_api_key

# Admin Initial Credentials
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@eventhub.com
ADMIN_PASSWORD=your_admin_password

# External Auth
GOOGLE_CLIENT_ID=your_google_client_id

# Other
MAX_LIMIT_PER_USER=10
```

---

## ▶️ Running the Backend

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

---

## 📡 API Overview

| Module | Base Route | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | Authentication & OTP |
| **Users** | `/api/users` | User profile & settings |
| **Organizers** | `/api/organizers` | Organizer management |
| **Events** | `/api/events` | Event CRUD operations |
| **Bookings** | `/api/bookings` | Booking & ticket management |
| **Payments** | `/api/payments` | Stripe payment processing |
| **Subscriptions**| `/api/subscriptions` | Plan management |
| **Chat** | `/api/chat` | Messaging services |
| **Reviews** | `/api/reviews` | Feedback & ratings |
| **Reports** | `/api/reports` | Moderation reporting |
| **Admin** | `/api/admin` | Platform administration |

---

## 🧩 Role-Based Workflows

### 👤 User
- Register/Login with OTP  
- Browse and filter events  
- Book tickets via Stripe  
- Chat with organizers  
- Leave reviews and ratings  
- Report events or users  

---

### 🎪 Organizer
- Register and complete profile  
- Onboard Stripe connected accounts  
- Subscribe to plans  
- Create and manage events  
- Track bookings and revenue  
- Communicate with users  

---

### 🔧 Admin
- Monitor platform activity  
- Manage users, organizers, and events  
- Review reports and take actions  
- Moderate chats and content  
- Manage subscriptions  

---

## 🐳 Docker Support

The backend is fully containerized for consistent development and deployment environments.

### 🚀 Docker Setup
The project uses **Docker Compose** to orchestrate all required services.

#### Services
- **Backend:** Node.js API (Port `8000`)
- **MongoDB:** Primary Database (Port `27017`)
- **Redis:** Caching Layer (Port `6379`)

### Run with Docker Compose
```bash
docker-compose up --build
```

---

## 📌 Notes
- Follows **Clean Architecture** for long-term maintainability.
- Designed for high scalability and real-world performance.
- Extensible architecture for easy integration of new features.

---

## 👨‍💻 Author
**Vishnu V S**