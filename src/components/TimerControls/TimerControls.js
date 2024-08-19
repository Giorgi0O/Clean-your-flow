import '../Timer/Timer.css';
import React, {useState} from 'react';
import { CiEdit } from "react-icons/ci";
import { MdSkipNext } from "react-icons/md";
import StopButton from '../Buttons/StopButton'
import StartButton from '../Buttons/StartButton'
import Button from '../Buttons/Button'
import CircleButton from '../Buttons/CircleButton'


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
      <Button text={'cliccami'} iconName={'pause'} color={'ciano'} > </Button>
      <CircleButton color={'ciano'} tooltip={'next'} iconName={'next'} shadow={true} operation={next}></CircleButton>
      <StopButton operation={() => setIsActive(!isActive)}></StopButton>
      <StartButton operation={() => setIsActive(!isActive)} type={1} ></StartButton>
      <StartButton operation={() => setIsActive(!isActive)} type={2} ></StartButton>

    </div>
  );
    
}

export default TimerControls