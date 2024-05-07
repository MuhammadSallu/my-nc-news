function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <div className="image">
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
    </div>
  );
}

export default ArticleCard;
