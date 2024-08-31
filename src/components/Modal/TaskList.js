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
    timeGoal,
    flowTotalTime,
    createTask,
    deleteTask,
    updateTask
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
        <div className="card modal-card-dim">

            <TaskTab 
                actionType={actionType} 
                setActionType={setActionType}
                isTimeGoal={timeGoal !== 0}
            />
            {
                actionType === 'action' &&
                <div className='task-list-container'>
                    {
                        taskList.length > 0 ? 
                            (
                                taskList.map((task, index) => (
                                    <div className='tasks' key={index}>
                                        <Task 
                                            id={task.id}
                                            action={task.action} 
                                            completed={task.completed}
                                            update={true}
                                            deleteTask={deleteTask}
                                            updateTask={updateTask}
                                        />
                                        {
                                            index !== taskList.length-1 &&
                                            <DivisorOrizontal></DivisorOrizontal>
                                        }
                                    </div>
                                ))
                            )
                        :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
                </div>
            }
            {
                actionType === 'time-goal' &&
                <div className='task-list-container time-goal-content'>
                    <div className='timeg-number'>
                        <span className='font-number color-ciano number-size'> { formatTime( Math.ceil(flowTotalTime/60)) } </span>
                        <DivisorVertical/>
                        <span className='font-number color-green number-size'> { formatTime( timeGoal/60 )} </span>
                    </div>
                    <Progress
                        flowTime={flowTotalTime/60}
                        timeGoal={timeGoal}
                    ></Progress>
                </div>
            }
        </div>
    );
}

export default TaskList;
