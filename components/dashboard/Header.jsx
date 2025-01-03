import React from 'react';
import { FaClock } from 'react-icons/fa';

const Header = ({ currentTime }) => {
    return (
        <header>
            <h1>Doctor Dashboard</h1>
            <div className="current-time">
                <FaClock /> {currentTime}
            </div>
        </header>
    );
};

export default Header;