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
            if( bgRigth > 50 ) setColor('text-ciano-dark');
            if( bgLeft > 50 ) setColor('text-rosa-dark');
        }
        else{
            setColor('text-verde-dark');
        }
    }, [timeRemaining,selectedMode,bgLeft, bgRigth]);


    return (
        <p className={`font-number font-bold md:text-9xl text-8xl ${color} `}>{formatTime(timeRemaining)}</p>
    );
}

export default CountDown