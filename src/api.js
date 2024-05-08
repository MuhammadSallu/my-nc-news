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
