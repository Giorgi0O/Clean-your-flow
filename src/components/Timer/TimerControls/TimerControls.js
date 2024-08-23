import '../Timer.css';
import './TimerControls.css'
import React from 'react';
import StopButton from '../../Buttons/StopButton'
import StartButton from '../../Buttons/StartButton'
import CircleButton from '../../Buttons/CircleButton'


function TimerControls({ 
      flowTime,
      restTime,
      longRestTime,
      isActive,
      flow,
      countOfFlow,
      countAllFlow,
      timeRemaning,
      setTimeRemaining,
      setFlowmodoroCount,
      selectedMode,
      setIsActive,
      setFlow,
      setIsRealTime,
      bgPink,
      bgCiano,    
      setBgPink,
      setBgCiano,
      setBgMoving,
      setEndSessionRequest,
      endSession,
      restart,
      autoStart,
      setFlowTotalTime
    }) 
  {


  const next = () => {
    setFlow(!flow);

    var nextTime  = flow ? restTime: flowTime;
    if( (countAllFlow+1) % 4 === 0 && flow ){
      nextTime = longRestTime;
    } 
    setTimeRemaining( nextTime );

    setBgCiano( bgPink );
    setBgPink( bgCiano );
    setBgMoving( 65 / nextTime);
    
    setIsRealTime(false);
  }

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
       
      <p className='default-font count-flow color-ligth-pink'> #{countOfFlow} </p>
      <div className='timer-controls-keys'>

        {
          !endSession &&
            <CircleButton tooltip={'End session'} iconName={'x'} color={'ligth-pink'} 
              operation={() => {
                setEndSessionRequest(true)
                setIsActive(false);
              }} 
            ></CircleButton>
        }
        {
          endSession &&
          (
            <StartButton operation={restart} type={2} ></StartButton>
          )
        }
        {
          !endSession && selectedMode === 2 &&
          (
            !isActive ?
              <StartButton operation={flowmodoroStart} type={3} ></StartButton>
            :
              <>
                <StopButton operation={flowmodoroBreath} type={2} ></StopButton>
                <CircleButton iconName={'pause'} color={'ligth-green'} operation={() => setIsActive(false)} ></CircleButton>
              </>
          )
        }
        {
          !endSession && selectedMode === 1 &&
          (
            !isActive ?
            (
              <StartButton operation={() => setIsActive(!isActive)} type={1} ></StartButton>
            )
            :
            (
              <StopButton operation={() => setIsActive(!isActive)} type={1}></StopButton>
            )
          )
        }
        {
          !endSession && selectedMode === 1 &&
          <CircleButton color={'ligth-pink'} tooltip={'next'} iconName={'next'} operation={next}></CircleButton>
        }
      </div>
    </div>
  );
    
}

export default TimerControls