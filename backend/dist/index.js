"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Configurar CORS para permitir requisições do frontend
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Substitua pela URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
app.use('/api', dashboardRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes';
// import dotenv from 'dotenv';
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;
// // Configurar CORS para permitir requisições do front-end
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// // Middleware para registrar todas as requisições
// app.use((req, res, next) => {
//   console.log(`Received ${req.method} request for ${req.url}`);
//   next();
// });
// app.use('/api', authRoutes);
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
