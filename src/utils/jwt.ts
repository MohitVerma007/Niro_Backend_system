import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateToken(payload: {userId: number}): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d"});
}

export function verifyToken(token: string): {userId: number} {
    return jwt.verify(token, env.JWT_SECRET) as {userId: number}; // here we are using type assertion to tell TypeScript that the return value of jwt.verify will be of type {userId: number} example: if the payload is {userId: 1}, then the return value will be {userId: 1} and we can access it like this: const { userId } = verifyToken(token);
}
