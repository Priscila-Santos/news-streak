import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getDashboardData = (req: AuthenticatedRequest, res: Response): void => {
  try {
    const dashboardData = {
      message: `Welcome to your dashboard, ${req.user?.name}!`,
      stats: {
        articlesRead: 10,
        currentStreak: 5,
        totalStreak: 15
      }
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};
