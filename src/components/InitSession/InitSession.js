import './InitSession.css'
import React from 'react';
import CreateAction from './CreateAction';
import TimeGoalSetting from './TimeGoalSetting';
import ModeSetting from './ModeSetting';

function InitSession({
    setInitSession, 
    taskList, 
    timeGoal,
    setTimeGoal,
    pageNumber,
    setPageNumber,
    selectedMode,
    setSelectedMode,
    createTask,
    deleteTask,
    updateTask
}) {
    

    return (
        <div className="card-container" >
            {
                pageNumber === 0 && 
                <CreateAction
                    setPageNumber={setPageNumber}
                    taskList = {taskList}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                />
            }
            {
                pageNumber === 1 &&
                <TimeGoalSetting
                    timeGoal={timeGoal}
                    setPageNumber={setPageNumber}
                    setTimeGoal={setTimeGoal}
                />
            }
            {
                pageNumber === 2 &&
                <ModeSetting
                    selectedMode={selectedMode}
                    setPageNumber={setPageNumber}
                    setSelectedMode={setSelectedMode}
                    setInitSession={setInitSession}
                />
            }
        </div>
    );
}

export default InitSession;
