import { Router } from 'express';
import { getDashboardData, recordArticleRead } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();


// Rota para buscar dados do dashboard
router.get('/dashboard', authenticateToken, getDashboardData, );

// Rota para registrar a leitura de um artigo

router.post('/record-article-read', authenticateToken, recordArticleRead);


export default router;
