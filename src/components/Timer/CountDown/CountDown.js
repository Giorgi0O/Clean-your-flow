import '../Timer.css';
import React from 'react';
import {formatTime} from "../../../utils/Common"


function CountDown({ timeRemaining, inputTime, setInputTime, isActive }) {

    return (
        <div>
            {
                !inputTime &&
                <p className='font-number'>{formatTime(timeRemaining)}</p>
            }
        </div>
    );
}

export default CountDown