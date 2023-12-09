import React, { useState } from "react";
import lightLogo from "../../assets/lightLogo.png";
import darkLogo from "../../assets/darkLogo.png";
import wallpaper from "../../assets/friendsWallpaper.jpg";
import { FaRegUserCircle, FaSortDown, FaRegLightbulb } from "react-icons/fa";
import "./Header.css";
import { useTheme } from "../../context/ThemeContext";

export default function Header({ user , setUser}) {
  const { theme, changeTheme } = useTheme();
  const [clicked , setClicked] = useState(false)

  const changeClicked = () => {
    setClicked(prev => !prev)
  }

  return (
    <div className="Header" id={theme ? "light-header" : "dark-header"}>
      <img src={theme ? lightLogo : darkLogo} alt="logo" id="logo" />
      <img src={wallpaper} alt="wallpaper" id="wallpaper" />
      <div name="setting" id="setting">
        <div onClick={changeClicked}>
          <FaRegUserCircle /> {user.name} <FaSortDown />
        </div>
        <button onClick={changeTheme} id="mode"><FaRegLightbulb /></button>
      </div>
      {clicked && (
        <div id="setting-container">
          {user.admin && <button>Admin</button>}
          <button onClick={() => {
            setUser({})
            localStorage.removeItem("user")
            window.location.reload()
          }}>LogOut</button>
        </div>
      )}
    </div>
  );
}
