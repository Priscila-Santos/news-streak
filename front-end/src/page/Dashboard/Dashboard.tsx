import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Streak from '../../components/Streak/Streak';
import Navbar from '../../components/Navbar/Navbar';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<string>('');
    const [streakDays, setStreakDays] = useState<number>(0);
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/api/dashboard', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setData(response.data.message);
                    // Supondo que a resposta contenha os dados dos dias de sequência
                    setStreakDays(response.data.streakDays);
                    setDaysOfWeek(response.data.daysOfWeek);
                } catch (error) {
                    console.error('Error fetching dashboard data:', error);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Dashboard</h1>
            <p>{data}</p>
            <Streak streakDays={streakDays} daysOfWeek={daysOfWeek} />
        </div>
    );
}

export default Dashboard;
