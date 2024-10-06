import React from "react";

function TaskTab({actionType, setActionType, isTimeGoal }){


    const handleRadioChange = (value) => {
      setActionType(value);
    };

    return (
        <div role="tablist" className='tabs w-2/3'>
            <label role="tab" className={`tab ${actionType === 'action' ? 'tab-active' : ''}`}>
                <input 
                    className="hidden"
                    type="radio"
                    name="radio"
                    value='pomodoro'
                    checked={actionType === 'action'}
                    onChange={() => handleRadioChange('action')} 
                />
                <span className={`font-corpo text-lg font-semibold ${actionType === 'action' ? 'text-cian-dark' : 'text-ciano-light'} `}> Action </span>
            </label>
            {
                isTimeGoal && 
                <label role="tab" className={`tab ${actionType === 'time-goal' ? 'tab-active' : ''}`}>
                    <input 
                        className="hidden"
                        type="radio"
                        name="radio"
                        value='flowmodoro'
                        checked={actionType === 'time-goal'}
                        onChange={() => handleRadioChange('time-goal')} 
                    />
                    <span className={`hidden md:inline md:font-corpo md:text-lg md:font-semibold ${actionType === 'time-goal' ? 'md:text-ciano-dark' : 'md:text-ciano-light'} `}> Time goal </span>
                    <span className={`md:hidden font-corpo text-lg font-semibold ${actionType === 'time-goal' ? 'text-ciano-dark' : 'text-ciano-light'} `}> Time </span>
                </label>
            }
        </div>
    );
};

export default TaskTab;
