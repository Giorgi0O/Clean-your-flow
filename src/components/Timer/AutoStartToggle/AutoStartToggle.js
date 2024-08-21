import './AutoStartToogle.css';
import React from 'react';


function AutoStartToggle({ autoStart, setAutoStart }) {

    return (
        <label className="switch">
            <input type="checkbox" onChange={() => setAutoStart(!autoStart)} />
            <span className="slider" />
        </label>
    );
}

export default AutoStartToggle