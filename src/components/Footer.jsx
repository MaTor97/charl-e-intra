import React from "react";
import { ArrowLeftSVG, NotificationSVG, InfoMenuSVG, DarkArrowLeftSVG, DarkNotificationSVG, DarkInfoMenuSVG } from "../assets/files/SVG";


const Footer = ({ bodyMode }) => {
    return (
        <footer>
            <div className="cont">
                {bodyMode === "light" ? 
                  <ArrowLeftSVG />
                : <DarkArrowLeftSVG />}
            </div>
            <div className="cont">
            {bodyMode === "light" ? 
                  <NotificationSVG />
                : <DarkNotificationSVG />}
            </div>
            <div className="cont">
            {bodyMode === "light" ? 
                  <InfoMenuSVG />
                : <DarkInfoMenuSVG />}
            </div>
        </footer>
    );
}

export default Footer;