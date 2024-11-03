import React from 'react';
import TimerConfigurator from './TimerConfigurator'
import Toggle from '../../shared/Toggle'
import DividerO from '../../shared/DividerO';
import Switch from '../../shared/Switch'
import { useTranslation } from 'react-i18next';


function MSettings({
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
  setTimerCount,
  requestCompleted,
  setRequestCompleted
}) {

  const { t } = useTranslation();
  const notifyAccetpetd = Notification.permission === "granted";

  return (
    <div className="card-mirror w-5/6 h-5/6 p-4 sm:p-8">
      {
        selectedMode === 1 &&
        <>
          <TimerConfigurator {... { flowTime, restTime, longRestTime, saveForm }} />
          <div className='w-full mb-4 flex justify-center'>
            <DividerO className="bg-base-300" />
          </div>
        </>
      }

      <div className={`w-full flex flex-col items-center ${selectedMode === 2 ? 'justify-center' : ''}`}>
        {
          !notifyAccetpetd &&
          <div className='list-component text-center'>
            <p className='font-corpo text-lg text-rosa-dark'> Notifications are currently disabled. Please enable them to receive an alert when the timer ends. </p>
          </div>
        }
        {
          !isActive && ((selectedMode === 1 && timeRemaining === flowTime) || (selectedMode === 2 && timeRemaining === 0)) &&
          <div className='list-component'>
            <span> {t('flow-session.session.settings.mode')}  </span>
            <Switch
              flowTime={flowTime}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              setTimeRemaning={setTimeRemaining}
              setAutoStart={setAutoStart}
              setTimerCount={setTimerCount}
            />
          </div>
        }
        <SettingToogle title={t('flow-session.session.settings.auto-start')} prop={autoStart} setProp={setAutoStart} />
        <SettingToogle title={t('flow-session.session.settings.completed-request')} prop={requestCompleted} setProp={setRequestCompleted} />
      </div>
    </div>
  );
}

function SettingToogle({
  title,
  prop,
  setProp
}) {

  return (
    <div className='list-component'>
      <span> {title} </span>
      <Toggle prop={prop} setProp={setProp}></Toggle>
    </div>
  );

}

export default MSettings;
