import { Request, Response } from 'express';
import { Pool } from 'pg';
import { AuthenticatedRequest } from '../interfaces';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const updateStreak = async (userId: number) => {
  const result = await pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  const today = new Date();
  const lastReadDate = new Date(user.last_read_date);

  if (lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
    await pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
  } else if (lastReadDate.toDateString() !== today.toDateString()) {
    await pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
  }
};

export const recordArticleRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log("Request body:", req.body);  // Log do corpo da requisição
    console.log("Authenticated user:", req.user);  // Log do usuário autenticado

    const { articleId } = req.body;
    const userId = req.user?.id;

    if (!articleId || !userId) {
      res.status(400).json({ message: "Missing articleId or userId" });
      return;
    }

    await pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);

    await updateStreak(userId);

    res.status(200).json({ message: "Article read recorded successfully" });
  } catch (error) {
    console.error("Error recording article read:", error);
    res.status(500).json({ message: "Error recording article read" });
  }
};


export const getArticlesReadCount = async (userId: number) => {
  const result = await pool.query('SELECT COUNT(*) FROM article_reads WHERE user_id = $1', [userId]);
  return parseInt(result.rows[0].count, 10);
};

export const getDashboardData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log("Authenticated user:", req.user);  // Log para verificar se o usuário está sendo reconhecido

    if (!req.user) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const result = await pool.query('SELECT name, streak FROM users WHERE id = $1', [req.user.id]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = result.rows[0];
    const articlesReadCount = await getArticlesReadCount(req.user.id);

    const dashboardData = {
      message: `Welcome to your dashboard, ${user.name}!`,
      stats: {
        articlesRead: articlesReadCount,
        currentStreak: user.streak,
        totalStreak: articlesReadCount,
      },
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
