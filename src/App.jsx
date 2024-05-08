import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Home from "./components/Home";
import ArticleById from "./components/ArticleById";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/articles" element={<Articles />} />
        <Route path="/api/articles/:article_id" element={<ArticleById />} />
      </Routes>
    </>
  );
}

export default App;
