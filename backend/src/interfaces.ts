import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // especificar melhor o tipo de 'user' 
}
export interface User extends Request {
  id: number;
  name: string;
  email: string;
  password: string;
  streak: number;
  last_read_date: Date; 
  role: 'user' | 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: User | any;
}