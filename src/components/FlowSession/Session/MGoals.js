import React, { useState } from 'react';
import DividerO from '../../Common/DividerO';
import TabControls from '../../Common/TabControls';
import TaskList from '../../Common/TaskList';

function MGoals({
    taskList,
    setTaskList,
    timeGoal,
    flowTotalTime,
}) {

    const [actionType, setActionType] = useState('action');

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

    const toComplete = Math.ceil(flowTotalTime / timeGoal * 100)

    return (
        <div className="card overflow-x-hidden bg-base-100 w-full sm:w-5/6 h-5/6 p-2 sm:p-8">

            <div className='flex justify-center mb-4'>
                <TabControls
                    actionType={actionType}
                    setActionType={setActionType}
                    isTimeGoal={timeGoal !== 0}
                />
            </div>
            {
                actionType === 'action' &&
                <div className='card-body'>
                    {
                        taskList.length > 0 ?
                            <TaskList
                                taskList={taskList}
                                setTaskList={setTaskList}
                                isEditable={true}
                            />
                            :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
                </div>
            }
            {
                actionType === 'time-goal' &&
                <div className=' h-full flex flex-col justify-center items-center overflow-auto'>
                    <div className={`radial-progress ${toComplete >= 100 ? "text-verde" : "text-primary"}`} style={{ "--value": `${toComplete > 100 ? 100 : toComplete}`, "--size": "15rem", "--thickness": "1rem" }} role="progressbar">
                        <div className='flex flex-col items-center justify-center'>
                            <span className='font-number font-bold text-2xl text-ciano'> {formatTime(Math.floor(flowTotalTime / 60))} </span>
                            <DividerO />
                            <span className='font-number font-bold text-2xl text-verde'> {formatTime(timeGoal / 60)} </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default MGoals;
