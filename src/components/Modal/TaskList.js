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
                    {
                        taskList.length > 0 ? 
                            (
                                taskList.map((task, index) => (
                                    <>
                                        <Task 
                                            key={index}
                                            id={index}
                                            text={task.action}       
                                            completed={task.completed}
                                            setTaskList={setTaskList}
                                        />
                                        <DivisorOrizontal></DivisorOrizontal>
                                    </>
                                ))
                            )
                        :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
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
