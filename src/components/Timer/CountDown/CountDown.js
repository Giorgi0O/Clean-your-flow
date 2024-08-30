import '../Timer.css';
import React, { useEffect, useState } from 'react';
import {formatTime} from "../../../utils/Common"


function CountDown({
    timeRemaining,
    bgRigth,
    bgLeft,
    selectedMode
}) {

    const [color, setColor] = useState('');

    useEffect(() => {
        if( selectedMode === 1 ){
            if( bgRigth > 50 ) setColor('color-dark-ciano');
            if( bgLeft > 50 ) setColor('color-dark-pink');
        }
        else{
            setColor('color-dark-green');
        }
    }, [timeRemaining,selectedMode,bgLeft, bgRigth]);


    return (
        <div className='time-count-down'>
            <p className={`font-number ${color}`}>{formatTime(timeRemaining)}</p>
        </div>
    );
}

export default CountDown