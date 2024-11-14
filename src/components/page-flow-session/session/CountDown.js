import React, { useEffect, useState } from 'react';
import { formatTime } from '../../../utils/utils';


function CountDown({
    timeRemaining,
    isflow,
    selectedMode
}) {

    const [color, setColor] = useState('');

    useEffect(() => {
        if (!isflow) {
            setColor('text-rosa-dark')
            return;
        }
        if (selectedMode === 1) {
            setColor('text-ciano-dark');
            return;
        }
        if (selectedMode === 2) {
            setColor('text-verde-dark');
            return;
        }
    }, [timeRemaining, selectedMode, isflow]);


    return (
        <p className={`font-number font-bold md:text-9xl text-8xl ${color} `}>{formatTime(timeRemaining)}</p>
    );
}

export default CountDown