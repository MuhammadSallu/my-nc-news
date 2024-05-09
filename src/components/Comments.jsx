import { useState, useEffect } from "react";
import { getComments } from "../api";

function Comments({ article_id }) {
  const [commentsByArticleId, setCommentsByArticleId] = useState([]);
  const [isVoteUpClicked, setIsVoteUpClicked] = useState(false);
  const [isVoteDownClicked, setIsVoteDownClicked] = useState(false);
  const [votes, setVotes] = useState(0);

  function fetchComments() {
    getComments(article_id).then((comments) => {
      setCommentsByArticleId(comments.data.comments);
    });
  }

  function handleVoteUp() {
    setIsVoteUpClicked(true);
    setIsVoteDownClicked(false);
  }

  function handleVoteDown() {
    setIsVoteUpClicked(false);
    setIsVoteDownClicked(true);
  }

  useEffect(fetchComments, []);

  return (
    <>
      <ul>
        {commentsByArticleId.map((comment) => {
          return (
            <div className="comment-card">
              <li id="comment-list" key={comment.comment_id}>
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
