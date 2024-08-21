import './Modal.css';
import React from 'react';
import TimerForm from '../Timer/TimerForm/TimerForm'
import AutoStart from '../Timer/AutoStartToggle/AutoStartToggle'
import DivisorOrizontal from '../Divisor/DivisorOrizontal';


function Settings( { 
  flowTime, 
  restTime, 
  longRestTime,
  timeRemaining,     
  flow,
  bgMoving,        
  isLongRest,
  autoStart,
  setBgMoving,
  setAutoStart,
  setFlowTime,       
  setRestTime,       
  setLongRestTime,   
  setTimeRemaining
}) {

  return (
    <div className="card">
      <TimerForm
          flowTime = {flowTime}
          restTime= {restTime}
          longRestTime= {longRestTime}
          timeRemaining  = {timeRemaining} 
          flow  = {flow}
          isLongRest= {isLongRest}
          setBgMoving={setBgMoving} 
          setFlowTime   = {setFlowTime}
          setRestTime   = {setRestTime}
          setLongRestTime = {setLongRestTime}
          setTimeRemaining= {setTimeRemaining}
      ></TimerForm>
      <DivisorOrizontal></DivisorOrizontal>

      <div className='setting-list'>
        <div className='list-component'>
          <span className='font-corpo1'> Auto start </span>
          <AutoStart autoStart={autoStart} setAutoStart={setAutoStart}></AutoStart>
        </div>
      </div>
    </div>
  );
}

export default Settings;
