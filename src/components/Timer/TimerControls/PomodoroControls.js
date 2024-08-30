import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import clicksound from '../../../assets/sounds/start-click.wav'
import CircleButton from '../../Buttons/CircleButton';

function PomodoroControls({ 
    isActive,
    endSession,
    pomodoroStart,
    pomodoroPause,
    next,
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

    const handleNext = () => {
        buttonSound.play();
        next();
    }
    

    return (
        <div className='timer-controls-container'>
            <div className='timer-controls-keys'>
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
                {
                    !endSession && 
                    <CircleButton color={'ligth-pink'} tooltip={'next'} iconName={'next'} operation={handleNext}></CircleButton>
                }
            </div>
        </div>
    );
    
}

export default PomodoroControls