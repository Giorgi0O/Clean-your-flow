import React from 'react';
import BStop from '../../shared/BStop'
import BStart from '../../shared/BStart'
import useNotifications from '../../../hooks/useNotifications';

function PControls({
    isActive,
    pomodoroStart,
    pomodoroPause,
}) {

    const notify = useNotifications();

    const handleStart = () => {
        notify.notifyFlowMuted();
        notify.notifyClick();
        pomodoroStart();
    }

    const handlePause = () => {
        notify.notifyFlowMuted();
        notify.notifyClick();
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