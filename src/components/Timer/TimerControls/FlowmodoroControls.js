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
    setFlow,
    timeRemaning,
    setTimeRemaining,
    autoStart,
    setFlowTotalTime
  }) 
{

  const buttonSound = new Audio(startFlowAudio);

  const flowmodoroBreath = () => {
    buttonSound.play();
    setFlow(false);
    setFlowTotalTime( prev => prev + timeRemaning );

    var breathTime = Math.ceil( timeRemaning/5 );

    if( !autoStart ){
      setIsActive(false);
    }

    setTimeRemaining(breathTime);
  }

  const flowmodoroStart = () => {
    buttonSound.play();
    setFlow(true);
    setIsActive(true);
  }

  const flowmodoroStartBreath = () => {
    buttonSound.play();
    setIsActive(true);
  }

  return (
    <div className='timer-controls-container'>
      <div className='timer-controls-keys'>
        {
          !isActive ?
            (
              flow ?
                <StartButton operation={flowmodoroStart} type={3} ></StartButton>
              :
                <StartButton operation={flowmodoroStartBreath} type={3} ></StartButton>
            )
          :
          (
            flow ?
            <>
              <StopButton operation={flowmodoroBreath} type={2} ></StopButton>
              <CircleButton iconName={'pause'} color={'ligth-green'} operation={() => {setIsActive(false); buttonSound.play();}} ></CircleButton>
            </>
            :
            <>
              <StopButton operation={() => {setIsActive(false); buttonSound.play();}} type={1} ></StopButton>
            </>
          )
        }
      </div>
    </div>
  );
    
}

export default FlowmodoroControls