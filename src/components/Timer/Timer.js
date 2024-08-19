import './Timer.css';
import React, {useState,useEffect} from 'react';
import CountDown from './CountDown/CountDown';
import TimerControls from './TimerControls/TimerControls';


function Timer( { bgPink, bgCiano, setBgPink, setBgCiano }) {


  const [flowTime, setFlowTime] = useState(25*60);
  const [restTime, setRestTime] = useState(5*60);
  const [longRestTime, setLongRestTime] = useState(15*60);
  
  //start
  const [bgMoving, setBgMoving] = useState(60 / flowTime );

  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(flowTime);
  const [flow, setFlow] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [countOfFlow, setCountOfFlow] = useState(0);
  const [countAllFlow, setCountAllFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(0);
  const [isLongRest, setIsLongRest] = useState(false);


  const unused = () =>{
    setFlowTime(10);
    setRestTime(10);
    setLongRestTime(10);
    setAutoStart(false);
  }

  useEffect(() => {

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateBackgrounds = (isFlow, bgMoving) => {
      setBgCiano(prev => clampValue(prev + (isFlow ? -bgMoving : bgMoving), 15, 100));
      setBgPink(prev => clampValue(prev + (isFlow ? bgMoving : -bgMoving), 15, 100));
    };
  
    if( isActive ){
      const interval = setInterval(() => {
        setTimeRemaining( (secondsLeft) => {
          if(secondsLeft === 0){
            
            setFlow(!flow);
            setIsRealTime(true);

            var nextTime  = flow ? restTime: flowTime;

            if( (countAllFlow+1)%4 === 0 && flow ){
              nextTime = longRestTime;
            } 
            if( !autoStart ){
              setIsActive(false);
            }

            setBgMoving( 65 / nextTime);
            
            return nextTime;
          }
          else{
            //modifico la dimensione del background
            if (flow) {
              updateBackgrounds(true, bgMoving);
            } else {
              updateBackgrounds(false, bgMoving);
            }

            return secondsLeft -1;
          }
        });
      }, 1000)
      
      return () => clearInterval(interval);
    }
  }, [isActive,flowTime, restTime, autoStart,flow, timeRemaining, isLongRest,longRestTime, bgMoving, countAllFlow ,setBgCiano, setBgPink]); 

  useEffect(() => {
    if (!flow ) {
        setCountAllFlow((prev) => {
            setIsLongRest( (prev+1)%4 === 0 ? true : false );

            return prev + 1
        });

        if( isRealTime ){
            setCountOfFlow((prev) => prev + 1);
        }
    }
  }, [flow, isRealTime]);


  return (
    <div className={ 'timer' } >
        <div className='timer-center'>
          <CountDown 
              timeRemaining = {timeRemaining}
              bgCiano={bgCiano}
              bgPink={bgPink}
          />
        </div>
        <TimerControls 
            flowTime={flowTime}
            restTime={restTime}
            longRestTime={longRestTime}
            isActive={isActive}
            flow={flow}
            countOfFlow={countOfFlow}
            countAllFlow={countAllFlow}
            setTimeRemaining={setTimeRemaining}
            setIsActive={setIsActive}
            setFlow={setFlow}
            setIsRealTime={setIsRealTime}
            bgCiano={bgCiano}
            bgPink={bgPink}
            setBgMoving={setBgMoving}
            setBgCiano={setBgCiano}
            setBgPink={setBgPink}
        />
        <button style={{display: 'none'}} onClick={unused} ></button>
    </div>
  );
}

export default Timer;
