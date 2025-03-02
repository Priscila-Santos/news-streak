import express from 'express';
import { register, login } from '../controllers/authController';
import { authenticateToken  } from '../middleware/authMiddleware';import  { getDashboardData }  from '../controllers/dashboardController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', authenticateToken , getDashboardData);

export default router;


