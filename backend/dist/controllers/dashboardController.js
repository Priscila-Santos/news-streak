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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboardData = exports.getDashboardData = exports.getArticlesReadCount = exports.recordArticleRead = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const updateStreak = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    const today = new Date();
    const lastReadDate = new Date(user.last_read_date);
    if (lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
        yield pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
    }
    else if (lastReadDate.toDateString() !== today.toDateString()) {
        yield pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
    }
});
const recordArticleRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("Request body:", req.body);
        console.log("Authenticated user:", req.user);
        const { articleId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!articleId || !userId) {
            res.status(400).json({ message: "Missing articleId or userId" });
            return;
        }
        yield pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
        // Atualiza o streak do usuário
        yield updateStreak(userId);
        // Incrementa o total de artigos lidos
        yield pool.query('UPDATE users SET total_articles_read = total_articles_read + 1 WHERE id = $1', [userId]);
        res.status(200).json({ message: "Article read recorded successfully" });
    }
    catch (error) {
        console.error("Error recording article read:", error);
        res.status(500).json({ message: "Error recording article read" });
    }
});
exports.recordArticleRead = recordArticleRead;
const getArticlesReadCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT COUNT(*) FROM article_reads WHERE user_id = $1', [userId]);
    return parseInt(result.rows[0].count, 10);
});
exports.getArticlesReadCount = getArticlesReadCount;
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Authenticated user:", req.user);
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const result = yield pool.query('SELECT name, streak, total_articles_read FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const user = result.rows[0];
        const dashboardData = {
            message: `Welcome to your dashboard, ${user.name}!`,
            stats: {
                articlesRead: user.total_articles_read,
                currentStreak: user.streak
            },
        };
        res.status(200).json(dashboardData);
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
});
exports.getDashboardData = getDashboardData;
// 🔹 Dados do painel administrativo
const getAdminDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscar ranking dos usuários mais engajados
        const rankingQuery = `
      SELECT name, streak, total_articles_read AS "articlesRead"
      FROM users
      ORDER BY streak DESC, total_articles_read DESC
      LIMIT 10;
    `;
        const rankingResult = yield pool.query(rankingQuery);
        // Buscar engajamento diário (quantidade de streaks e artigos lidos por dia)
        const engagementQuery = `
      SELECT 
        DATE(last_read_date) AS date,
        COUNT(*) AS streakDays,
        SUM(total_articles_read) AS articlesRead
      FROM users
      WHERE last_read_date IS NOT NULL
      GROUP BY date
      ORDER BY date DESC
      LIMIT 7;
    `;
        const engagementResult = yield pool.query(engagementQuery);
        res.status(200).json({
            ranking: rankingResult.rows,
            engagement: engagementResult.rows,
        });
    }
    catch (error) {
        console.error("❌ Erro ao buscar métricas do dashboard:", error);
        res.status(500).json({ message: "Erro ao buscar dados do dashboard." });
    }
});
exports.getAdminDashboardData = getAdminDashboardData;
