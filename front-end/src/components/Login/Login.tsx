// import React, { useState } from "react";
// import axios from 'axios';
// import './Login.css';
// import logo from '../../assets/img/logo.png';

// interface LoginProps {
//     onClose: () => void;
//     onLoginSuccess: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [error, setError] = useState<string>('');

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post<{ success: boolean, token?: string, message?: string }>('http://localhost:3000/api/login', {
//                 email,
//                 password
//             });

//             if (response.data.success && response.data.token) {
//                 localStorage.setItem('token', response.data.token);
//                 onLoginSuccess();
//             } else {
//                 setError(response.data.message || 'Invalid email or password');
//             }
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 setError(error.response?.data?.message || 'An error occurred. Please try again.');
//             } else {
//                 setError('An error occurred. Please try again later.');
//             }
//         }
//     }

//     return (
//         <div className="login-modal-overlay">
//             <div className="login-modal">
//                 <button className="close-button" onClick={onClose}>×</button>
//                 <div className="login-modal-header">
//                     <img src={logo} alt="Logo" className="modal-logo" />
//                     <h2 className="modal-title">News Streak</h2>
//                 </div>
//                 <div className="login-modal-body">
//                     <input 
//                         type="email" 
//                         placeholder="Email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                     />
//                     <input 
//                         type="password" 
//                         placeholder="Password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                     />
//                     <button onClick={handleLogin}>Entrar</button>
//                     {error && <p className="error-message">{error}</p>}
//                     <p>Não tem conta? <a href="/subscribe">Cadastrar</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import axios from 'axios';
import './Login.css';
import logo from '../../assets/img/logo.png';

interface LoginProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async () => {
        try {
            const response = await axios.post<{ success: boolean, token?: string, message?: string }>('http://localhost:3000/api/login', {
                email,
                password
            });

            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                onLoginSuccess();
            } else {
                setError(response.data.message || 'Invalid email or password');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'An error occurred. Please try again later.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="login-modal-header">
                    <img src={logo} alt="Logo" className="modal-logo" />
                    <h2 className="modal-title">News Streak</h2>
                </div>
                <div className="login-modal-body">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button onClick={handleLogin}>Entrar</button>
                    {error && <p className="error-message">{error}</p>}
                    <p>Não tem conta? <a href="/subscribe">Cadastrar</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
