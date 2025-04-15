
import { useEffect } from "react";
import { ArrowLeftSVG, NotificationSVG, AccountSVG, DarkModeSVG, LightModeSVG } from "../assets/files/SVG";

const Footer = ({ bodyMode, toggleMode, goBack, navigate, selected, setSelected }) => {


    const handleNavigation = (endpoint) => {
        setSelected(endpoint);
        navigate(endpoint);
    }

    return (
        <footer>
            <div className="cont" onClick={goBack}>
                <ArrowLeftSVG />
                <p>Retour</p>
            </div>

            {bodyMode === "light" ? 
                <div onClick={toggleMode} style={{ cursor: "pointer" }} className="cont">
                    <DarkModeSVG />
                    <p>Mode nuit</p>
                </div>
                : 
                <div onClick={toggleMode} style={{ cursor: "pointer" }} className="cont">
                    <LightModeSVG />
                    <p>Mode jour</p>
                </div>
            }

            <div className={selected === '/Notifications' ? 'selected' : "cont"} onClick={() => handleNavigation('/Notifications')}>
                <NotificationSVG />
                <p>Notifications</p>
            </div>

            <div className={selected === '/Account' ? 'selected' : "cont"} onClick={() => handleNavigation('/Account')}>
                <AccountSVG />
                <p>Compte</p>
            </div>
        </footer>
    );
}

export default Footer;
