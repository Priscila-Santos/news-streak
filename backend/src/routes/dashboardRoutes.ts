import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getDashboardData } from '../controllers/dashboardController';

const router = express.Router();

router.get('/dashboard', authenticateToken, getDashboardData);

export default router;
