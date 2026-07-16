import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import { logger } from "./utils/logger.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { Kafka } from "kafkajs";
import { runPostConsumer } from "./kafka/post.consumer.js";

import { redisClient } from "./config/redis.js";
import { connectKafka } from "./config/kafka.js";

const app = express();

// ==========================================
// 1. GLOBAL MIDDLEWARES
// ==========================================

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

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
app.use("/api/auth", authRoutes);


app.use("/api/post", postRoutes);

// ==========================================
// 4. 404 NOT FOUND HANDLER
// ==========================================
app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server.`,
  });
});


// ==========================================
// 5. GLOBAL ERROR HANDLING MIDDLEWARE
// ==========================================
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: "❌ GLOBAL ERROR LOG", error: err.message || err });

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong on the server";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

await connectKafka();

await runPostConsumer();






export default app;