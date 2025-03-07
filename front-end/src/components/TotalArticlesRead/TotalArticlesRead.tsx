//TotalArticlesRead
import React from "react";
import logo from "../../assets/img/logo.png"

import "./TotalArticlesRead.css"

interface TotalArticlesReadProps {
  articlesRead: number;
}

const TotalArticlesRead: React.FC<TotalArticlesReadProps> = ({ articlesRead: articlesRead }) => {
  return (
    <div className="articles-read-container">
      {/* Ícone do mascote (substituir por uma imagem real) */}
      <div className="articles-read-conatiner-img">
        <img
          src={logo} 
          alt="Mascot"
          className="articles-read-img"
        />
      </div>

      {/* Número do streak */}
      <h1 className="articles-read-title">{articlesRead}</h1>
      <p className="articles-read-text-top">Total de Artigos Lidos!</p>

      {/* Mensagem motivacional */}
      <div className="articles-read-text">
        <p className="articles-read-text-footer">
          Parabéns por ler {articlesRead} artigos no News Streak!
        </p>
      </div>

      {/* Botões de ação */}
      <div className="articles-read-btn">
        <button className="articles-read-btn-share">
          SHARE
        </button>
        <button className="articles-read-btn-continue">CONTINUE</button>
      </div>
    </div>
  );
};

export default TotalArticlesRead;
