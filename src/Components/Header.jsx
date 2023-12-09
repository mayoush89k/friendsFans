import React from "react";
import lightLogo from "../assets/lightLogo.png";
import darkLogo from "../assets/darkLogo.png";
import wallpaper from "../assets/friendsWallpaper.jpg";
import { FaRegUserCircle, FaSortDown } from "react-icons/fa";
import "./style.css";
import { useTheme } from "../context/ThemeContext";

export default function Header({ user }) {
  const { theme , changeTheme } = useTheme();

  return (
    <div className="Header" id={theme ? "light-header" : "dark-header"}>
      <img src={theme ? lightLogo : darkLogo} alt="logo" id="logo" />
      <img src={wallpaper} alt="wallpaper" id="wallpaper" />
      <div name="setting" id="setting">
        <FaRegUserCircle /> {user.name} <FaSortDown />
        <button onClick={changeTheme}>{theme ?'light' :'dark'}</button>
      </div>
    </div>
  );
}
