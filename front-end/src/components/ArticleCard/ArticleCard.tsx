import React from "react";
import { Link } from "react-router-dom";
import './ArticleCard.css';

interface ArticleCardProps {
    title: string;
    date: string;
    image: string;
    articleId: number;
    alt: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, date, image, articleId }) => {
    return (
        <Link to={`/articles/${articleId}`} className="article-link">
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