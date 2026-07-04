# Niro_Backend_system 🚀

A highly scalable, flexible, and robust backend engine engineered specifically to power dynamic, dashboard-driven applications. Built with **Node.js**, **TypeScript**, and an enterprise-grade modular architecture, this system is optimized to manage heavy data throughput, complex data pipelines, and real-time data transfers with low latency.

---

## 🛠️ Tech Stack & Core Concepts
*   **Runtime:** Node.js (v20+)
*   **Language:** TypeScript (Strict Mode)
*   **Framework/Core:** Express.js / Fastify (Optional for higher throughput)
*   **Database Support:** PostgreSQL (Relational/Analytics), Redis (Caching & Message Broker)
*   **Protocols:** REST APIs, WebSockets (for real-time dashboard updates), gRPC (Optional for microservices)

---

## 🏗️ System Design Architecture

The architecture is designed keeping **High Availability**, **Fault Tolerance**, and **Horizontal Scalability** in mind to manage high-frequency dashboard queries.


### Key Architectural Patterns:
1. **Stateless Nodes:** Allows easy horizontal scaling across cloud instances.
2. **Database Read/Write Splitting:** Heavy analytical queries for dashboards are routed to Read Replicas to avoid locking the primary DB.
3. **In-Memory Caching:** Redis caches frequent dashboard metrics to achieve sub-millisecond response times.
4. **Data Ingestion Pipeline:** Uses a modular service layer to process incoming high-volume data streams sequentially without blocking the event loop.

---

## 📁 Folder Architecture

This project follows an enterprise-level **Modular Feature-Driven / Layered Architecture** to keep the codebase maintainable as the system grows.


src/
│
├── @types/                 # Global TypeScript type definitions & interfaces
├── config/                 # Environment variables, database configs, and constants
│   ├── database.ts
│   └── logger.ts
│
├── constants/              # System-wide enums and immutable values
│
├── controllers/            # Request handlers (Parses request, sends response)
│   ├── auth.controller.ts
│   └── dashboard.controller.ts
│
├── dtos/                   # Data Transfer Objects (Validation schemas using Zod/Joi)
│   └── dashboard.dto.ts
│
├── errors/                 # Custom error classes (AppError, BadRequestError)
│
├── middlewares/            # Custom express middlewares
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── rateLimiter.middleware.ts
│
├── models/                 # Database Schemas / ORM Models (Prisma/Sequelize/Mongoose)
│
├── repositories/           # Data Access Layer (Direct DB queries go here)
│   └── dashboard.repository.ts
│
├── routes/                 # API Routing definitions
│   ├── index.ts
│   └── dashboard.routes.ts
│
├── services/               # Core Business Logic Layer (Calculations, integrations)
│   └── dashboard.service.ts
│
├── utils/                  # Utility/Helper functions (helpers, formatters)
│
├── app.ts                  # App initialization, middleware binding
└── server.ts               # Server bootstrap, port listening, error shutdown handling



🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v20.x or higher)

npm / yarn / pnpm

Docker (Optional, for running Redis/Postgres locally)

Installation
Clone the repository:

Bash
git clone [https://github.com/MohitVerma007/Niro_Backend_system.git](https://github.com/MohitVerma007/Niro_Backend_system.git)
cd Niro_Backend_system
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your configurations (refer to .env.example).

Run the application:

Development Mode (with hot-reload):

Bash
npm run dev
Production Build:

Bash
npm run build
npm start
