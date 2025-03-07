import React from "react";
import "./Ranking.css";

interface RankingProps {
  rankingData: { name: string; streak: number; articlesRead: number }[];
}

const Ranking: React.FC<RankingProps> = ({ rankingData }) => {
  return (
    <div className="ranking-container">
      <h2 className="ranking-title">Ranking</h2>
      {rankingData?.length > 0 ? (
        <ul className="ranking-list">
          {rankingData.map((user, index) => (
            <li className="ranking-list-element" key={index}>{user.name} - Streak: {user.streak} - Artigos lidos: {user.articlesRead}</li>
          ))}
        </ul>
      ) : (
        <p className="ranking-paragraph">Nenhum dado disponível.</p>
      )}
    </div>
  );
};

export default Ranking;
