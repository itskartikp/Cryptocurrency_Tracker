import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import "./News.css";

const { Meta } = Card;

// npx create-react-app appname
// npm i antd
// npm i axios

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=cryptocurrency&from=2023-04-04&sortBy=publishedAt&apiKey=bd6a67d58958405f87cea77eb1c60af3"
      );
      setNews(response.data.articles);
    };
    loadNews();
  }, []);

  console.log("news", news);

  return (
    <div className="App">
          
      {news &&
        news.map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              className="carddet"
              style={{ width: "50%" }}
              cover={<img alt="Image not found" src={item.urlToImage} />}
            >
              <Meta title={item.title} description={item.content} />
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" style={{ marginTop: "10px" }}>
                  Read More
                </Button>
              </a>
            </Card>
          );
        })}
    </div>
  );
}

export default News;