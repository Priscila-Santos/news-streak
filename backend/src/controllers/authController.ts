import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const role = email.includes('@admin.news-streak') ? 'admin' : 'user'; 

  try {
    console.log("Request body:", { name, email, password, role }); 

    const user = await createUser(name, email, password, role); 
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(201).json({ token, role: user.role }); 
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt:", { email, password });

    const user = await findUserByEmail(email);
    console.log("User found:", user);

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ success: true, token, role: user.role }); // 🔹 Envia a role também
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};
