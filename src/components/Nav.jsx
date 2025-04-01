import React, { useState, useEffect } from "react";

const Nav = () => {
    const [hidden, setHidden] = useState(false);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY = currentScrollY;
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
