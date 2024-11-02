import React from 'react';
import BStop from '../../shared/BStop'
import BStart from '../../shared/BStart'
import { playSound } from '../../../utils/utils';

function FControls({
  isActive,
  flow,
  flowmodoroStart,
  flowmodoroBreath,
}) {
  const handleStart = () => {
    playSound('click');
    flowmodoroStart();
  }

  const handleBreath = () => {
    playSound('start-flow');
    flowmodoroBreath();
  }

  return (
    <div className='w-5/6 text-center'>
      {
        !flow ?
          <BStart operation={handleStart} type={3} disabled={isActive} ></BStart>
          :
          <BStop operation={handleBreath} type={2} ></BStop>
      }
    </div>
  );

}

export default FControls