import '../Timer/Timer.css';
import React, {useState} from 'react';
import { CiEdit } from "react-icons/ci";
import { MdSkipNext } from "react-icons/md";


function TimerControls({ 
      flowTime,
      restTime,
      longRestTime,
      isActive,
      flow,
      countAllFlow,
      inputTime,
      setTimeRemaining,
      setIsActive,
      setFlow,
      setIsRealTime,
      setInputTime,      
    }) 
  {

  const next = () => {
    setFlow(!flow);

    var nextTime  = flow ? restTime: flowTime;
    if( (countAllFlow+1) % 4 === 0 && flow ){
      nextTime = longRestTime;
    } 
    setTimeRemaining( nextTime );
    
    setIsRealTime(false);
  }

  const [hideEditButton, setHideEditButton] = useState(false);

  const edit = function(){
    setInputTime(!inputTime);
    setHideEditButton(true);
  }

  return (
    <div>
      {
        !isActive && !hideEditButton &&
        (
          <button className="base-button-icon" onClick={edit}>
            <CiEdit size={32} />
          </button>
        )
      }
      <button id='start-button' onClick={() => setIsActive(!isActive)} >
        {isActive ? 'Stop' : 'Start'} 
      </button>
      <button className="base-button-icon" onClick={next}>
        <MdSkipNext size={32} />
      </button>
    </div>
  );
    
}

export default TimerControls