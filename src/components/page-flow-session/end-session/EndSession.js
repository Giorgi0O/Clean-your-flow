import React from "react";
import BStart from "../../shared/BStart";
import REndSession from './REndSession'

function EndSession({
    taskList,
    setTaskList,
    timeGoal,
    flowTotalTime,
    handleRestart
}) {

    return (
        <>
            <div className=" z-[100] w-full h-full center flex-col">
                <div className='z-[100] w-full h-3/4 center overflow-auto'>
                    <REndSession
                        taskList={taskList}
                        setTaskList={setTaskList}
                        timeGoal={timeGoal}
                        flowTotalTime={flowTotalTime}
                    />
                </div>
                <div className='w-full h-1/3 center'>
                    <BStart operation={handleRestart} type={2} ></BStart>
                </div>
            </div>
        </>
    );
}


export default EndSession