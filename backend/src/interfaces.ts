import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // especificar melhor o tipo de 'user' 
}
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  streak: number;
  last_read_date: Date; 
}

export interface AuthenticatedRequest extends Request {
  user?: User | any;
}