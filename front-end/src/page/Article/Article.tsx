import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
// import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Footer from '../../components/Footer/Footer';
import imageAricle from '../../assets/img/logo.png';
import './Article.css';

const articleInfo = [
  {
    title: 'From alert fatigue to AI-driven efficiency: Introducing Edwin AI for IT operations',
    date: 'March 25, 2021',
    content: 'Imagine having a super-intelligent teammate who can anticipate IT problems before they arise, streamline incident management, and provide crystal-clear insights into your IT landscape. This isn’t science fiction—it’s the reality with Edwin AI, LogicMonitor’s newest innovation in AI for IT operations. Edwin AI is designed to revolutionize your IT management, taking the daily grind of alerts and incidents off your plate, so you can finally get back to focusing on strategic projects and drive real business value or even enjoying an uninterrupted round of golf on the course.',
    image: imageAricle,
  }
]

const Article: React.FC = () => {
  return (
    <div className="articles-page">
      <Navbar />
      <main className="main-content">
        {articleInfo.map((article, index) => (
          <div key={index} className='article-container'>
            <h1 className="main-title">{article.title}</h1>
            <div className="content-wrapper">
              <p className="main-description">
                {article.content}
              </p>
              <img src={article.image} alt="imagem do artigo" className="main-image" />
            </div>
          </div>
        ))}

        {/* <h1 className="main-title">From alert fatigue to AI-driven efficiency: Introducing Edwin AI for IT operations</h1>
        )


        <h1 className="main-title">From alert fatigue to AI-driven efficiency: Introducing Edwin AI for IT operations</h1>
        <div className="content-wrapper">
          <p className="main-description">
            Imagine having a super-intelligent teammate who can anticipate IT problems before they arise, streamline incident management, 
            and provide crystal-clear insights into your IT landscape. This isn’t science fiction—it’s the reality with Edwin AI, LogicMonitor’s newest 
            innovation in AI for IT operations. Edwin AI is designed to revolutionize your IT management, taking the daily grind of alerts and incidents off 
            your plate, so you can finally get back to focusing on strategic projects and drive real business value or even enjoying an uninterrupted round 
            of golf on the course.
          </p>
          <img src={imageAricle} alt="imagem do artigo" className="main-image" />
        </div>
        {/* <section className="article-section">
          {articles.map((article) => (
            <ArticleCard
              key={article.articleId}
              title={article.title}
              date={article.date}
              image={article.image.imageAricle}
              alt={article.alt}
              articleId={article.articleId}
            />
          ))}
        </section> */}
      </main>
      <Footer />
    </div>
  );
}

export default Article;
