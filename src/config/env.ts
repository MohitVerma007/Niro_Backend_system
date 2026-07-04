import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!, // use in any file by using import { env } from "../config/env" and then use env.JWT_SECRET
};