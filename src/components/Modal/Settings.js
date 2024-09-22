import React from 'react';
import TimerForm from '../Timer/TimerForm/TimerForm'
import Toggle from '../Timer/Toggle/Toggle'
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

  const notifyAccetpetd = Notification.permission === "granted";

  return (
    <div className="card bg-base-100 w-5/6 h-5/6 p-8 ">
      {
        selectedMode === 1 &&
        <>
          <TimerForm
              flowTime = {flowTime}
              restTime= {restTime}
              longRestTime= {longRestTime}
              saveForm={saveForm}
          ></TimerForm>
          <div className='flex justify-center'>
            <DivisorOrizontal></DivisorOrizontal>
          </div>
        </>
      }
      
      <div className='card-body flex flex-col items-center'>
        {
          !notifyAccetpetd &&
          <div className='list-component mb-2 text-center'>
            <p className='font-corpo text-lg text-rosa-dark'> Notifications are currently disabled. Please enable them to receive an alert when the timer ends. </p>
          </div>
        }
        <div className='list-component'>
          <span> Auto start </span>
          <Toggle prop={autoStart} setProp={setAutoStart}></Toggle>
        </div>
        {
          !isActive && ( (selectedMode === 1 && timeRemaining === flowTime) || (selectedMode === 2 && timeRemaining === 0) ) &&
          <div className='list-component'>
            <span> Mode </span>
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
