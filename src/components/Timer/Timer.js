import './Timer.css';
import React, {useState,useEffect} from 'react';
import { FaSync } from 'react-icons/fa'; 
import { MdSkipNext } from "react-icons/md";
import { CiEdit } from "react-icons/ci";



function Timer() {

  const [flowTime, setFlowTime] = useState(25*60);
  const [restTime, setRestTime] = useState(5*60);
  const [longRestTime, setLongRestTime] = useState(15*60);

  const [tempFlowTime, setTempFlowTime] = useState(flowTime);
  const [tempRestTime, setTempRestTime] = useState(restTime);
  const [tempLongRestTime, setTempLongRestTime] = useState(longRestTime);

  /* STATE */
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(flowTime);
  const [flow, setFlow] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [countOfFlow, setCountOfFlow] = useState(0);
  const [countAllFlow, setCountAllFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(0);
  const [inputTime, setInputTime] = useState(false);

  useEffect(() => {
    if( isActive ){
      const interval = setInterval(() => {
        setTimeRemaining( (secondsLeft) => {
          if(secondsLeft === 0){
            
            setFlow(!flow);
            setIsRealTime(true);

            var nextTime  = flow ? restTime: flowTime;
            
            if( (countAllFlow+1) % 4 === 0 && flow ){
              nextTime = longRestTime;
            } 
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
  }, [isActive,flowTime, restTime, autoStart,flow, timeRemaining]); 

  useEffect(() => {
    if (!flow ) {
      setCountAllFlow((prevTime) => prevTime + 1);
      if( isRealTime ){
        setCountOfFlow((prevTime) => prevTime + 1);
      }
    }
  }, [flow, isRealTime]);

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
    setFlow(!flow);

    var nextTime  = flow ? restTime: flowTime;
    if( (countAllFlow+1) % 4 === 0 && flow ){
      nextTime = longRestTime;
    } 
    setTimeRemaining( nextTime );
    
    setIsRealTime(false);
    
  }

  const handleFlowTimeChange = (event) => {
    setTempFlowTime(+event.target.value*60);
  };

  const handleRestTimeChange = (event) => {
    setTempRestTime(+event.target.value*60);
  };

  const handleLongRestTimeChange = (event) => {
    setTempLongRestTime(+event.target.value*60);
  };

  const handleSave = () => {
    setFlowTime( prev => {
      if( flow ){
        var timeRem = tempFlowTime - ( prev - timeRemaining) ;
        setTimeRemaining(timeRem > 0 ? timeRem : 0);
      }
      return tempFlowTime;
    });
    setRestTime( prev => {
      if( !flow ){
        var timeRem = tempRestTime - ( prev - timeRemaining) ;
        setTimeRemaining(timeRem > 0 ? timeRem : 0);
      }
      return tempRestTime;
    });
    setLongRestTime( prev => {
      if( !flow  && (countAllFlow+1) % 4 === 0 ){
        var timeRem = tempLongRestTime - ( prev - timeRemaining) ;
        setTimeRemaining(timeRem > 0 ? timeRem : 0);
      }
      return tempRestTime;
    });

    
    setInputTime(!inputTime)
  }


  return (
    <div className={ flow ? 'timer-bg-red timer' : 'timer-bg-blue timer' } >
      {
        countOfFlow !== 0 &&
        <p> tempo di focus : { formatTime(flowTime*countOfFlow) } </p>
      }
      {
        !isActive && !inputTime &&
        <button className= {autoStart ? 'auto-start-on' : 'auto-start-off'} onClick={ () => setAutoStart(!autoStart)}  >
          <span> Autostart : { autoStart ? 'on' : 'off' }</span>
        </button>
      }
      <div className='count-down'>
        {
          !inputTime &&
          <p>{`${formatTime(timeRemaining)}`}</p>
        }
        {
          inputTime &&
          <form className='form-input'>
            <div>
            <label htmlFor="flow-time">Flow time:</label>
            <input
              type="number"
              id="flow-time"
              value={tempFlowTime/60}
              onChange={handleFlowTimeChange}
              placeholder={formatTime(flowTime)}
            />
            <label htmlFor="rest-time">rest time:</label>
            <input
              type="number"
              id="rest-time"
              value={tempRestTime/60}
              onChange={handleRestTimeChange}
              placeholder={formatTime(restTime)}
            />
            <label htmlFor="long-rest-time">rest time:</label>
            <input
              type="number"
              id="long-rest-time"
              value={tempLongRestTime/60}
              onChange={handleLongRestTimeChange}
              placeholder={formatTime(longRestTime)}
            />
            </div>
            <button type="button" onClick={handleSave}>Salva</button>
          </form>
        }
        {
          !isActive &&
          <button className="base-button-icon" onClick={() => setInputTime(!inputTime)} >
            <CiEdit size={32} />
          </button>
        }
      </div>
      {
        !inputTime &&
        <div>
          { 
            timeRemaining !== flowTime &&
            <button className="base-button-icon" onClick={refresh}>
              <FaSync size={24} ></FaSync>
            </button>
          }
          <button id='start-button' onClick={() => setIsActive(!isActive)} >
            { isActive? 'Stop' :  'Start' } 
          </button>
          <button className="base-button-icon" onClick={next} >
            <MdSkipNext size={32} ></MdSkipNext>
          </button>
        </div>
      }
    </div>
  );
}

export default Timer;
