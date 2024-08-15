import './Timer.css';
import React, {useState,useEffect} from 'react';
import { FaSync } from 'react-icons/fa'; 
import { MdSkipNext } from "react-icons/md";


function Timer() {

  const flowTime = 15;
  const restTime = 5;

  /* STATE */
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(flowTime);
  const [flow, setFlow] = useState(true);
  const [autoStart, setAutoStart] = useState(false);
  const [timeOfFlow, setTimeOfFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(false);



  useEffect(() => {
    if( isActive ){
      const interval = setInterval(() => {
        setTimeRemaining( (secondsLeft) => {
          if(secondsLeft === 0){
            setFlow(!flow);
            setIsRealTime(true);
            var nextTime  = flow ? restTime: flowTime;
            if( !autoStart ){
              setIsActive(false);
            }
            return nextTime;
          }
          else{
            return secondsLeft -1;
          }
        });
      }, 1000)
      
      return () => clearInterval(interval);
    }
  }, [isActive,flowTime, restTime, flow]); 

  useEffect(() => {
    if (!flow && isRealTime) {
      setTimeOfFlow((prevTime) => prevTime + flowTime);
    }
  }, [flow, flowTime]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60);
    const seconds = milliseconds % 60;
  
    // Aggiungi uno zero iniziale se i secondi sono meno di 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const refresh = () => {
    setIsActive(false);
    setTimeRemaining(flowTime);
    setFlow(true);
  }

  const next = () => {
    setTimeRemaining( flow ? restTime : flowTime);
    setFlow(!flow);
    setIsRealTime(false);
  }

  return (
    <div className='timer'>
      {
        timeOfFlow != 0 &&
        <p> tempo di focus : {formatTime(timeOfFlow)} </p>
      }
      {
        !isActive &&
        <button className= {autoStart ? 'auto-start-on' : 'auto-start-off'} onClick={ () => setAutoStart(!autoStart)}  >
          <span> Autostart : { autoStart ? 'on' : 'off' }</span>
      </button>
      }


      <p className='count-down'>{`${formatTime(timeRemaining)}`}</p>
      
      <div>
        { 
          timeRemaining != flowTime &&
          <button className="refresh-button" onClick={refresh}>
            <FaSync size={24} ></FaSync>
          </button>
        }
        <button id='start-button' onClick={() => setIsActive(!isActive)} >
          { isActive? 'Stop' :  'Start' } 
        </button>
        <button className="refresh-button" onClick={next} >
          <MdSkipNext size={32} ></MdSkipNext>
        </button>
      </div>
    
    </div>
  );
}

export default Timer;
