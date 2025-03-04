import { Request, Response } from 'express';
import { updateUserStreak, recordArticleRead } from '../models/userModel';
import { AuthenticatedRequest } from '../interfaces';

export const handleArticleRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user) {
      const { articleId } = req.body;

      await recordArticleRead(req.user.id, articleId);
      await updateUserStreak(req.user.id);

      res.status(200).json({ message: 'Article read recorded successfully' });
    } else {
      res.status(401).json({ message: 'User not authenticated' });
    }
  } catch (error) {
    console.error("Error recording article read:", error);
    res.status(500).json({ message: 'Error recording article read' });
  }
};
