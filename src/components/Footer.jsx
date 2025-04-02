import { ArrowLeftSVG, NotificationSVG, InfoMenuSVG, DarkModeSVG, LightModeSVG } from "../assets/files/SVG";


const Footer = ({ bodyMode, toggleMode }) => {
    return (
        <footer>
            <div className="cont">
                  <ArrowLeftSVG />
                  <p>Retour</p>
            </div>
            {bodyMode === "light" ? 
                  <div onClick={toggleMode} style={{ cursor: "pointer" }} className="cont">
                        <DarkModeSVG />
                        <p>Mode nuit</p>
                  </div>
            :     <div onClick={toggleMode} style={{ cursor: "pointer" }} className="cont">
                        <LightModeSVG />
                        <p>Mode jour</p>
                  </div>}
            <div className="cont">
                  <NotificationSVG />
                  <p>Notifications</p>
            </div>
            <div className="cont">
                  <InfoMenuSVG />
                  <p>Aide</p>
            </div>
        </footer>
    );
}

export default Footer;