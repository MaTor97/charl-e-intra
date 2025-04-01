import React from "react"
import logo from "../assets/images/C_logo_black.png"
import Darklogo from "../assets/images/C_logo_white.png"
import { DarkModeSVG, LightModeSVG, SearchSVG, DarkSearchSVG } from "../assets/files/SVG"

const Header = ({ bodyMode, toggleMode }) => {
  return (
    <header>
      <div className="logoMode">
        {bodyMode === "light" ? 
          <img src={logo} alt="Logo" className="logo" />
        : <img src={Darklogo} alt="Logo" className="logo" />}
        <div onClick={toggleMode} style={{ cursor: "pointer" }} className="toggleMode">
          {bodyMode === "light" ? <DarkModeSVG /> : <LightModeSVG />}
        </div>
      </div>
      {bodyMode === "light" ? 
          <SearchSVG />
        : <DarkSearchSVG />}
    </header>
  )
}

export default Header
