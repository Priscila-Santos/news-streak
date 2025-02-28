import React, { useState } from "react";
import './Login.css';
import logo from '../../assets/img/logo.png';

interface LoginProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Adicionar lógica de autenticação aqui
        onLoginSuccess();
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
                    <p>Não tem conta? <a href="/subscribe">Cadastrar</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
