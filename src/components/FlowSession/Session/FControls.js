import React from 'react';
import BStop from '../../Common/BStop'
import BStart from '../../Common/BStart'
import { playSound } from '../../../utils/common';

function FControls({
  isActive,
  flow,
  flowmodoroStart,
  flowmodoroBreath,
  flowmodoroPause,
}) {
  const handleStart = () => {
    playSound('click');
    flowmodoroStart();
  }

  const handleBreath = () => {
    playSound('start-flow');
    flowmodoroBreath();
  }

  const handlePause = () => {
    playSound('click');
    flowmodoroPause();
  }

  return (
    <div className='w-5/6 text-center'>
      {
        !isActive ?
          <BStart operation={handleStart} type={3} ></BStart>
          :
          (
            (
              flow ?
                <>
                  <BStop operation={handleBreath} type={2} ></BStop>
                </>
                :
                <>
                  <BStop operation={handlePause} type={1} ></BStop>
                </>
            )
          )
      }
    </div>
  );

}

export default FControls