import React from 'react';
import './Streak.css';

interface StreakProps {
  streakDays: number;
  daysOfWeek: string[];
}

const Streak: React.FC<StreakProps> = ({ streakDays, daysOfWeek }) => {
  return (
    <div className="streak-container">
      <div className="streak-indicator">
        <div className="streak-circle">
          {streakDays}
        </div>
        <div className="flame-icon">🔥</div>
      </div>
      <div className="days-of-week">
        {Array.isArray(daysOfWeek) ? (
          daysOfWeek.map((day, index) => (
            <div key={index} className="day-circle">{day}</div>
          ))
        ) : (
          <p>Carregando dias da semana...</p>
        )}
      </div>
      <h2>{streakDays} dias consecutivos!</h2>
      <p>Você atingiu sua meta diária! Leia todos os dias para manter a sequência.</p>
      <button className="continue-button">CONTINUAR</button>
    </div>
  );
}

export default Streak;
