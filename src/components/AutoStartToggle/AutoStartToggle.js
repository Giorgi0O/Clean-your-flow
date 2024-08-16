import '../Timer/Timer.css';
import React from 'react';


function AutoStartToggle({ autoStart, setAutoStart }) {

    return (
        <button className={autoStart ? 'auto-start-on' : 'auto-start-off'} onClick={() => setAutoStart(!autoStart)}>
            <span> Autostart: {autoStart ? 'on' : 'off'}</span>
        </button>
    );
}

export default AutoStartToggle