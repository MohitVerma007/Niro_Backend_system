import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import { logger } from "./utils/logger.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

import { redisClient } from "./config/redis.js";

const app = express();

// ==========================================
// 1. GLOBAL MIDDLEWARES
// ==========================================

// Security headers lagane ke liye
app.use(helmet());

// Cross-Origin requests allow karne ke liye (Frontend integration ke waqt kaam aayega)
app.use(cors());

// HTTP requests ko terminal me log karne ke liye (Development me useful hai)
app.use(morgan("dev"));

// Incoming Requests ke JSON body ko parse karne ke liye
app.use(express.json());

// API requests ko logger mein save karne ke liye
app.use(loggerMiddleware);


// ==========================================
// 2. HEALTH CHECK ROUTE
// ==========================================
app.get("/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "Server is healthy and running!",
    timestamp: new Date().toISOString(),
  });
});


// ==========================================
// 3. API ROUTES MOUNTING
// ==========================================
// Aapke auth endpoints ab yahan se handle honge: /api/auth/register aur /api/auth/login
app.use("/api/auth", authRoutes);


app.use("/api/post", postRoutes);

// ==========================================
// 4. 404 NOT FOUND HANDLER
// ==========================================
// Agar koi aisa route hit kare jo exist nahi karta
app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server.`,
  });
});


// ==========================================
// 5. GLOBAL ERROR HANDLING MIDDLEWARE
// ==========================================
// Pure application me kahin bhi catch block se error yahan pass kiya ja sakta hai next(error) karke
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: "❌ GLOBAL ERROR LOG", error: err.message || err });

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong on the server";

  res.status(statusCode).json({
    success: false,
    message,
    // Development mode me stack trace dikhayenge taaki debugging aasan ho
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});




async function testRedis() {
    try {
        // await redisClient.connect();
        logger.info("✅ Redis connected successfully!");  
    } catch (error) {
        logger.error({ message: "❌ Redis connection failed", error });
    }
}

testRedis();

export default app;