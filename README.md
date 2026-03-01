EVENTHUB – BACKEND
SaaS Event Booking & Management Platform
EventHub is a SaaS-based event booking and management platform where Users book events, Organizers subscribe to create and manage events, and Admin verifies and monitors the platform.

Built using Node.js, Express, MongoDB, and TypeScript following Clean Architecture and SOLID principles. Fully containerized using Docker for scalable deployment.
Platform Overview
•	Secure ticket booking system
•	Organizer subscription-based access
•	Real-time messaging
•	Rating & review system
•	Event & organizer reporting
•	Organizer verification workflow
•	Role-based dashboards with analytics
User Roles & Capabilities
User
•	Browse and book events
•	Cancel tickets
•	Chat with organizers
•	Rate and review events & organizers
•	Report events or organizers
•	Manage personal profile
Organizer
•	Purchase subscription plans
•	Create and manage events (only with active subscription)
•	Access analytics dashboard (bookings, revenue, payouts)
•	Chat with users
•	Manage profile & upload documents
•	Submit verification documents for admin approval
Admin
•	Create and manage subscription plans
•	Verify organizers (approve/reject)
•	Monitor reported events & organizers
•	Moderate reviews
•	View platform-level analytics
SaaS Subscription System
Admin creates tier-based plans (Starter, Regular, Premium). Organizers purchase plans via Stripe. Subscription status and expiry are validated before allowing event creation.
Feature Gating Logic
Before event creation, the backend validates active subscription status, expiry date, and plan limits. If inactive or expired, event creation is blocked.
Payments & Refunds
•	Stripe Checkout integration
•	Recurring subscription billing
•	Refund handling via Stripe API
•	Webhook-based payment synchronization
Event & Booking System
•	Event creation and management
•	Ticket booking with seat validation
•	Ticket cancellation
•	Booking tracking and analytics
Rating, Review & Reporting
•	Users can rate events and organizers
•	Users can report events or organizers
•	Admin moderation system
Organizer Verification Flow
•	Organizer uploads verification documents
•	Admin reviews and approves/rejects
•	Verification status tracking
•	Access control based on approval
Redis Usage
Redis is used for OTP verification and temporary authentication data with TTL-based expiration. MongoDB handles all persistent storage.
Architecture
Controller → Use Case → Repository → Entity
•	Single Responsibility Principle
•	Open/Closed Principle
•	Liskov Substitution Principle
•	Interface Segregation Principle
•	Dependency Inversion Principle
•	Repository Pattern
•	DTO Pattern
•	Dependency Injection
•	Centralized Error Handling
•	Role-Based Middleware
Docker Setup
•	Backend – API Service
•	MongoDB – Persistent Database
•	Redis – OTP & Temporary Data Storage
•	Docker Compose orchestration
Environment Variables
PORT=
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=
Tech Stack
•	Node.js
•	Express.js
•	TypeScript
•	MongoDB
•	JWT
•	Stripe
•	Cloudinary
•	Socket.IO
•	Redis
•	Docker
•	Docker Compose
•	AWS
•	Nginx
Author
Vishnu V S
Full Stack MERN Developer
CMA Finalist
