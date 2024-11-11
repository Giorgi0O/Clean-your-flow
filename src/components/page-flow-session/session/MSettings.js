import React from 'react';
import TimerConfigurator from './TimerConfigurator'
import Toggle from '../../shared/Toggle'
import DividerO from '../../shared/DividerO';
import Switch from '../../shared/Switch'
import { useTranslation } from 'react-i18next';
import BreathConfigurator from './BreathConfigurator';


function MSettings({
  isActive,
  pomodoroSettings,
  flowmodoroSetting,
  timeRemaining,
  setTimeRemaining,
  selectedMode,
  setSelectedMode,
  settingToogle,
}) {
  const { t } = useTranslation();

  return (
    <div className="card-mirror w-5/6 h-5/6 p-4 sm:p-8">
      {
        selectedMode === 1 ?
          <TimerConfigurator
            flowTime={pomodoroSettings.flowTime}
            restTime={pomodoroSettings.restTime}
            longRestTime={pomodoroSettings.longRestTime}
            saveForm={pomodoroSettings.saveTimerForm}
          />
          :
          <BreathConfigurator
            divisionFactor={flowmodoroSetting.divisionFactor}
            saveForm={flowmodoroSetting.saveDivisionFactor}
          />
      }
      <div className='w-full mb-4 flex justify-center'>
        <DividerO className="bg-base-300" />
      </div>

      <div className={`w-full flex flex-col items-center overflow-y-auto`}>
        {
          !isActive && ((selectedMode === 1 && timeRemaining === pomodoroSettings.flowTime) || (selectedMode === 2 && timeRemaining === 0)) &&
          <div className='list-component'>
            <span> {t('flow-session.session.settings.mode')}  </span>
            <Switch
              flowTime={pomodoroSettings.flowTime}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              setTimeRemaning={setTimeRemaining}
              setAutoStart={settingToogle.setAutoStart}
              setTimerCount={pomodoroSettings.setTimerCount}
            />
          </div>
        }
        <SettingToogle title={t('flow-session.session.settings.auto-start')} prop={settingToogle.autoStart} setProp={settingToogle.setAutoStart} />
        <SettingToogle title={t('flow-session.session.settings.completed-request')} prop={settingToogle.requestCompleted} setProp={settingToogle.setRequestCompleted} />
        <SettingToogle title={t('flow-session.session.settings.view-completed-task')} prop={settingToogle.viewCompletedTask} setProp={settingToogle.setViewCompletedTask} />
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
