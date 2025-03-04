"use strict";
// import { Pool } from 'pg';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
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
exports.recordArticleRead = exports.updateUserStreak = exports.findUserById = exports.findUserByEmail = exports.updateUserPassword = exports.createUser = void 0;
// dotenv.config();
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   streak: number;
//   last_read_date: Date; 
// }
// export const createUser = async (name: string, email: string, password: string): Promise<User> => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const result = await pool.query<User>(
//     'INSERT INTO users (name, email, password, streak, last_read_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//     [name, email, hashedPassword, 0, new Date()]
//   );
//   return result.rows[0];
// };
// export const updateUserPassword = async (id: number, password: string): Promise<void> => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
// };
// export const findUserByEmail = async (email: string): Promise<User | null> => {
//   const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0] || null;
// };
// export const findUserById = async (id: number): Promise<User | null> => {
//   const result = await pool.query<User>('SELECT * FROM users WHERE id = $1', [id]);
//   return result.rows[0] || null;
// };
// // Função para atualizar o streak do usuário
// export const updateUserStreak = async (userId: number): Promise<void> => {
//   const result = await pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
//   const user = result.rows[0];
//   const today = new Date();
//   const lastReadDate = new Date(user.last_read_date);
//   // Verifique se hoje é domingo (0) ou a última leitura foi no sábado (6)
//   if (today.getDay() !== 0 && !(lastReadDate.getDay() === 6 && today.getDay() === 1)) {
//     if (lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
//       await pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//     } else if (lastReadDate.toDateString() !== today.toDateString()) {
//       await pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//     }
//   } else {
//     await pool.query('UPDATE users SET last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//   }
// };
// // Função para registrar a leitura de um artigo
// export const recordArticleRead = async (userId: number, articleId: number): Promise<void> => {
//   await pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
// };
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield pool.query('INSERT INTO users (name, email, password, streak, last_read_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, hashedPassword, 0, new Date()]);
    return result.rows[0];
});
exports.createUser = createUser;
const updateUserPassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
});
exports.updateUserPassword = updateUserPassword;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
});
exports.findUserById = findUserById;
// // Função para atualizar o streak do usuário
// export const updateUserStreak = async (userId: number): Promise<void> => {
//   const result = await pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
//   const user = result.rows[0];
//   const today = new Date();
//   const lastReadDate = user.last_read_date ? new Date(user.last_read_date) : null;
//   console.log('Updating streak for user:', user); // Log para debug
//   console.log('Today:', today);
//   console.log('Last read date:', lastReadDate);
//   // Verifique se o artigo já foi lido hoje
//   if (lastReadDate && lastReadDate.toDateString() === today.toDateString()) {
//     console.log('Article already read today. No streak change.'); // Log para debug
//     return;
//   }
//   // Verifique se hoje é domingo (0) ou a última leitura foi no sábado (6)
//   if (today.getDay() !== 0 && !(lastReadDate && lastReadDate.getDay() === 6 && today.getDay() === 1)) {
//     if (lastReadDate && lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
//       await pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//       console.log('Streak incremented for user:', userId); // Log para debug
//     } else {
//       await pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//       console.log('Streak reset for user:', userId); // Log para debug
//     }
//   } else {
//     await pool.query('UPDATE users SET last_read_date = $1 WHERE id = $2', [new Date(), userId]);
//     console.log('Last read date updated for user (no streak change):', userId); // Log para debug
//   }
// };
// Função para atualizar o streak do usuário
const updateUserStreak = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    const today = new Date();
    const lastReadDate = user.last_read_date ? new Date(user.last_read_date) : null;
    console.log('Updating streak for user:', user); // Log para debug
    console.log('Today:', today);
    console.log('Last read date:', lastReadDate);
    // Verifique se o artigo já foi lido hoje
    if (lastReadDate && lastReadDate.toDateString() === today.toDateString()) {
        console.log('Article already read today. No streak change.'); // Log para debug
        return;
    }
    // Verifique se hoje é domingo (0) ou a última leitura foi no sábado (6)
    if (today.getDay() !== 0 && !(lastReadDate && lastReadDate.getDay() === 6 && today.getDay() === 1)) {
        if (lastReadDate && lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
            yield pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
            console.log('Streak incremented for user:', userId); // Log para debug
        }
        else {
            yield pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
            console.log('Streak reset for user:', userId); // Log para debug
        }
    }
    else {
        yield pool.query('UPDATE users SET last_read_date = $1 WHERE id = $2', [new Date(), userId]);
        console.log('Last read date updated for user (no streak change):', userId); // Log para debug
    }
});
exports.updateUserStreak = updateUserStreak;
// Função para registrar a leitura de um artigo
const recordArticleRead = (userId, articleId) => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
    yield (0, exports.updateUserStreak)(userId); // Atualiza o streak do usuário após registrar a leitura do artigo
});
exports.recordArticleRead = recordArticleRead;
