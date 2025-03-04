import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces'


export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.user = { id: decoded.userId };

    if (process.env.NODE_ENV !== 'production') {  // Log só em desenvolvimento
      console.log("Authenticated user:", req.user);
    }

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
