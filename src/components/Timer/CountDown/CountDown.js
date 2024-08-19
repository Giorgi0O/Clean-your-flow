import '../Timer.css';
import React, { useEffect, useState } from 'react';
import {formatTime} from "../../../utils/Common"


function CountDown({ timeRemaining, inputTime, bgPink, bgCiano }) {

    const [color, setColor] = useState('color-dark-ciano');

    useEffect(() => {
        if(bgPink > 45){
            setColor('color-dark-pink');
        }
        if( bgCiano > 75){
            setColor('color-dark-ciano')
        }
    }, [bgCiano, bgPink]);


    return (
        <div>
            {
                !inputTime &&
                <p className={`font-number ${color}`}>{formatTime(timeRemaining)}</p>
            }
        </div>
    );
}

export default CountDown