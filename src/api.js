import axios from "axios";

export function getAllArticles() {
  return axios.get("https://my-nc-news-m78t.onrender.com/api/articles");
}

export function getSingleArticle(article_id) {
  return axios.get(
    `https://my-nc-news-m78t.onrender.com/api/articles/${article_id}`
  );
}

export function getComments(article_id) {
  return axios.get(
    `https://my-nc-news-m78t.onrender.com/api/articles/${article_id}/comments`
  );
}

export function patchVotes(article_id, increment) {
  return axios.patch(
    `http://my-nc-news-m78t.onrender.com/api/articles/${article_id}`,
    { inc_votes: `${increment}` }
  );
}

export async function addComment(article_id, comment) {
  return await axios.post(
    `https://my-nc-news-m78t.onrender.com/api/articles/${article_id}/comments`,
    comment
  );
}

export async function deleteComment(id) {
  return await axios.delete(
    `https://my-nc-news-m78t.onrender.com/api/comments/${id}`
  );
}

export function getTopics() {
  return axios.get("https://my-nc-news-m78t.onrender.com/api/topics");
}

export function getArticlesByTopics(topic) {
  return axios.get(
    `https://my-nc-news-m78t.onrender.com/api/articles?topic=${topic}`
  );
}
