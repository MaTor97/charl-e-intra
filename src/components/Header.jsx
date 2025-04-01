import React, { useState, useEffect } from "react";
import logo from "../assets/images/C_logo_black.png";
import { DarkModeSVG, SearchSVG } from "../assets/files/SVG";

const Header = () => {
    const [hidden, setHidden] = useState(false);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setHidden(true);  // Scroll vers le bas → Cacher le header
            } else {
                setHidden(false); // Scroll vers le haut → Réafficher le header
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (  
        <header className={hidden ? "hidden" : ""}>
            <div className="logoMode">
                <img src={logo} alt="Logo" className="logo"/>
                <DarkModeSVG />
            </div>
            <SearchSVG />
        </header>
    );
}

export default Header;
