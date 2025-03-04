import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Streak from '../../components/Streak/Streak';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    console.log("Chamando fetchData...");
    const [data, setData] = useState<string>('');
    const [streakDays, setStreakDays] = useState<number>(0);
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);

    const fetchData = async () => {
        console.log("🚀 fetchData foi chamado!");
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:3000/api/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
    
                console.log("✅ Resposta do backend:", response.data);
    
                setData(response.data.message);
                setStreakDays(response.data.stats?.currentStreak || 0);
                setDaysOfWeek(response.data.stats?.daysOfWeek || ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);
            } catch (error) {
                console.error('❌ Erro ao buscar dados do dashboard:', error);
            }
        }
    };
    

    useEffect(() => {
        console.log("🔄 useEffect foi chamado!");
        fetchData();
    }, []); 

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <h1 className='dashboard-title'>Dashboard</h1>
                <p>{data}</p>
                <Streak streakDays={streakDays} daysOfWeek={daysOfWeek} />
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
