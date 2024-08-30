import './Modal.css';
import React from 'react';
import TimerForm from '../Timer/TimerForm/TimerForm'
import AutoStart from '../Timer/AutoStartToggle/AutoStartToggle'
import DivisorOrizontal from '../Divisor/DivisorOrizontal';
import Switch from '../Switch/Switch'


function Settings( { 
  saveForm,
  flowTime, 
  restTime, 
  longRestTime,
  timeRemaining,     
  autoStart,
  setAutoStart,
  setTimeRemaining,
  isActive,
  selectedMode,
  setSelectedMode,
  setTimerCount

}) {

  return (
    <div className="card modal-card-dim modal-card-setting">
      {
        selectedMode === 1 &&
        <>
          <TimerForm
              flowTime = {flowTime}
              restTime= {restTime}
              longRestTime= {longRestTime}
              saveForm={saveForm}
          ></TimerForm>
          <DivisorOrizontal></DivisorOrizontal>
        </>
      }
      
      <div className='setting-list'>
        <div className='list-component'>
          <span className='default-font'> Auto start </span>
          <AutoStart autoStart={autoStart} setAutoStart={setAutoStart}></AutoStart>
        </div>
        {
          !isActive && ( (selectedMode === 1 && timeRemaining === flowTime) || (selectedMode === 2 && timeRemaining === 0) ) &&
          <div className='list-component'>
            <span className='default-font'> Mode </span>
            <Switch 
              selectedMode={selectedMode} 
              setSelectedMode={setSelectedMode} 
              setTimeRemaning={setTimeRemaining} 
              setAutoStart={setAutoStart}
              setTimerCount={setTimerCount}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default Settings;
