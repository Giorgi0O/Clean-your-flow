import '../Timer.css';
import React, { useEffect, useState } from 'react';
import {formatTime} from "../../../utils/Common"


function CountDown({
    timeRemaining,
    restTime,
    longRestTime,
    selectedMode
}) {

    const [color, setColor] = useState('color-dark-ciano');

    useEffect(() => {
        if( selectedMode === 1 ){
            if(timeRemaining/60 > longRestTime){
                setColor('color-dark-pink');
            }
            if( timeRemaining/60 < restTime){
                setColor('color-dark-ciano')
            }
        }
        else{
            if(timeRemaining/60 > 15){
                setColor('color-dark-ciano');
            }
            if( timeRemaining/60 < 15){
                setColor('color-dark-green')
            }
        }
    }, [timeRemaining,restTime,longRestTime,selectedMode]);


    return (
        <div className='time-count-down'>
            <p className={`font-number ${color}`}>{formatTime(timeRemaining)}</p>
        </div>
    );
}

export default CountDown