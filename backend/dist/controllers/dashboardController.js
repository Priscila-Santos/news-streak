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
exports.getDashboardData = exports.getArticlesReadCount = exports.recordArticleRead = void 0;
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
        console.log("Request body:", req.body); // Log do corpo da requisição
        console.log("Authenticated user:", req.user); // Log do usuário autenticado
        const { articleId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!articleId || !userId) {
            res.status(400).json({ message: "Missing articleId or userId" });
            return;
        }
        yield pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
        yield updateStreak(userId);
        res.status(200).json({ message: "Article read recorded successfully" });
    }
    catch (error) {
        console.error("Error recording article read:", error);
        res.status(500).json({ message: "Error recording article read" });
    }
});
exports.recordArticleRead = recordArticleRead;
// export const recordArticleRead = async (req: AuthenticatedRequest, res: Response) => {
//   try {
//     const { articleId } = req.body;
//     const userId = req.user.id;
//     // Log para verificar os valores de userId e articleId
//     console.log('Record article read request:', { userId, articleId });
//     // Registrar a leitura do artigo
//     await pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);
//     console.log('Article read recorded successfully');
//     // Atualizar o streak
//     await updateStreak(userId);
//     console.log('Streak updated successfully for user:', userId);
//     res.status(200).json({ message: 'Article read recorded successfully' });
//   } catch (error) {
//     console.error("Error recording article read:", error);
//     res.status(500).json({ message: 'Error recording article read' });
//   }
// };
const getArticlesReadCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pool.query('SELECT COUNT(*) FROM article_reads WHERE user_id = $1', [userId]);
    return parseInt(result.rows[0].count, 10);
});
exports.getArticlesReadCount = getArticlesReadCount;
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Authenticated user:", req.user); // Log para verificar se o usuário está sendo reconhecido
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }
        const result = yield pool.query('SELECT name, streak FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const user = result.rows[0];
        const articlesReadCount = yield (0, exports.getArticlesReadCount)(req.user.id);
        const dashboardData = {
            message: `Welcome to your dashboard, ${user.name}!`,
            stats: {
                articlesRead: articlesReadCount,
                currentStreak: user.streak,
                totalStreak: articlesReadCount,
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
// export const getDashboardData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
//   try {
//     if (req.user) {
//       const result = await pool.query('SELECT name, streak FROM users WHERE id = $1', [req.user.id]);
//       const user = result.rows[0];
//       if (user) {
//         const articlesReadCount = await getArticlesReadCount(req.user.id);
//         const dashboardData = {
//           message: `Welcome to your dashboard, ${user.name}!`,
//           stats: {
//             articlesRead: articlesReadCount,
//             currentStreak: user.streak,
//             totalStreak: articlesReadCount,
//           },
//         };
//         res.status(200).json(dashboardData);
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } else {
//       res.status(401).json({ message: 'User not authenticated' });
//     }
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     res.status(500).json({ message: 'Error fetching dashboard data' });
//   }
// };
