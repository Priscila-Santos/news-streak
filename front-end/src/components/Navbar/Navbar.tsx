import React, { useState, useEffect } from "react";
import './Navbar.css';
import logoNavbar from '../../assets/img/logo.png';
import LoginModal from '../Login/Login';

const Navbar: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const handleLoginClick = () => {
        setLoginModalOpen(true);
    }

    const handleLogoutClick = () => {
        setLoggedIn(false);
        localStorage.removeItem('token');
    }

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        setLoginModalOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logoNavbar} alt="Logo" className="navbar-logo" />
                <a href="/" className="navbar-title">News Streak</a>
            </div>

            <div className="navbar-right">
                {isLoggedIn ? (
                    <>
                        <a href="/dashboard" className="navbar-link">Dashboard</a>
                        <a href="/" className="navbar-link" onClick={handleLogoutClick}>Logout</a>
                    </>
                ) : (
                    <a href="#" className="navbar-link" onClick={handleLoginClick}>Login</a>
                )}
                <a href="/subscribe" className="navbar-link">Subscribe</a>
                <a href="/settings" className="navbar-link">Settings</a>
            </div>

            {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
        </nav>
    );
}

export default Navbar;


// import React, { useState } from "react";
// import './Navbar.css';
// import logoNavbar from '../../assets/img/logo.png';
// import LoginModal from '../Login/Login';

// const Navbar: React.FC = () => {
//     const [isLoginModalOpen, setLoginModalOpen] = useState(false);
//     const [isLoggedIn, setLoggedIn] = useState(false);

//     const handleLoginClick = () => {
//         setLoginModalOpen(true);
//     }

//     const handleLogoutClick = () => {
//         setLoggedIn(false);
//     }

//     const handleLoginSuccess = () => {
//         setLoggedIn(true);
//         setLoginModalOpen(false);
//     }

//     return (
//         <nav className="navbar">
//             <div className="navbar-left">
//                 <img src={logoNavbar} alt="Logo" className="navbar-logo" />
//                 <a href="/" className="navbar-title">News Streak</a>
//             </div>

//             <div className="navbar-right">
//                 {isLoggedIn ? (
//                     <a href="/" className="navbar-link" onClick={handleLogoutClick}>Logout</a>
//                 ) : (
//                     <a href="#" className="navbar-link" onClick={handleLoginClick}>Login</a>
//                 )}
//                 <a href="/subscribe" className="navbar-link">Subscribe</a>
//                 <a href="/dashboard" className="navbar-link">Dashboard</a>
//                 <a href="/settings" className="navbar-link">Settings</a>
//             </div>

//             {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
//         </nav>
//     );
// }

// export default Navbar;
