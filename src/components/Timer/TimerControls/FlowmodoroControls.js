import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import CircleButton from '../../Buttons/CircleButton'
import startFlowAudio from '../../../assets/sounds/start-click.wav'


function FlowmodoroControls({ 
    isActive,
    setIsActive,
    flow,
    setTimerCount,
    timeRemaining,
    setTimeRemaining,
    setCurrentTime,
    handleStart,
    handleBreath,
    interval
  }) 
{

  const buttonSound = new Audio(startFlowAudio);

  const flowmodoroPause = () => {
    buttonSound.play();
    setIsActive(false);
  }

  const flowmodoroStart = () => {
    buttonSound.play();
    setIsActive(true);
    handleStart();
  }

  const flowmodoroStartBreath = () => {
    buttonSound.play();
    setIsActive(false);
    clearInterval(interval);
    setTimerCount(prev => prev +1 );
    setCurrentTime(Math.ceil(timeRemaining/5));
    setTimeRemaining(prev => Math.ceil(prev/5));
    handleBreath();
  }

  return (
    <div className='timer-controls-container'>
      <div className='timer-controls-keys'>
        {
          !isActive ?
            <StartButton operation={flowmodoroStart} type={3} ></StartButton>
          :
          (
            (
              flow ?            
              <>             
                <StopButton operation={flowmodoroStartBreath} type={2} ></StopButton>
                <CircleButton iconName={'pause'} color={'ligth-green'} operation={flowmodoroPause} ></CircleButton>
              </>
              :
              <>
                <StopButton operation={flowmodoroStartBreath} type={1} ></StopButton>
              </>
            )
          )
        }
      </div>
    </div>
  );
    
}

export default FlowmodoroControls