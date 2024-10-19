
import React from 'react';
import BStop from '../../Common/BStop'
import BStart from '../../Common/BStart'

//file statici
const clicksound = '/sounds/start-click.wav';


function PControls({ 
    isActive,
    pomodoroStart,
    pomodoroPause,
  }) 
{

    const buttonSound = new Audio(clicksound);

    const handleStart = () => {
        buttonSound.play();
        pomodoroStart();
    }

    const handlePause = () => {
        buttonSound.play();
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