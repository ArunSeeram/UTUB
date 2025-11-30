import React from 'react'
import './navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/Utub-logo.jpg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/user_profile.jpg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThemeContext } from '../../ThemeContext'
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";
import  { useContext } from "react";


const Navbar = ({setSidebar}) => {


  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search/${search}`);
    }
  };


  return (
  <>
    
    

    
    <nav className="flex-dev">

      <div className="nav-left flex-dev">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => !prev)}
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo" src={logo} alt="menu icon" />
        </Link>
        <h1>UTUB PLAY</h1>
      </div>

      <div className="nav-middle">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <img
            src={search_icon}
            onClick={() => navigate(`/search/${search}`)}
          />
        </div>
      </div>

      <div className="nav-right flex-dev">

        <img
          src={theme === "light" ? moon : sun}
          onClick={toggleTheme}
          className="theme-icon"
          alt="theme toggle"
        />

        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />

      </div>
    </nav>
  </>
);

}

export default Navbar