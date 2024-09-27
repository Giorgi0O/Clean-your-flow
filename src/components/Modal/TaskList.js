import React, { useState } from 'react';
import DivisorOrizontal from '../Divisor/DivisorOrizontal';
import Task from './Task';
import TaskTab from './TaskTab';

function TaskList( { 
    taskList,
    timeGoal,
    flowTotalTime,
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

    const toComplete = Math.ceil(flowTotalTime / timeGoal *100)

    return (
        <div className="card bg-base-100 w-5/6 h-5/6 p-2 sm:p-8">

            <div className='flex justify-center mb-4'>
                <TaskTab 
                    actionType={actionType} 
                    setActionType={setActionType}
                    isTimeGoal={timeGoal !== 0}
                />
            </div>
            {
                actionType === 'action' &&
                <div className='card-body overflow-y-auto flex flex-col items-center'>
                    {
                        taskList.length > 0 ? 
                            (
                                taskList.map((task, index) => (
                                    <div className='w-full mb-2' key={index}>
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
                <div className=' h-full flex flex-col justify-center items-center overflow-auto'>

                    <div className={`radial-progress ${toComplete === 100 ? "text-neutral" : "text-primary"}`}  style={{ "--value": `${toComplete}`, "--size": "15rem", "--thickness": "1rem" }} role="progressbar">
                        <div className='flex flex-col items-center justify-center'>
                            <span className='font-number font-bold text-2xl text-ciano'> { formatTime( Math.ceil(flowTotalTime/60)) } </span>
                            <DivisorOrizontal/>
                            <span className='font-number font-bold text-2xl text-verde'> { formatTime( timeGoal/60 )} </span>
                        </div>                    
                    </div>
                </div>
            }
        </div>
    );
}

export default TaskList;
