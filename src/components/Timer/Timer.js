import './Timer.css';
import React, {useState,useEffect} from 'react';
import AutoStartToggle from './AutoStartToggle/AutoStartToggle';
import CountDown from './CountDown/CountDown';
import TimerForm from './TimerForm/TimerForm';
import TimerControls from './TimerControls/TimerControls';


function Timer( { bgPink, bgCiano, setBgPink, setBgCiano }) {


  const [flowTime, setFlowTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [longRestTime, setLongRestTime] = useState(15);
  
  //start
  const [bgMoving, setBgMoving] = useState(60 / flowTime );

  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(flowTime);
  const [flow, setFlow] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [countOfFlow, setCountOfFlow] = useState(0);
  const [countAllFlow, setCountAllFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(0);
  const [inputTime, setInputTime] = useState(false);
  const [isLongRest, setIsLongRest] = useState(false);

  const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateBackgrounds = (isFlow, bgMoving) => {
    setBgCiano(prev => clampValue(prev + (isFlow ? -bgMoving : bgMoving), 15, 100));
    setBgPink(prev => clampValue(prev + (isFlow ? bgMoving : -bgMoving), 15, 100));
  };

  useEffect(() => {
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
  }, [isActive,flowTime, restTime, autoStart,flow, timeRemaining, isLongRest,longRestTime]); 

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

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60);
    const seconds = milliseconds % 60;
  
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };


  return (
    <div className={ 'timer' } >
        {
            countOfFlow !== 0 &&
            <p> tempo di focus : { formatTime(flowTime*countOfFlow) } </p>
        }
        {
            !isActive && !inputTime &&
            <AutoStartToggle 
                autoStart={autoStart}
                setAutoStart={setAutoStart} 
            />
        }
        <CountDown 
            timeRemaining = {timeRemaining}
            inputTime = {inputTime}
            setInputTime = {setInputTime}
            isActive = {isActive}
        />
        { 
            inputTime ?
            (
                <TimerForm
                    flowTime = {flowTime}
                    restTime = {restTime}
                    longRestTime = {longRestTime}
                    flow = {flow}
                    timeRemaining = {timeRemaining} 
                    inputTime = {inputTime}
                    isLongRest={isLongRest}
                    setFlowTime = {setFlowTime }
                    setRestTime = {setRestTime}   
                    setLongRestTime = {setLongRestTime}
                    setTimeRemaining = {setTimeRemaining}
                    setInputTime = {setInputTime}    
                />
            )
            :
            (
                <TimerControls 
                    flowTime={flowTime}
                    restTime={restTime}
                    longRestTime={longRestTime}
                    isActive={isActive}
                    flow={flow}
                    countAllFlow={countAllFlow}
                    inputTime={inputTime}
                    setTimeRemaining={setTimeRemaining}
                    setIsActive={setIsActive}
                    setFlow={setFlow}
                    setIsRealTime={setIsRealTime}
                    setInputTime={setInputTime}
                    bgCiano={bgCiano}
                    bgPink={bgPink}
                    setBgMoving={setBgMoving}
                    setBgCiano={setBgCiano}
                    setBgPink={setBgPink}
                />
            )
        }
    </div>
  );
}

export default Timer;
