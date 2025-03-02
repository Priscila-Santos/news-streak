import { createContext } from "react";

export interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
