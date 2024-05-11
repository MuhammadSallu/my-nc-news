import { useState, useEffect } from "react";
import { getComments, addComment, deleteComment } from "../api";

function Comments({ article_id, user }) {
  const [commentsByArticleId, setCommentsByArticleId] = useState([]);
  const [isVoteUpClicked, setIsVoteUpClicked] = useState(false);
  const [isVoteDownClicked, setIsVoteDownClicked] = useState(false);
  const [comment, setComment] = useState({ username: user, body: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [postMessage, setPostMessage] = useState("Post");
  let matchingUser = false;

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
    await setPostMessage("Posting...");
    try {
      await addComment(article_id, comment);
      setComment({ body: "" });
      fetchComments();
    } finally {
      await setIsLoading(false);
      await setPostMessage("Post");
      alert("Comment posted!");
    }
  }

  function handleChange(e) {
    setComment({ ...comment, username: user, body: e.target.value });
  }

  async function handleDelete(id) {
    await setIsDeleteLoading(true);
    try {
      await deleteComment(id);
      fetchComments();
    } finally {
      await setIsDeleteLoading(false);
      alert("Comment deleted!");
    }
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
            {postMessage}
          </button>
        </form>
      </div>
      <ul>
        <>
          <p id="comment-count">Comments: {commentsByArticleId.length}</p>
        </>
        {commentsByArticleId.map((comment) => {
          if (comment.author === user) {
            matchingUser = true;
          } else matchingUser = false;
          return (
            <div className="comment-card">
              <li key={comment.comment_id} id="comment-list">
                <div className="comment-center">
                  <h4 id="comment-body">{comment.body}</h4>
                  <p id="comment-user">{comment.author}</p>
                </div>
                <label htmlFor="delete-button" />
                <button
                  id="delete-button"
                  onClick={() => {
                    handleDelete(comment.comment_id);
                  }}
                  hidden={!matchingUser}
                >
                  X
                </button>
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
