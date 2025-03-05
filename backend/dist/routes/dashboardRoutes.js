"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rota para buscar dados do dashboard
router.get('/dashboard', authMiddleware_1.authenticateToken, dashboardController_1.getDashboardData);
// Rota para registrar a leitura de um artigo
router.post('/record-article-read', authMiddleware_1.authenticateToken, dashboardController_1.recordArticleRead);
exports.default = router;
