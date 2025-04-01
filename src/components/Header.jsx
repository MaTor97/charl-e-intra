import React from "react";
import logo from "../assets/images/C_logo_black.png";
import { DarkModeSVG, SearchSVG } from "../assets/files/SVG";

const Header = () => {
    return (  
        <header>
            <div className="logoMode">
                <img src={logo} alt="Logo" className="logo"/>
                <DarkModeSVG />
            </div>
            <SearchSVG />
        </header>
    );
}

export default Header;
