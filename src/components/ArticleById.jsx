import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleArticle } from "../api";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

function ArticleById() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const navigate = useNavigate();

  function handleBackClick() {
    navigate("/api/articles");
  }

  function fetchSingleArticle() {
    getSingleArticle(article_id).then((articleData) => {
      setSingleArticle(articleData.data);
    });
  }
  useEffect(fetchSingleArticle, []);
  return (
    <>
      <div className="single-article-card">
        <h2 id="single-article-title">{singleArticle.title}</h2>
        <div className="single-article-author">
          <p>From {singleArticle.author}</p>
          <p id="single-article-votes">Votes: {singleArticle.votes}</p>
        </div>
        <div className="single-article-image">
          <img src={singleArticle.article_img_url} />
        </div>
        <div className="single-article-body">
          <p>{singleArticle.body}</p>
        </div>
        <p>Comments: {singleArticle.comment_count}</p>
        <button onClick={handleBackClick}>Back to Articles</button>
      </div>
      <Comments article_id={article_id} />
    </>
  );
}

export default ArticleById;
