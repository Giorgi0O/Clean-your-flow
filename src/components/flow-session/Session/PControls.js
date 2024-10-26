import React from 'react';
import BStop from '../../shared/BStop'
import BStart from '../../shared/BStart'
import { playSound } from '../../../utils/utils';

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