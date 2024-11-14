import React from 'react';
import BStop from '../../shared/BStop'
import BStart from '../../shared/BStart'
import useNotifications from '../../../hooks/useNotifications'

function FControls({
  isActive,
  isflow,
  flowmodoroStart,
  flowmodoroBreath,
}) {

  const notify = useNotifications();

  const handleStart = () => {
    notify.notifyFlowMuted();
    notify.notifyClick();
    flowmodoroStart();
  }

  const handleBreath = () => {
    notify.notifyFlowMuted();
    notify.notifyClick();
    flowmodoroBreath();
  }

  return (
    <div className='w-5/6 text-center'>
      {
        !isflow ?
          <BStart operation={handleStart} type={3} disabled={isActive} ></BStart>
          :
          <BStop operation={handleBreath} type={2} ></BStop>
      }
    </div>
  );

}

export default FControls