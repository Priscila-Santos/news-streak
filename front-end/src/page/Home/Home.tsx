import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Footer from '../../components/Footer/Footer';
import './Home.css';

import imageAricle from '../../assets/img/logo.png';

const articles = [
    { articleId: 1, title: 'Political scene', date: '17/02/2025', image: imageAricle, alt: 'Cena política' },
    { articleId: 2, title: 'Oat flakes', date: '18/02/2025', image: imageAricle, alt: 'Cena política' },
    { articleId: 3, title: 'Person pointing', date: '19/02/2025', image: imageAricle, alt: 'Cena política' }
    // adicione mais artigos conforme necessário
];

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Main />
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article.articleId}
            title={article.title}
            date={article.date}
            image={article.image}
            alt={article.alt}
            articleId={article.articleId}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
