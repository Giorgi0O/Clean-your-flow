import React from "react";
import './TaskTab.css'

function TaskTab({actionType, setActionType }){


    const handleRadioChange = (value) => {
      setActionType(value);
    };

    return (
        <div className='tt-inputs'>
            <label className={`tt-radio`}>
                <input 
                    type="radio"
                    name="radio"
                    value='pomodoro'
                    checked={actionType === 'action'}
                    onChange={() => handleRadioChange('action')} 
                />
                <span className={`name font-corpo2 ${actionType === 'action' ? 'underline' : 'not-selected'} `}> Action </span>

            </label>
            <label className={`tt-radio`}>
                <input 
                    type="radio"
                    name="radio"
                    value='flowmodoro'
                    checked={actionType === 'time-goal'}
                    onChange={() => handleRadioChange('time-goal')} 
                />
                <span className={`name font-corpo2 ${actionType === 'time-goal' ? 'underline' : 'not-selected'} `}> Time goal </span>

            </label>
        </div>
    );
};

export default TaskTab;
