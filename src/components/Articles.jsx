import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { getAllArticles } from "../api";

function Articles() {
  const [articles, setArticles] = useState([]);

  function fetchArticles() {
    getAllArticles().then((articlesData) => {
      setArticles(articlesData.data.articles);
    });
  }
  useEffect(fetchArticles, []);
  return (
    <>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Articles;
