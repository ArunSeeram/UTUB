import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${query}&key=${API_KEY}`;

    const res = await fetch(URL);
    const json = await res.json();
    setResults(json.items || []);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query]);

  return (
    <div className="feed">
      {results.map((item, index) => (
        <Link
          key={index}
          to={`/video/${item.snippet.categoryId || 0}/${item.id.videoId}`}
          className="card"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />

          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>

          <p>{moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
