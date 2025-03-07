import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './Graphics.css'

interface UserEngagementData {
  name: string;
  streakTotal: number;
  articlesRead: number;
}

interface GraphicsProps {
  engagementData: UserEngagementData[];
}

const Graphics: React.FC<GraphicsProps> = ({ engagementData }) => {
  if (!engagementData.length) {
    return <p>📉 Nenhum dado disponível</p>;
  }

  return (
    <div className="graphics-container">
      <h2 className="graphics-title ">Streak Total por Usuário</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={engagementData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="streakTotal" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="graphics-title ">Artigos Lidos por Usuário</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={engagementData}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="articlesRead" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphics;
