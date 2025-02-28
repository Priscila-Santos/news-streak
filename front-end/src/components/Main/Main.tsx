import React from 'react';
import logoMain from '../../assets/img/logo.png';
import './Main.css';


const Main: React.FC = () => {
  return (
    <div className="newsletter">
      <img src={logoMain} alt="Logo" className="newsletter-icon" />
      <h2 className="newsletter-title">News Streak</h2>
      <p className="newsletter-subtitle">
        tudo que você precisa saber pra começar seu dia bem e informado.
      </p>
      <input
        type="text"
        placeholder="pesquise por artigos"
        className="newsletter-input"
      />
      <button className="newsletter-button">Pesquisar</button>
    </div>
  );
}

export default Main;
