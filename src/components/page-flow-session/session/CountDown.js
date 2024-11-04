import React, { useEffect, useState } from 'react';
import { formatTime } from '../../../utils/utils';


function CountDown({
    timeRemaining,
    flow,
    selectedMode
}) {

    const [color, setColor] = useState('');

    useEffect(() => {
        if (!flow) {
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
    }, [timeRemaining, selectedMode, flow]);


    return (
        <p className={`font-number font-bold md:text-9xl text-8xl ${color} `}>{formatTime(timeRemaining)}</p>
    );
}

export default CountDown