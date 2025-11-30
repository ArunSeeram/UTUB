import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from "react-router-dom";


const Recommende = ({ categoryId }) => {

  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideoUrl = 
      `https://youtube.googleapis.com/youtube/v3/videos?` +
      `part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&` +
      `videoCategoryId=${categoryId}&key=${API_KEY}`;

    const res = await fetch(relatedVideoUrl);
    const data = await res.json();

    setApiData(Array.isArray(data.items) ? data.items : []);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link to ={`/video/${item.snippet.categoryId}/${item.id}`}className="side-video-list" key={index}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />

          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p> {value_converter(item.statistics.viewCount)} Views </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommende;
