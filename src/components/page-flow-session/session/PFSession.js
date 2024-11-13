import { useActiveSession } from '../../../hooks/useActiveSession';
import React, { useEffect, useState, useCallback } from "react";
import CountDown from "./CountDown";
import MSettings from "./MSettings";
import MGoals from "./MGoals";
import usePomodoroTimer from '../../../hooks/usePomodoroTimer';
import useFlowmodoroTimer from '../../../hooks/useFlowmodoroTimer';
import BManager from './BManager';
import { useSettingToogle } from '../../../hooks/useSettingToogle';
import { initSoundManager } from '../../../utils/SoundManager';
import useNotifications from '../../../hooks/useNotifications';

function PFSession({
    taskList,
    setTaskList,
    selectedMode,
    setSelectedMode,
    timeGoal,
    setBgRigth,
    setBgLeft,
    setEndSessionRequest,
    flowTotalTime,
    setFlowTotalTime,
    setEndTaskCompletedRequest,
    awaitEndResponse
}) {

    const [isActive, setIsActive] = useState(false);
    const [startAutomation, setStartAutomation] = useState(false);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalTask, setModalTask] = useState(false);

    const settingToogle = useSettingToogle();
    useActiveSession(isActive, setModalSetting, setModalTask);

    useEffect(() => {
        initSoundManager();
    }, []);
    const notify = useNotifications();

    const handleTimerComplete = useCallback(() => {
        setIsActive(false);
        if (settingToogle.autoStart) {
            setTimeout(() => {
                setStartAutomation(true);
            }, 3000);
        }
    }, [settingToogle]);

    // POMODORO TIMER
    const pomodoroTimer = usePomodoroTimer({
        setIsActive,
        initialFlowTime: 25 * 60,
        initialRestTime: 5 * 60,
        initialLongRestTime: 15 * 60,
        autoStart: settingToogle.autoStart,
        setFlowTotalTime,
        setBgLeft,
        setBgRigth,
        onTimerComplete: handleTimerComplete
    });

    // FLOWMODORO TIMER
    const flowmodoroTimer = useFlowmodoroTimer({
        initalDivisionFactor: 5,
        setIsActive,
        setBgLeft,
        setBgRigth,
        autoStart: settingToogle.autoStart,
        setFlowTotalTime,
        onTimerComplete: handleTimerComplete
    });

    useEffect(() => {
        //invio richiesta di chiusura
        const handleCheckGoals = () => {
            const timeAchieved = flowTotalTime >= timeGoal && timeGoal !== 0;
            const taskCompleted = taskList.length === taskList.filter(task => task.completed).length;

            if (timeAchieved || taskCompleted) return true;

            return false;
        };

        if (settingToogle.requestCompleted && !isActive && handleCheckGoals()) {
            setEndTaskCompletedRequest(true);
            settingToogle.setRequestCompleted(false);
        }

        // autoStart automation
        if (startAutomation && !awaitEndResponse) {
            if (selectedMode === 1) pomodoroTimer.start();
            if (selectedMode === 2) flowmodoroTimer.start();

            notify.notifyClick();

            setStartAutomation(false);
        }
    }, [isActive, settingToogle, notify, awaitEndResponse, flowTotalTime, timeGoal, taskList, setEndTaskCompletedRequest, startAutomation, pomodoroTimer, flowmodoroTimer, selectedMode])

    return (
        <div className={'z-[100] flex flex-col items-center justify-evenly w-5/6 h-[85%]'} >
            <div className={`flex items-center justify-between w-full h-3/4`}>
                <div className={`${modalSetting || modalTask ? 'hidden lg:center' : 'center'} w-full h-full lg:w-1/3 `}>
                    <CountDown
                        timeRemaining={selectedMode === 1 ? pomodoroTimer.timeRemaining : flowmodoroTimer.timeRemaining}
                        flow={selectedMode === 1 ? pomodoroTimer.flow : flowmodoroTimer.flow}
                        selectedMode={selectedMode}
                    />
                </div>
                <div className={`${modalSetting || modalTask ? 'center lg:justify-end' : 'hidden lg:center'} w-full h-full lg:w-2/3`}>
                    {
                        modalSetting && !isActive && !modalTask &&
                        (
                            <MSettings
                                isActive={isActive}
                                pomodoroSettings={pomodoroTimer}
                                flowmodoroSetting={flowmodoroTimer}
                                timeRemaining={selectedMode === 1 ? pomodoroTimer.timeRemaining : flowmodoroTimer.timeRemaining}
                                setTimeRemaining={pomodoroTimer.setTimeRemaining}
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                                settingToogle={settingToogle}
                            />
                        )
                    }
                    {
                        modalTask && !modalSetting &&
                        (
                            <MGoals {... { taskList, setTaskList, timeGoal, flowTotalTime, settingToogle }} />
                        )
                    }
                </div>
            </div>
            <div className='w-full h-1/3 flex flex-col justify-center items-center'>
                {
                    selectedMode === 1 && <p className='font-number text-rosa-light m-1'> #{Math.floor(flowTotalTime / pomodoroTimer.flowTime)} </p>
                }
                <BManager {... { isActive, selectedMode, setEndSessionRequest, modalSetting, setModalSetting, modalTask, setModalTask, pomodoroTimer, flowmodoroTimer }} />
            </div>
        </div>
    );
}

export default PFSession;