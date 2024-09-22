import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import clicksound from '../../../assets/sounds/start-click.wav'

function PomodoroControls({ 
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
                    <StartButton
                        operation={handleStart} 
                        type={1}
                    />
                )
                :
                (
                    <StopButton 
                        operation={handlePause}
                        type={1}></StopButton>
                )
            }
        </div>
    );
    
}

export default PomodoroControls