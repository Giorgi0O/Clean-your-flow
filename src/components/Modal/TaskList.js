import './Modal.css';
import React, { useState } from 'react';
import DivisorOrizontal from '../Divisor/DivisorOrizontal';
import Task from './Task';
import TaskTab from './TaskTab';
import DivisorVertical from '../Divisor/DivisorVertical'
import Progress from './Progress';

function TaskList( { 
    taskList,
    setTaskList,
    countOfFlow,
    timeGoal,
    flowTime
}) {

    const [actionType, setActionType] = useState('action')


    return (
        <div className="card">

            <TaskTab actionType={actionType} setActionType={setActionType} ></TaskTab>
            {
                actionType === 'action' &&
                <div className='container'>
                    <Task text={'completare il task 1,2 '} completed={false} />
                    <DivisorOrizontal/>
                </div>
            }
            {
                actionType === 'time-goal' &&
                <div className='container time-goal-content'>
                    <div className='timeg-number'>

                        <span className='font-number color-ciano number-size'> { countOfFlow * (flowTime/60)} </span>
                        <DivisorVertical/>
                        <span className='font-number color-green number-size'> {timeGoal/60} </span>
                    </div>

                    <Progress
                        countOfFlow={countOfFlow}
                        flowTime={flowTime}
                        timeGoal={timeGoal}
                    ></Progress>

                </div>
            }
        </div>
    );
}

export default TaskList;
