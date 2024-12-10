import React from 'react';
import './Announcements.css';
import announcementIcon from '../../assets/LastReports/announcement.svg';
import Bullet from '../../assets/LastReports/tribullet.svg'; 

const announcements = [
    "Biweekly maintenance window is scheduled for 4 hours every other Sunday from 1:00 AM to 4:00 AM GMT.",
    "InceptiveBI is currently undergoing a major facelift! Stay tuned for a host of new features and enhancements. We encourage you to interact with the bot and explore these updates. Your feedback and questions are more than welcome!"
];

const Announcements = () => {
    return (
        <div className="announcements-container">
            <h2 className="announcements-title">
                <img src={announcementIcon} alt="Announcement Icon" className="announcement-icon" />
                <p>Announcements</p>
            </h2>
            <ul className="announcements-list">
                {announcements.map((announcement, index) => (
                    <li key={index} className="announcement-item">
                        <img src={Bullet} alt="Bullet Icon" className="bullet-icon" />
                        <span>{announcement}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Announcements;
