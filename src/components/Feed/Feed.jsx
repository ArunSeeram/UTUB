import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";




const Feed = ({ category }) => {
  const [data, setData] = useState([]);
   const [slideIndex, setSlideIndex] = useState(0);

  const fetchData = async () => {
    const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;

    const res = await fetch(videoListUrl);
    const json = await res.json();

    setData(Array.isArray(json.items) ? json.items : []);
  };

    useEffect(() => {
  if (!data || data.length === 0) {
    setSlideIndex(0);
    return;
  }

  const slideTimer = setInterval(() => {
    setSlideIndex(prev => (prev + 1) % data.length);
  }, 10000);

  return () => clearInterval(slideTimer);
}, [data]); 






  useEffect(() => {
    fetchData();
  }, [category]);

  return (
  <div>

    
    <div className="top-slider-container">
        <div
          className="top-slider-track"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {data.map((item, index) => (
            <Link key={index} to={`/video/${item.snippet.categoryId}/${item.id}`} className="slider-card">
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <p>{item.snippet.title.slice(0, 40)}...</p>
            </Link>
          ))}
        </div>
      </div>

    
    <div className="feed">
      {data.map((item, index) => (
        <Link
          key={index}
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          className="card"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />

          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>

          <p>
            {value_converter(item.statistics.viewCount)} views •{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>

  </div>
);

};

export default Feed;
