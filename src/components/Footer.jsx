import React from "react";
import { ArrowLeftSVG } from "../assets/files/SVG";
import { NotificationSVG } from "../assets/files/SVG";
import { InfoMenuSVG } from "../assets/files/SVG";

const Footer = () => {
    return (
        <footer>
            <div className="cont">
                <ArrowLeftSVG />
            </div>
            <div className="cont">
                <NotificationSVG /> 
            </div>
            <div className="cont">
                <InfoMenuSVG />
            </div>
        </footer>
    );
}

export default Footer;