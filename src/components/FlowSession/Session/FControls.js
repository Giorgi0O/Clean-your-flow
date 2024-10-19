import React from 'react';
import BStop from '../../Common/BStop'
import BStart from '../../Common/BStart'

//file statici
const startFlowAudio = '/sounds/start-click.wav'

function FControls({ 
    isActive,
    flow,
    flowmodoroStart,
    flowmodoroBreath,
    flowmodoroPause,

  }) 
{

  const buttonSound = new Audio(startFlowAudio);

  const handleStart = () => {
    buttonSound.play();
    flowmodoroStart();
  }

  const handleBreath = () => {
    buttonSound.play();
    flowmodoroBreath();
  }

  const handlePause = () => {
    buttonSound.play();
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