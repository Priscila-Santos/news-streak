import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, User } from '../interfaces'


export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(403).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string};

    console.log("🔍 Token decodificado:", decoded); // 🔹 Verifica se a role é "admin"

    req.user = { id: decoded.userId, role: decoded.role };

    if (process.env.NODE_ENV !== 'production') {  
      console.log("🔐 Usuário autenticado", req.user);
    }

    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Acesso restrito a administradores' });
    return;
  }

  next(); 
};

