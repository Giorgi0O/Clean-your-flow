import React from 'react';
import BStop from '../../Common/BStop'
import BStart from '../../Common/BStart'
import { playSound } from '../../../utils/common';

function PControls({
    isActive,
    pomodoroStart,
    pomodoroPause,
}) {
    const handleStart = () => {
        playSound('click');
        pomodoroStart();
    }

    const handlePause = () => {
        playSound('click');
        pomodoroPause();
    }

    return (
        <div className='w-5/6 text-center'>
            {
                !isActive ?
                    (
                        <BStart
                            operation={handleStart}
                            type={1}
                        />
                    )
                    :
                    (
                        <BStop
                            operation={handlePause}
                            type={1}
                        />
                    )
            }
        </div>
    );

}

export default PControls