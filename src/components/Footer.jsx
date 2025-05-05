import { ArrowLeftSVG, NotificationSVG, AccountSVG, DarkModeSVG, LightModeSVG } from "../assets/files/SVG";

// Composant footer, il affiche tous les boutons et recois les fonctions depuis App.jsx
const Footer = ({ bodyMode, toggleMode, goBack, selected, handleNavigation }) => {
    return (
        <footer>
            {/* RETOUR EN ARRIERE */}
            <div className="cont" onClick={goBack}>
                <ArrowLeftSVG />
                <p>Retour</p>
            </div>

            {/* DARK LIGHT MODE */}
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

            {/* NOTIFICATIONS */}
            <div className={selected === '/Notifications' ? 'selected' : "cont"} onClick={() => handleNavigation('/Notifications')}>
                <NotificationSVG />
                <p>Notifications</p>
            </div>

            {/* LOGIN */}
            <div className={selected === '/Account' ? 'selected' : "cont"} onClick={() => handleNavigation('/Account')}>
                <AccountSVG />
                <p>Compte</p>
            </div>
        </footer>
    );
}

export default Footer;
