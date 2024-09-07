import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import startFlowAudio from '../../../assets/sounds/start-click.wav'


function FlowmodoroControls({ 
    isActive,
    flow,
    flowmodoroStart,
    flowmodoroBreath,
    flowmodoroPause,

  }) 
{

  const buttonSound = new Audio(startFlowAudio);

  const handleStart = () => {
    buttonSound.play();
    flowmodoroStart();
  }

  const handleBreath = () => {
    buttonSound.play();
    flowmodoroBreath();
  }

  const handlePause = () => {
    buttonSound.play();
    flowmodoroPause();
  }

  return (
    <div className='timer-controls-container'>
      <div className='timer-controls-keys'>
        {
          !isActive ?
            <StartButton operation={handleStart} type={3} ></StartButton>
          :
          (
            (
              flow ?            
              <>             
                <StopButton operation={handleBreath} type={2} ></StopButton>
              </>
              :
              <>
                <StopButton operation={handlePause} type={1} ></StopButton>
              </>
            )
          )
        }
      </div>
    </div>
  );
    
}

export default FlowmodoroControls