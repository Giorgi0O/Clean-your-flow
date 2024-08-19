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
      setTimeRemaining,
      setIsActive,
      setFlow,
      setIsRealTime,
      bgPink,
      bgCiano,    
      setBgPink,
      setBgCiano,
      setBgMoving 
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

  return (
    <div className='timer-controls-container'>
       
      <p className='default-font count-flow color-ligth-pink'> #{countOfFlow} </p>
      <div className='timer-controls-keys'>

        {
          countAllFlow > 0 &&
          (
            <CircleButton tooltip={'End session'} iconName={'x'} color={'ligth-pink'} operation={() => console.log('ended')} ></CircleButton>
          )
        }
        {
          !isActive ?
          (
            <StartButton operation={() => setIsActive(!isActive)} type={1} ></StartButton>
          )
          :
          (
            <StopButton operation={() => setIsActive(!isActive)}></StopButton>
          )
        }
        {/* <Button text={'cliccami'} iconName={'pause'} color={'ciano'} > </Button> */}
        <CircleButton color={'ligth-pink'} tooltip={'next'} iconName={'next'} operation={next}></CircleButton>
      </div>
    </div>
  );
    
}

export default TimerControls