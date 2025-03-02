// import { useState } from "react";
// import { AuthContext, AuthContextType } from "./AuthContext";

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email: string, password: string) => {
//     console.log("Tentando logar com", email);
//     // Aqui você faria uma requisição ao backend
//     setUser({ email });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
