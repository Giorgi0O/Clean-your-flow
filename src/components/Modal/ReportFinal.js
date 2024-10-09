import React from "react";
import Tasks from "../ Task/Tasks";
import DivisorOrizontal from "../Divisor/DivisorOrizontal";
import { useTranslation } from "react-i18next";



function ReportFinal ({
    taskList,
    timeGoal,
    createTask,
    deleteTask,
    updateTask,
    flowTime,
    flowTotalTime,
    endSession
}) {

    const {t} = useTranslation();

    const formatTime = (time) => {
        if (time < 60) {
            return (
                <>
                    {time} <span className='sub-font'>{t('common.time-unit-s')}</span>
                </>
            );
        } else {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            return (
                <>
                    {hours}:{minutes.toString().padStart(2, '0')} <span className='sub-font'>{t('common.time-unit-h')}</span>
                </>
            );
        }
    }

    const toComplete = Math.ceil(flowTotalTime / timeGoal *100)


    return (
        <div className="card shadow-md bg-base-100 overflow-y-auto w-full h-full flex justify-evenly items-center">
            <div className='w-full py-8 flex flex-col items-center'>
                <h2 class="font-titolo font-bold text-xl text-ciano-dark">{t('common.task')}</h2>
                <div className='card-body w-full md:w-3/4'>
                    {
                        taskList.length > 0 ? 
                            <Tasks
                                taskList={taskList}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                isEditable={true }
                            />
                        :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
                </div>
            </div>

            <div className='flex flex-col font-bold justify-center items-center'>
                <h2 class="card-title font-titolo text-xl text-ciano-dark">{t('common.time-goal')}</h2>
                <div className="card-body w-full center"> 
                <div className={`radial-progress ${toComplete >= 100 ? "text-verde" : "text-primary"}`}  style={{ "--value": `${toComplete > 100 ? 100 : toComplete}`, "--size": "15rem", "--thickness": "1rem" }} role="progressbar">
                    <div className='flex flex-col items-center justify-center'>
                            <span className='font-number font-bold text-2xl text-ciano'> { formatTime( Math.floor(flowTotalTime/60)) } </span>
                            <DivisorOrizontal/>
                            <span className='font-number font-bold text-2xl text-verde'> { formatTime( timeGoal/60 )} </span>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportFinal