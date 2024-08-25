import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import CircleButton from '../../Buttons/CircleButton'


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

  const flowmodoroBreath = () => {
    setFlowTotalTime( prev => prev + timeRemaning );
    const breath = Math.ceil( timeRemaning / 5 );

    setFlow(false);
    setTimeRemaining(breath);
    
    if( !autoStart ){
      setIsActive(false);
    }
  
  }

  const flowmodoroStart = () => {
    if( flow ){
      setTimeRemaining(0);
      setFlow(true);
    }
    setIsActive(true);
  }

  return (
    <div className='timer-controls-container'>
      <div className='timer-controls-keys'>
        {
          !isActive ?
            <StartButton operation={flowmodoroStart} type={3} ></StartButton>
          :
          (
            flow ?
            <>
              <StopButton operation={flowmodoroBreath} type={2} ></StopButton>
              <CircleButton iconName={'pause'} color={'ligth-green'} operation={() => setIsActive(false)} ></CircleButton>
            </>
            :
            <>
              <StopButton operation={() => setIsActive(false)} type={2} ></StopButton>
            </>
          )
        }
      </div>
    </div>
  );
    
}

export default FlowmodoroControls