import React from 'react'
import './video.css'
import PlayVideo from '../../../components/PlayVideo/PlayVideo'
import Recommende from '../../../components/Recommended/Recommende'
import { useParams } from "react-router-dom";

const Video = () => {

    const {videoId,categoryId} = useParams();

  return (
    <div className='play-container'>
        <PlayVideo  videoId={videoId}/>
        <Recommende categoryId={categoryId}/>
    </div>
  )
}

export default Video 