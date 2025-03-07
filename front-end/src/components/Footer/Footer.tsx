import React from 'react';
import './Footer.css';
import logoFooter from '../../assets/img/logo.png'

import logoX from '../../assets/icons/icons8-twitter-50.png';
import logoInstagram from '../../assets/icons/icons8-instagram-50.png';
import logoLinkedIn from '../../assets/icons/icons8-linkedin-50.png';
import logoTikTok from '../../assets/icons/icons8-tiktok-50.png';
import logoRSS from '../../assets/icons/icons8-rss-50.png';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo">
          <img src={logoFooter} alt="the news streak logo" className="footer-logo" />
          <p>News Streak</p>
        </div>
        <p className="footer-tagline">Tudo que você precisa saber pra começar seu dia bem e informado</p>
        <p className="footer-copyright">© 2025 Grupo News Streak.</p>
      </div>
      <div className="footer-center">
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li><a href="/" className="footer-nav-link">Início</a></li>
            <li><a href="/posts" className="footer-nav-link">Posts</a></li>
            <li><a href="/newsletters" className="footer-nav-link">Newsletters</a></li>
          </ul>
        </nav>
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li><a href="/contact" className="footer-nav-link">fale conosco</a></li>
            <li><a href="/advertise" className="footer-nav-link">anuncie no News Streak</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-right">
        <form className="subscription-form">
          <input type="email" placeholder="coloque seu e-mail" className="subscription-input" />
          <button type="submit" className="subscription-button">inscreva-se</button>
        </form>
        <div className="social-media">
          <a href="https://twitter.com"><img src={logoX} alt="Twitter" className="social-icon" /></a>
          <a href="https://linkedin.com"><img src={logoLinkedIn} alt="LinkedIn" className="social-icon" /></a>
          <a href="https://instagram.com"><img src={logoInstagram} alt="Instagram" className="social-icon" /></a>
          <a href="https://tiktok.com"><img src={logoTikTok} alt="TikTok" className="social-icon" /></a>
          <a href="/rss-feed-url"><img src={logoRSS} alt="RSS" className="social-icon" /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="/privacy-policy" className="footer-bottom-link">Política de privacidade</a>
        <a href="/terms-of-use" className="footer-bottom-link">Termos de uso</a>
      </div>
    </footer>
  );
};

export default Footer;
