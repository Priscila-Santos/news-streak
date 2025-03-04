"use strict";
// import express from 'express';
// import { authenticateToken } from '../middleware/authMiddleware';
// import { getDashboardData } from '../controllers/dashboardController';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.get('/dashboard', authenticateToken, getDashboardData);
// export default router;
// import { Router } from 'express';
// import { getDashboardData, recordArticleRead } from '../controllers/dashboardController';
// import { authenticateToken } from '../middleware/authMiddleware';
// const router = Router();
// // Rota para buscar dados do dashboard
// router.get('/dashboard', authenticateToken, getDashboardData);
// // Rota para registrar a leitura de um artigo
// router.post('/record-article-read', authenticateToken, async (req, res) => {
//   try {
//     const { articleId } = req.body;
//     const userId = req.user.id;
//     await recordArticleRead(userId, articleId);
//     res.status(200).json({ message: 'Article read recorded successfully' });
//   } catch (error) {
//     console.error("Error recording article read:", error);
//     res.status(500).json({ message: 'Error recording article read' });
//   }
// });
// export default router;
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rota para buscar dados do dashboard
router.get('/dashboard', authMiddleware_1.authenticateToken, dashboardController_1.getDashboardData);
// Rota para registrar a leitura de um artigo
router.post('/record-article-read', authMiddleware_1.authenticateToken, dashboardController_1.recordArticleRead);
exports.default = router;
