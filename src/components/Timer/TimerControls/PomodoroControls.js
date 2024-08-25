import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'


function PomodoroControls({ 
    isActive,
    setIsActive
  }) 
{
    

    return (
        <div className='timer-controls-container'>
        <div className='timer-controls-keys'>
            {
                !isActive ?
                (
                    <StartButton operation={() => setIsActive(!isActive)} type={1} ></StartButton>
                )
                :
                (
                    <StopButton operation={() => setIsActive(!isActive)} type={1}></StopButton>
                )
            }
        </div>
        </div>
    );
    
}

export default PomodoroControls