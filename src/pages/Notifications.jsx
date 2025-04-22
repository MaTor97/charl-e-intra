import { useState } from "react";
import { NotificationSVG } from "../assets/files/SVG";

const Notifications = () => {
    const date = new Date().toLocaleString();

    // Simule une liste de notifications
    const [notifications, setNotifications] = useState([
        { id: 1, date, category: "Bien-être" },
        { id: 2, date, category: "Appels et promotions" },
        { id: 3, date, category: "Ca bouge" },
        { id: 4, date, category: "Bien-être" },
        { id: 5, date, category: "Intramag" },
        { id: 6, date, category: "Notes de services" },
        { id: 7, date, category: "Archives" },
        { id: 8, date, category: "Bien-être" },
    ]);

    const handleDelete = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    return (
        <main id="notificationsContainer">
            <h1>Notifications</h1>
            {notifications.map((notif) => (
                <div className="notification" key={notif.id}>
                    <div id="image">
                        <NotificationSVG />
                    </div>
                    <div className="notificationText">
                        <p className="date">&gt; {notif.date}</p>
                        <p className="content">Nouvel article dans <em>{notif.category}</em></p>
                    </div>
                    <div className="suppr" onClick={() => handleDelete(notif.id)}>x</div>
                </div>
            ))}
        </main>
    );
};

export default Notifications;
