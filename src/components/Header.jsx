import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/C_logo_black.png";
import { DarkModeSVG, SearchSVG } from "../assets/files/SVG";

const Header = () => {
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0); // Utilisation de useRef

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current + 10) {
                setHidden(true); // Scroll vers le bas
            } else if (currentScrollY < lastScrollY.current - 10) {
                setHidden(false); // Scroll vers le haut
            }

            lastScrollY.current = currentScrollY; // Met à jour la position
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
