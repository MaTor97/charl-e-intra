import React, { useState, useEffect, useRef } from "react";

const Nav = () => {
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
        <nav className={hidden ? "hidden" : ""}>
            <ul>
                <li>NEWS</li>
                <li>APPELS ET PROMOTIONS</li>
                <li>INTRAMAG</li>
                <li>ARCHIVES</li>
                <li>CHARLEROI HD</li>
                <li>NOTES DE SERVICE</li>
                <li>REVUES DE PRESSE</li>
                <li>DIVERS</li>
            </ul>
        </nav>
    );
}

export default Nav;
