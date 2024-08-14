import './Timer.css';
import React, {useState,useEffect} from 'react';

function Timer() {

  const flowTime = 15*60;
  const restTime = 5*60;
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(flowTime);

  const [flow, setFlow] = useState(false);

  useEffect(() => {
    if( isActive ){
      const interval = setInterval(() => {
        setTimeRemaining( (secondsLeft) => {
          if(secondsLeft === 0){
            setFlow(!flow);
            return flow ? flowTime: restTime;
          }
          else{
            return secondsLeft -1;
          }
        });
      }, 1000)
      
      return () => clearInterval(interval);
    }
  }, [isActive,flowTime, restTime, flow]); 

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = () => {
    const totalSeconds = Math.floor(timeRemaining / 1000);
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
  
    // Aggiungi uno zero iniziale se i secondi sono meno di 10
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className='timer'>
      <p className='count-down'>{`${formatTime()}`}</p>
      <button id='start-button' onClick={() => setIsActive(!isActive)} >
        { isActive? 'Stop' :  'Start' } 
      </button>
    </div>
  );
}

export default Timer;
