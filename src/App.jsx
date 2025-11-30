import React, { useState } from 'react'
import Navbar from './components/navbar/navbar.jsx'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Video from './pages/home/video/video.jsx'
import SearchResults from './components/navbar/SearchResults.jsx'


const App = () => {

   const [sidebar, setSidebar] = useState(true)

  return (
    <div>
    <Navbar setSidebar={setSidebar} />
    <Routes>
      <Route path='/' element ={<Home sidebar={sidebar} />} />
      <Route path='/video/:categoryId/:videoId' element={<Video/>} />
      <Route path="/search/:query" element={<SearchResults />} />

    </Routes>
    </div>
  )
}

export default App