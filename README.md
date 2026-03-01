🚀 EventHub – (Backend)

EventHub is a full-stack SaaS-based event booking and management platform where:

Users discover and book events

Organizers subscribe to create and manage events

Admin verifies organizers and manages the platform

This backend is built using Node.js, Express, MongoDB, and TypeScript, following Clean Architecture and SOLID principles, and is fully containerized using Docker.

🌍 Platform Overview

EventHub provides a complete event ecosystem with:

Secure ticket booking system

Organizer subscription-based access

Real-time messaging

Rating and review system

Event & organizer reporting

Organizer verification workflow

Role-based dashboards with analytics

👥 User Roles & Capabilities

👤 User

Browse and book events

Cancel tickets

Chat with organizers

Rate and review events & organizers

Report events or organizers

Manage personal profile

🧑‍💼 Organizer

Purchase subscription plans 

Create and manage events (only with active subscription)

Access analytics dashboard (bookings, revenue, payouts)

Chat with users

Manage profile & upload documents

Submit verification documents for admin approval

👨‍💻 Admin

Create and manage subscription plans

Verify organizers (approve/reject)

Monitor reported events & organizers

Moderate reviews

View platform-level analytics

💳 SaaS Subscription System

EventHub follows a tier-based SaaS subscription model.

🔹 Admin Creates Plans

Admin defines plans such as:

Starter

Regular

Premium

Each plan includes:

Monthly pricing

Feature limits

Event creation permissions

🔹 Organizer Purchases Plan

Organizer selects a plan

Backend creates Stripe Checkout session

Organizer completes payment

Stripe webhook verifies payment

Subscription record is activated with expiry date

🔹 Feature Gating Logic

Before an organizer creates an event:

Backend checks subscription status

Validates expiry date

Verifies plan limits

If no active subscription:

❌ Event creation is blocked
✅ Error returned: “Active subscription required”

This ensures proper SaaS access control.

💰 Payments & Refunds

Secure Stripe payment integration

Refund handling via Stripe Refund API

Webhook-based payment and subscription synchronization

🎟 Event & Booking System

Event creation and management

Ticket booking with seat validation

Ticket cancellation

Booking tracking and analytics

⭐ Rating & Review System

Users can:

Rate events

Rate organizers

Submit reviews

Admin can:

Moderate inappropriate reviews

Monitor platform feedback

🚩 Reporting & Moderation

Users can report:

Events

Organizers

Admin can review reports and take action.

🧾 Organizer Verification Flow

Organizer uploads verification documents

Admin reviews and approves/rejects

Verification status is tracked

Feature access controlled based on approval

💬 Real-Time Chat

Implemented using Socket.IO

Namespace-based role separation

Real-time messaging between users and organizers

🔄 Redis Usage

Redis is used as an in-memory store for:

OTP verification

Temporary authentication data

Automatic expiration using TTL

MongoDB handles all persistent storage.

🏗 Architecture

The backend follows Clean Architecture:

Controller → Use Case → Repository → Entity

SOLID Principles Applied

Single Responsibility Principle

Open/Closed Principle

Liskov Substitution Principle

Interface Segregation Principle

Dependency Inversion Principle

Additional Patterns:

Repository Pattern

DTO Pattern

Dependency Injection

Centralized Error Handling

Role-Based Middleware

This ensures scalability, maintainability, and testability.

🐳 Docker Setup

The backend is fully containerized using Docker and Docker Compose.

Services
Service	Purpose
Backend	API Service
MongoDB	Persistent Database
Redis	OTP & Temporary Data Storage

Run with:

docker-compose up --build

Stop services:

docker-compose down
🔐 Environment Variables

Create .env inside backend folder:

PORT=
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
🛠 Tech Stack
Backend

Node.js

Express.js

TypeScript

MongoDB

JWT

Integrations

Stripe

Cloudinary

Socket.IO

Redis

DevOps

Docker

Docker Compose

AWS 

Nginx 
