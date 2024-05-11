import { useState, useEffect } from "react";
import ArticleCard from "./AllArticlesCard";
import { getAllArticles, getTopics, getArticlesByTopics } from "../api";
import { useNavigate } from "react-router-dom";

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  function fetchArticles() {
    getAllArticles().then((articlesData) => {
      setArticles(articlesData.data.articles);
    });
    getTopics().then((topicsData) => {
      setTopics(topicsData.data.topics);
    });
  }

  function handleTopicChange(e) {
    const selectedTopic = e.target.value;
    if (selectedTopic === "allArticles") {
      fetchArticles();
      navigate("/api/articles");
    } else {
      getArticlesByTopics(selectedTopic).then((articlesData) => {
        console.log(articlesData.data.articles);
        setArticles(articlesData.data.articles);
        navigate(`/api/articles?topic=${selectedTopic}`);
      });
    }
  }

  useEffect(fetchArticles, []);
  return (
    <>
      <select id="select-topics" onChange={handleTopicChange}>
        <option value="allArticles">All Articles</option>
        {topics.map((topic) => {
          let formattedTopic =
            topic.slug[0].toUpperCase() + topic.slug.slice(1);
          return <option value={topic.slug}>{formattedTopic}</option>;
        })}
      </select>
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
