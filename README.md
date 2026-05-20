# 🚀 EventHub Backend – Event Booking Platform

## 📌 Overview
The EventHub backend is a scalable, production-ready API built using Node.js and Express with TypeScript.  
It powers a full-stack event booking platform supporting three distinct roles — User, Organizer, and Admin — each with dedicated workflows.

The system focuses on real-world features such as secure authentication, Stripe payment processing, subscriptions, chat systems, and admin moderation, all designed using Clean Architecture and SOLID principles.

---

## 🚀 Core Features

### 👥 Multi-Role System
- **User:** Discover, book, and review events  
- **Organizer:** Create/manage events, onboard Stripe accounts, manage subscriptions  
- **Admin:** Full platform control, monitoring, and moderation  

---

### 🔐 Authentication & Security
- OTP-based authentication  
- JWT-secured sessions  
- Role-based access control  

---

### 🎟️ Event & Booking System
- Event creation and management  
- Booking system with tracking  
- Reporting user,events,chat messages  
- Reviews and ratings  

---

### 💳 Payments & Subscriptions
- Stripe integration for payments  
- Connected accounts for organizer payouts  
- Multiple Stripe account onboarding  
- Subscription plans with feature-based access  

---

### 💬 Chat System
- One-to-one chat (User ↔ Organizer)  
- Community chat  
- Chat message reporting and moderation  

---

### 🛡️ Reporting & Moderation
- Report events, organizers, and messages  
- Admin review and action workflows  
- Full moderation capabilities  

---

### ☁️ Media Handling
- Cloudinary integration for image and document uploads  

---

### 🏗️ Architecture
- Clean Architecture (Layered structure)  
- SOLID principles  
- Dependency Injection  
- Modular and scalable design  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, OTP  
- **Payments:** Stripe (Connected Accounts)  
- **Media Storage:** Cloudinary  
- **DevOps:** Docker, Nginx  

---

## 🗂️ Project Structure

```bash
server/
├── src/
│   ├── domain/          # Entities & interfaces
│   ├── application/       # Business logic
│   ├── infrastructure/  # DB & external services
│   └── interfaceAdapter/    # Routes & controllers
├── Dockerfile
└── package.json
```

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Stripe account
- Cloudinary account

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory:

```env
# App
PORT=8000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email / OTP
MAIL_HOST=smtp.example.com
MAIL_USER=your_email
MAIL_PASS=your_password
```
## ▶️ Running the Backend

### Install Dependencies
```bash
cd server
npm install
```
### Start Development Server
```bash
npm run dev
```
## 📡 API Overview

| Module         | Base Route           |
|---------------|---------------------|
| Auth          | /api/auth           |
| Users         | /api/users          |
| Organizers    | /api/organizers     |
| Events        | /api/events         |
| Bookings      | /api/bookings       |
| Payments      | /api/payments       |
| Subscriptions | /api/subscriptions  |
| Chat          | /api/chat           |
| Reviews       | /api/reviews        |
| Reports       | /api/reports        |
| Admin         | /api/admin          |

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

The backend is containerized using Docker.

## 🐳 Docker Setup

The project uses Docker Compose to run all services.

### Services
- **Backend:** Node.js API (port 8000)  
- **MongoDB:** Database (port 27017)  
- **Redis:** Caching (port 6379)  

---

### Run with Docker Compose

```bash
docker-compose up --build
```
## 📌 Notes
- Follows Clean Architecture for maintainability  
- Designed for scalability and real-world use cases  
- Easily extendable for future features  

---

## 👨‍💻 Author
**Vishnu V S**