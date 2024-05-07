import axios from "axios";

export function getAllArticles() {
  return axios.get("https://my-nc-news-m78t.onrender.com/api/articles");
}
