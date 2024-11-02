import React from "react";
import DividerO from "../../shared/DividerO";
import TaskList from "../../shared/TaskList";
import { useTranslation } from "react-i18next";

function REndSession({
    taskList,
    setTaskList,
    timeGoal,
    flowTotalTime,
}) {

    const { t } = useTranslation();

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

    const toComplete = Math.ceil(flowTotalTime / timeGoal * 100)


    return (
        <div className="w-5/6 h-5/6 center flex-col lg:flex-row justify-evenly" >
            <Card titleId={'common.task'}>
                <div className='center flex-col w-full'>
                    {
                        taskList.length > 0 ?
                            <TaskList taskList={taskList} setTaskList={setTaskList} isEditable={false} />
                            :
                            <div className="task-empty"> <p className="sub-font"> Action list is empty </p> </div>
                    }
                </div>
            </Card>
            <Card titleId={'common.time-goal'}>
                <div className="card-body w-full center">
                    <div className={`radial-progress ${toComplete >= 100 ? "text-verde" : "text-primary"}`} style={{ "--value": `${toComplete > 100 ? 100 : toComplete}`, "--size": "15rem", "--thickness": "1rem" }} role="progressbar">
                        <div className='flex flex-col items-center justify-center'>
                            <span className='font-number font-bold text-2xl text-ciano'> {formatTime(Math.floor(flowTotalTime / 60))} </span>
                            <DividerO />
                            <span className='font-number font-bold text-2xl text-verde'> {formatTime(timeGoal / 60)} </span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function Card({
    titleId,
    children
}) {

    const { t } = useTranslation();

    return (
        <div className='card-mirror p-8 w-[350px] md:w-[450px]'>
            <h2 className="card-title font-titolo text-2xl text-ciano-dark">{t(titleId)}</h2>
            {children}
        </div>
    );

}

export default REndSession