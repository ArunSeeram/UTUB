import React, { useEffect } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import moment from 'moment'
import { useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import { useParams } from 'react-router-dom'

const PlayVideo = ({ videoId }) => {

    


  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]); // FIXED


  const fetchVideoData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    setApiData(data.items?.[0] || null);
  };

  const fetchOtherData = async () => {
    if (!apiData) return;

    // CHANNEL DATA
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const chRes = await fetch(channel_url);
    const chData = await chRes.json();
    setChannelData(chData.items?.[0] || null);

    // COMMENTS
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;
    const cRes = await fetch(comment_url);
    const cData = await cRes.json();
    setCommentData(Array.isArray(cData.items) ? cData.items : []);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

 

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* VIDEO TITLE */}
      <h3>{apiData ? apiData.snippet.title : "Loading Title..."}</h3>

      {/* VIDEO INFO */}
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "0"} views
          &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>

        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </span>
          <span>
            <img src={dislike} alt="" /> 5
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* CHANNEL DATA */}
      <div className="publisher">
        <img
          src={
            channelData
              ? channelData.snippet.thumbnails.default.url
              : user_profile
          }
          alt=""
        />

        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "0"}{" "}
            Subscribers
          </span>
        </div>

        <button>Subscribe</button>
      </div>

      {/* DESCRIPTION */}
      <div className="vid-desc">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>

        <hr />

        {/* COMMENT COUNT */}
        <h4>
          {apiData
            ? value_converter(apiData.statistics.commentCount)
            : 0}{" "}
          Comments
        </h4>

        {/* COMMENTS */}
        {Array.isArray(commentData) &&
          commentData.map((item, index) => (
            <div key={index} className="comments">
              <img
                src={
                  item.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt=""/>
              

              <div>
                <h3>
                  {
                    item.snippet.topLevelComment.snippet
                      .authorDisplayName
                  }{" "}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>

                <p>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                </p>

                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayVideo;
