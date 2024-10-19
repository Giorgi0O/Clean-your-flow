import React from 'react';
import TimerConfigurator from './TimerConfigurator'
import Toggle from '../../Common/Toggle'
import DividerO from '../../Common/DividerO';
import Switch from '../../Common/Switch'
import { useTranslation } from 'react-i18next';


function MSettings( { 
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

  const {t} = useTranslation();
  const notifyAccetpetd = Notification.permission === "granted";

  return (
    <div className="card bg-base-100 w-5/6 h-5/6 p-4 sm:p-8">
      {
        selectedMode === 1 &&
        <>
          <TimerConfigurator
              flowTime = {flowTime}
              restTime= {restTime}
              longRestTime= {longRestTime}
              saveForm={saveForm}
          />
          <div className='flex justify-center'>
            <DividerO/>
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
          <span> {t('flow-session.session.settings.auto-start')} </span>
          <Toggle prop={autoStart} setProp={setAutoStart}></Toggle>
        </div>
        {
          !isActive && ( (selectedMode === 1 && timeRemaining === flowTime) || (selectedMode === 2 && timeRemaining === 0) ) &&
          <div className='list-component'>
            <span> {t('flow-session.session.settings.mode')}  </span>
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

export default MSettings;
