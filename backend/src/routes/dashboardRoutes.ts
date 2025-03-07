import { Router } from 'express';
import { getDashboardData, getAdminDashboardData, recordArticleRead } from '../controllers/dashboardController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();


// Rota para buscar dados do dashboard
router.get('/dashboard', authenticateToken, getDashboardData, );

// 🔹 Rota para administradores acessarem o painel administrativo
router.get('/dashboard/admin', authenticateToken, isAdmin, getAdminDashboardData);


// Rota para registrar a leitura de um artigo

router.post('/record-article-read', authenticateToken, recordArticleRead);


export default router;
