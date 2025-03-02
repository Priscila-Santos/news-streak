import { Request, Response } from 'express';
import { Pool } from 'pg';


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface AuthenticatedRequest extends Request {
  user?: any;
}

const updateStreak = async (userId: number) => {
  const result = await pool.query('SELECT last_read_date, streak FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  const today = new Date();
  const lastReadDate = new Date(user.last_read_date);
  
  // Se a última leitura foi ontem, incremente o streak
  if (lastReadDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
    await pool.query('UPDATE users SET streak = streak + 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
  } else if (lastReadDate.toDateString() !== today.toDateString()) {
    // Se a última leitura não foi hoje ou ontem, resetar o streak
    await pool.query('UPDATE users SET streak = 1, last_read_date = $1 WHERE id = $2', [new Date(), userId]);
  }
};

export const getDashboardData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      await updateStreak(req.user.id);  // Atualize o streak do usuário

      const result = await pool.query('SELECT name, streak FROM users WHERE id = $1', [req.user.id]);
      const user = result.rows[0];

      const dashboardData = {
        message: `Welcome to your dashboard, ${user.name}!`,
        stats: {
          articlesRead: 10, // Substituir com a lógica para calcular o número de artigos lidos
          currentStreak: user.streak,
          totalStreak: 15 // Substituir com a lógica para calcular o total streak
        }
      };

      res.status(200).json(dashboardData);
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

// export const getDashboardData = (req: AuthenticatedRequest, res: Response): void => {
//   try {
//     const dashboardData = {
//       message: `Welcome to your dashboard, ${req.user?.name}!`,
//       stats: {
//         articlesRead: 10,
//         currentStreak: 5,
//         totalStreak: 15
//       }
//     };

//     res.status(200).json(dashboardData);
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     res.status(500).json({ message: 'Error fetching dashboard data' });
//   }
// };
