import winston from "winston";

// Sahi tarika: Naya object return karein aur Winston ke internal symbols ko copy karein
const maskSensitiveData = winston.format((info) => {
  // Deep clone function sensitive data mask karne ke liye
  const mask = (obj: any): any => {
    if (!obj || typeof obj !== "object") return obj;
    
    // Agar Error instance hai toh uska structure copy karein safely
    if (obj instanceof Error) {
      return { message: obj.message, stack: obj.stack };
    }

    const newObj = Array.isArray(obj) ? [] : { ...obj };
    
    for (const key in obj) {
      if (key.toLowerCase().includes("password") || key.toLowerCase().includes("token")) {
        newObj[key] = "******";
      } else if (typeof obj[key] === "object") {
        newObj[key] = mask(obj[key]);
      }
    }
    return newObj;
  };

  // Winston internal symbols ko bypass karte hue data copy karein
  const maskedInfo = mask(info);
  
  // Winston ke unique Symbol keys ko wapas attach karna zaroori hai
  return Object.assign(info, maskedInfo);
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    maskSensitiveData(),
    winston.format.json()
  ),

  transports: [
    // Console
    new winston.transports.Console(),

    // All logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),

    // Only errors
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Only warnings
    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
  ],
});