import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleArticle, patchVotes } from "../api";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

function ArticleById({ user }) {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [articleVotes, setArticleVotes] = useState(0);
  const [voteUpClicked, setVoteUpClicked] = useState(false);
  const [voteDownClicked, setVoteDownClicked] = useState(false);

  const navigate = useNavigate();
  function handleBackClick() {
    navigate("/api/articles");
  }

  function handleVoteUp() {
    setVoteUpClicked(true);
    setVoteDownClicked(false);
    setArticleVotes((current) => {
      return current + 1;
    });
    updateVotes(1);
  }

  function handleVoteDown() {
    setVoteUpClicked(false);
    setVoteDownClicked(true);
    setArticleVotes((current) => {
      return current - 1;
    });
    updateVotes(-1);
  }

  function updateVotes(increment) {
    patchVotes(article_id, increment);
  }

  function fetchSingleArticle() {
    getSingleArticle(article_id).then((articleData) => {
      setSingleArticle(articleData.data);
      setArticleVotes(Number(articleData.data.votes));
    });
  }
  useEffect(fetchSingleArticle, []);
  return (
    <>
      <div className="single-article-card">
        <h2 id="single-article-title">{singleArticle.title}</h2>
        <div className="single-article-author">
          <p>From {singleArticle.author}</p>
          <p id="single-article-votes">Votes: {articleVotes}</p>
        </div>
        <div className="article-vote-up">
          <input
            type="image"
            disabled={voteUpClicked}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/2048px-Green_Arrow_Up.svg.png"
            onClick={handleVoteUp}
          />
        </div>
        <div className="article-vote-down">
          <input
            type="image"
            disabled={voteDownClicked}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png"
            onClick={handleVoteDown}
          />
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
      <Comments article_id={article_id} user={user} />
    </>
  );
}

export default ArticleById;
