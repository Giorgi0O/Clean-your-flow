import '../Timer/Timer.css';
import React from 'react';
import {formatTime} from "../../utils/Common"


function CountDown({ timeRemaining, inputTime, setInputTime, isActive }) {

    return (
        <div className='count-down'>
            {
                !inputTime &&
                <p>{formatTime(timeRemaining)}</p>
            }
        </div>
    );
}

export default CountDown