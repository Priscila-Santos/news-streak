"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        console.log("Request body:", { name, email, password });
        const user = yield (0, userModel_1.createUser)(name, email, password);
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: 'Error creating user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log("Login attempt:", { email, password });
        const user = yield (0, userModel_1.findUserByEmail)(email);
        console.log("User found:", user);
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});
exports.login = login;
