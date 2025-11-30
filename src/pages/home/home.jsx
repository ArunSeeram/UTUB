import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/Feed/Feed.jsx';
import { useState } from "react";
 





const Home = ({ sidebar }) => {

    const [category, setCategory] = useState(0);

  return (
    <div className="home-container">
        <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
        <div className="home-content">
           <div className={`container ${sidebar?"":'large-container'}`}>
            <Feed category={category} />
           </div>
        </div>
    </div>
  )
}

export default Home
