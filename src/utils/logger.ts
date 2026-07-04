// src/utils/logger.ts
import winston from "winston";

// Password mask karne wala custom formatter
const maskSensitiveData = winston.format((info) => {
  // Agar info ek object hai aur usme sensitive fields hain
  const mask = (obj: any) => {
    if (!obj || typeof obj !== "object") return;
    for (const key in obj) {
      if (key.toLowerCase().includes("password") || key.toLowerCase().includes("token")) {
        obj[key] = "******";
      } else if (typeof obj[key] === "object") {
        mask(obj[key]); // Nested objects ke liye recursive check
      }
    }
  };

  mask(info);
  return info;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    maskSensitiveData(), // <-- Ye format sabse pehle chalega
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" })
  ],
});

// use this in your application like this:
// import { logger } from './utils/logger';
// logger.info('This is an info message');
// logger.error('This is an error message');
