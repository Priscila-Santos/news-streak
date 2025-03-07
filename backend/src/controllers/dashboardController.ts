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
      console.log("Request body:", req.body);
      console.log("Authenticated user:", req.user);
      
      const { articleId } = req.body;
      const userId = req.user?.id;

      if (!articleId || !userId) {
          res.status(400).json({ message: "Missing articleId or userId" });
          return;
      }

      await pool.query('INSERT INTO article_reads (user_id, article_id) VALUES ($1, $2)', [userId, articleId]);

      // Atualiza o streak do usuário
      await updateStreak(userId);

      // Incrementa o total de artigos lidos
      await pool.query('UPDATE users SET total_articles_read = total_articles_read + 1 WHERE id = $1', [userId]);

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
      console.log("Authenticated user:", req.user);
      if (!req.user) {
          res.status(401).json({ message: "User not authenticated" });
          return;
      }

      const result = await pool.query('SELECT name, streak, total_articles_read FROM users WHERE id = $1', [req.user.id]);

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
  } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

// 🔹 Dados do painel administrativo
export const getAdminDashboardData = async (req: Request, res: Response) => {
  try {
    // Buscar ranking dos usuários mais engajados
    const rankingQuery = `
      SELECT name, streak, total_articles_read AS "articlesRead"
      FROM users
      ORDER BY streak DESC, total_articles_read DESC
      LIMIT 10;
    `;
    const rankingResult = await pool.query(rankingQuery);

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
    const engagementResult = await pool.query(engagementQuery);

    res.status(200).json({
      ranking: rankingResult.rows,
      engagement: engagementResult.rows,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar métricas do dashboard:", error);
    res.status(500).json({ message: "Erro ao buscar dados do dashboard." });
  }
};
