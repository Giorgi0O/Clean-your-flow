import './InitSession.css'
import React from 'react';
import CreateAction from './CreateAction';
import TimeGoalSetting from './TimeGoalSetting';
import ModeSetting from './ModeSetting';

function InitSession({
    setInitSession, 
    taskList, 
    setTaskList,
    timeGoal,
    setTimeGoal,
    pageNumber,
    setPageNumber,
    selectedMode,
    setSelectedMode,
    setAutoStart
}) {
    

    return (
        <div className="task-list-container" >
            {
                pageNumber === 0 && 
                <CreateAction
                    setPageNumber={setPageNumber}
                    setTaskList={setTaskList}
                    taskList = {taskList}
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
                    setAutoStart={setAutoStart}
                />
            }
        </div>
    );
}

export default InitSession;
