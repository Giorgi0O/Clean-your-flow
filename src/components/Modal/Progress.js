import React from 'react';


function Progress( { 
    flowTime,
    timeGoal,
}) {

    const progressPercentage = (flowTime / timeGoal) * 100;

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    return (
        <div className='progress-container'>
            <div
                className="progress-bar" 
                style={ { width : `${clampValue(progressPercentage, 0, 100)}%` } }
            >
            </div>
        </div>
    );
}

export default Progress;
