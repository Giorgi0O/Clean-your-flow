import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import startFlowAudio from '../../../assets/sounds/start-click.wav'

function PomodoroControls({ 
    isActive,
    setIsActive,
  }) 
{

    const buttonSound = new Audio(startFlowAudio);
    

    return (
        <div className='timer-controls-container'>
            <div className='timer-controls-keys'>
                {
                    !isActive ?
                    (
                        <StartButton
                            operation={() => {
                                setIsActive(!isActive);
                                buttonSound.play();
                            }} 
                            type={1}
                        />
                    )
                    :
                    (
                        <StopButton 
                            operation={() => {
                                setIsActive(!isActive)
                                buttonSound.play();
                            }}
                            type={1}></StopButton>
                    )
                }
            </div>
        </div>
    );
    
}

export default PomodoroControls