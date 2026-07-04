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
```

Backend_system/
│
├── src/                               # Main application source code
│   │
│   ├── config/                        # Configuration files
│   │   ├── env.ts                     # Environment variable loader & validation
│   │   └── prisma.ts                  # Prisma client initialization
│   │
│   ├── constants/                     # Global constants & enums
│   │   └── httpStatus.ts              # HTTP status codes
│   │
│   ├── controllers/                   # Handles HTTP requests & responses
│   │   └── auth.controller.ts         # Authentication controller
│   │
│   ├── middlewares/                   # Express middlewares
│   │   ├── auth.middleware.ts         # JWT authentication middleware
│   │   ├── logger.middleware.ts       # Request logging middleware
│   │   └── validation.middleware.ts   # Request body validation
│   │
│   ├── routes/                        # API route definitions
│   │   └── auth.routes.ts             # Authentication routes
│   │
│   ├── services/                      # Business logic layer
│   │   └── auth.service.ts            # Authentication business logic
│   │
│   ├── utils/                         # Reusable helper functions
│   │   ├── jwt.ts                     # JWT generation & verification
│   │   ├── logger.ts                  # Winston/Pino logger configuration
│   │   └── password.ts                # Password hashing & comparison
│   │
│   ├── validators/                    # Zod/Joi validation schemas
│   │   └── auth.validator.ts          # Authentication validation schemas
│   │
│   ├── interfaces/                    # Shared TypeScript interfaces & types
│   │
│   ├── app.ts                         # Express app configuration
│   └── server.ts                      # Application entry point
│
├── prisma/                            # Prisma ORM files
│   ├── schema.prisma                  # Database schema
│   ├── seed.ts                        # Database seeding script
│   └── migrations/                    # Prisma migration history
│
├── tests/                             # Unit & integration tests
│
├── logs/                              # Application log files
│
├── .env                               # Environment variables
├── .gitignore                         # Git ignored files
├── docker-compose.yml                 # Docker services configuration
├── package.json                       # Project metadata & scripts
├── prisma.config.ts                   # Prisma configuration
└── tsconfig.json                      # TypeScript compiler configuration



```
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
