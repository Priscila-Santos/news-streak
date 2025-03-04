import express from 'express';
import { handleArticleRead } from '../controllers/articleController';
import { AuthenticatedRequest } from '../interfaces';

const router = express.Router();

router.post('/record-article-read', handleArticleRead);

export default router;
