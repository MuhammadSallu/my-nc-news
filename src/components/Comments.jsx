import { useState, useEffect } from "react";
import { getComments, addComment } from "../api";

function Comments({ article_id, user }) {
  const [commentsByArticleId, setCommentsByArticleId] = useState([]);
  const [isVoteUpClicked, setIsVoteUpClicked] = useState(false);
  const [isVoteDownClicked, setIsVoteDownClicked] = useState(false);
  const [comment, setComment] = useState({ username: user, body: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Post");

  function fetchComments() {
    setIsLoading(true);
    getComments(article_id).then((comments) => {
      setCommentsByArticleId(comments.data.comments);
    });
    setIsLoading(false);
  }

  function handleVoteUp() {
    setIsVoteUpClicked(true);
    setIsVoteDownClicked(false);
  }

  function handleVoteDown() {
    setIsVoteUpClicked(false);
    setIsVoteDownClicked(true);
  }

  async function handlePost(e) {
    e.preventDefault();
    await setIsLoading(true);
    await setMessage("Posting...");
    try {
      await addComment(article_id, comment);
      setComment({ body: "" });
      fetchComments();
    } finally {
      await setIsLoading(false);
      await setMessage("Post");
    }
  }

  function handleChange(e) {
    setComment({ ...comment, username: user, body: e.target.value });
  }

  useEffect(fetchComments, [comment]);

  return (
    <>
      <div>
        <form onSubmit={handlePost}>
          <label htmlFor="comment-text" />
          <textarea
            name="postComment"
            id="comment-text"
            rows="3"
            value={comment.body}
            placeholder="Post your comment!"
            onChange={handleChange}
            disabled={isLoading}
          />
          <label htmlFor="comment-button" />
          <button type="submit" id="comment-button" disabled={isLoading}>
            {message}
          </button>
        </form>
      </div>
      <ul>
        {commentsByArticleId.map((comment) => {
          return (
            <div className="comment-card">
              <li key={comment.comment_id} id="comment-list">
                <div className="comment-center">
                  <h4 id="comment-body">{comment.body}</h4>
                  <p id="comment-user">{comment.author}</p>
                </div>
                <p id="comment-votes">{comment.votes}</p>
                <div className="vote-up">
                  <img
                    disabled={isVoteUpClicked}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Green_Arrow_Up.svg/2048px-Green_Arrow_Up.svg.png"
                    onClick={handleVoteUp}
                  />
                </div>
                <div className="vote-down">
                  <img
                    disabled={isVoteDownClicked}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Red_Arrow_Down.svg/1200px-Red_Arrow_Down.svg.png"
                    onClick={handleVoteDown}
                  />
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default Comments;
