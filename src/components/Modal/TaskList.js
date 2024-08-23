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
    flowTime,
    selectedMode,
    flowTotalTime
}) {

    const [actionType, setActionType] = useState('action')

    const formatTime = (time) => {
        if (time < 60) {
            return (
                <>
                    {time} <span className='sub-font'>minutes</span>
                </>
            );
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return (
                <>
                    {hours}:{minutes.toString().padStart(2, '0')} <span className='sub-font'>hours</span>
                </>
            );
        }
    }


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
                        {
                            selectedMode === 1 ?
                            (
                                <>
                                <span className='font-number color-ciano number-size'> {formatTime(countOfFlow * flowTime)} </span>
                                <DivisorVertical/>
                                <span className='font-number color-green number-size'> {formatTime(timeGoal)} </span>
                                </>
                            )
                            :
                            (
                                <>
                                <span className='font-number color-ciano number-size'> { formatTime( Math.ceil(flowTotalTime/60)) } </span>
                                <DivisorVertical/>
                                <span className='font-number color-green number-size'> { formatTime( timeGoal )} </span>
                                </>
                            )
                        }


                    </div>

                    <Progress
                        flowTime={selectedMode === 1 ? (countOfFlow * flowTime)/60 : flowTotalTime/60 }
                        timeGoal={timeGoal}
                    ></Progress>

                </div>
            }
        </div>
    );
}

export default TaskList;
