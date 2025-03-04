import React from "react";
import { Link } from "react-router-dom";
import './ArticleCard.css';
import axios from 'axios';

interface ArticleCardProps {
    title: string;
    date: string;
    image: string;
    articleId: number;
    alt: string;
    refreshStreak: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, date, image, articleId, refreshStreak }) => {
    const handleArticleClick = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.post('http://localhost:3000/api/record-article-read', { articleId }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                refreshStreak(); // Atualiza o streak após registrar a leitura do artigo
            } catch (error) {
                console.error("Error recording article read:", error);
            }
        }
    };

    return (
        <Link to={`/articles/${articleId}`} className="article-link" onClick={handleArticleClick}>
            <div className="article-card">
                <img src={image} className="article-image" alt={title} />
                <div className="article-info">
                    <h2 className="article-title">{title}</h2>
                    <p className="article-date">{date}</p>
                </div>
            </div>
        </Link>
    );
}

export default ArticleCard;
