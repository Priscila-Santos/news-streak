import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  streak: number;
}

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query<User>(
    'INSERT INTO users (name, email, password, streak) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, 0]
  );
  return result.rows[0];
};

const updatePasswords = async () => {
  const users = await pool.query('SELECT * FROM users');
  for (const user of users.rows) {
    if (!user.password.startsWith('$2b$')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
    }
  }
  console.log("Passwords updated successfully!");
};

updatePasswords().catch(console.error);


export const findUserByEmail = async (email: string) => {
  const result = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};
