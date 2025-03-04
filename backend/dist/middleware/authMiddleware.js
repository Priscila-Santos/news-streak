"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        if (process.env.NODE_ENV !== 'production') { // Log só em desenvolvimento
            console.log("Authenticated user:", req.user);
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticateToken = authenticateToken;
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import dotenv from 'dotenv';
// export interface AuthenticatedRequest extends Request {
//   user?: any;
// }
// export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   const token = authHeader.split(" ")[1];
//   try {
//     if (!process.env.JWT_SECRET) {
//       return res.status(500).json({ message: "JWT secret is not defined" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Verification Error:", error);
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };
