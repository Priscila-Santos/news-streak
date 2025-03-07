"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Access denied. No token provided.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("🔍 Token decodificado:", decoded); // 🔹 Verifica se a role é "admin"
        req.user = { id: decoded.userId, role: decoded.role };
        if (process.env.NODE_ENV !== 'production') {
            console.log("🔐 Usuário autenticado", req.user);
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
    }
    if (req.user.role !== 'admin') {
        res.status(403).json({ message: 'Acesso restrito a administradores' });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
