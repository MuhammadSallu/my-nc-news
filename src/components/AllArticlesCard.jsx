import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState("");

  function handleOnClick(event) {
    setArticleId(article.article_id);
    navigate(`/api/articles/${articleId}`);
  }

  return (
    <div className="article-card" onClick={handleOnClick}>
      <div className="articles-image">
        <img src={article.article_img_url} />
      </div>
      <div className="article-title">
        <h2>{article.title}</h2>
      </div>
      <div className="article-info">
        <p id="article-author">Author: {article.author}</p>
        <p id="article-votes">Votes: {article.votes}</p>
        <p id="article-comments">Comments: {article.comment_count}</p>
      </div>
      <div className="article-id">{article.article_id}</div>
    </div>
  );
}

export default ArticleCard;
