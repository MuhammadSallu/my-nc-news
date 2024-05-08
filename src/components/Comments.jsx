import { useState, useEffect } from "react";
import { getComments } from "../api";

function Comments({ article_id }) {
  const [commentsByArticleId, setCommentsByArticleId] = useState([]);

  function fetchComments() {
    getComments(article_id).then((comments) => {
      const element = comments.comments;
      setCommentsByArticleId(comments.data.comments);
      console.log(article_id);
    });
  }
  useEffect(fetchComments, []);

  return (
    <>
      <ul>
        {commentsByArticleId.map((comment) => {
          return (
            <div className="comment-card">
              <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p id="comment-user">{comment.author}</p>
                <p id="comment-votes">{comment.votes}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default Comments;
