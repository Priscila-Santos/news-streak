import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Graphics from "../../components/Graphics/Graphics";
import Ranking from "../../components/Ranking/Ranking";

import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [rankingData, setRankingData] = useState([]);
  const [engagementData, setEngagementData] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/dashboard/admin", {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("📊 Dados recebidos do backend:", response.data);

          setRankingData(response.data.ranking);

          // Criar os dados para os gráficos a partir do ranking
          interface User {
            name: string;
            streak: number;
            articlesRead: number;
          }

          const engagement = response.data.ranking.map((user: User) => ({
            name: user.name, // Nome do usuário no eixo X
            streakTotal: user.streak, // Streak total
            articlesRead: user.articlesRead, // Artigos lidos
          }));

          setEngagementData(engagement);
        } catch (error) {
          console.error("❌ Erro ao buscar dados administrativos:", error);
        }
      }
    };

    fetchAdminData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="admin-dashboard-container">
        <h1 className="admin-dashboard-title">Painel Administrativo</h1>
        <div className="admin-dashboard-content">
          <div className="admin-dashboard-left">
            <Graphics engagementData={engagementData} />
          </div>
          <div className="admin-dashboard-right">
            <Ranking rankingData={rankingData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
