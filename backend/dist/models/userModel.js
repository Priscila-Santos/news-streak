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
exports.findUserByEmail = exports.createUser = void 0;
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield pool.query('INSERT INTO users (name, email, password, streak) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, 0]);
    return result.rows[0];
});
exports.createUser = createUser;
const updatePasswords = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield pool.query('SELECT * FROM users');
    for (const user of users.rows) {
        if (!user.password.startsWith('$2b$')) {
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            yield pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
        }
    }
    console.log("Passwords updated successfully!");
});
updatePasswords().catch(console.error);
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
});
exports.findUserByEmail = findUserByEmail;
