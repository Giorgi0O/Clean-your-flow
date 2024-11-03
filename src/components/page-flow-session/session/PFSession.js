import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useActiveSession } from '../../../hooks/useActiveSession';
import React, { useEffect, useState, useCallback } from "react";
import CountDown from "./CountDown";
import MSettings from "./MSettings";
import MGoals from "./MGoals";
import usePomodoroTimer from '../../../hooks/usePomodoroTimer';
import useFlowmodoroTimer from '../../../hooks/useFlowmodoroTimer';
import BManager from './BManager';
import { playSound } from '../../../utils/utils';

function PFSession({
    taskList,
    setTaskList,
    selectedMode,
    setSelectedMode,
    timeGoal,
    bgRigth,
    bgLeft,
    setBgRigth,
    setBgLeft,
    setEndSessionRequest,
    flowTotalTime,
    setFlowTotalTime,
    setEndTaskCompletedRequest,
    awaitEndResponse
}) {

    const [autoStart, setAutoStart] = useLocalStorage('autoStart', 0);
    const [requestCompleted, setRequestCompleted] = useLocalStorage('requestCompleted', false);
    const [isActive, setIsActive] = useState(false);
    const [startAutomation, setStartAutomation] = useState(false);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalTask, setModalTask] = useState(false);

    useActiveSession(isActive, setModalSetting, setModalTask);

    const handleTimerComplete = useCallback((autoStart) => {
        setIsActive(false);
        if (autoStart) {
            setTimeout(() => {
                setStartAutomation(true);
            }, 3000);
        }
    }, []);

    // POMODORO TIMER
    const pomodoroTimer = usePomodoroTimer({
        setIsActive,
        initialFlowTime: 25 * 60,
        initialRestTime: 5 * 60,
        initialLongRestTime: 15 * 60,
        autoStart,
        setFlowTotalTime,
        setBgLeft,
        setBgRigth,
        onTimerComplete: handleTimerComplete
    });

    // FLOWMODORO TIMER
    const flowmodoroTimer = useFlowmodoroTimer({
        setIsActive,
        setBgLeft,
        setBgRigth,
        autoStart,
        setFlowTotalTime,
        onTimerComplete: handleTimerComplete
    });

    useEffect(() => {
        //invio richiesta di chiusura
        const handleCheckGoals = () => {
            const timeAchieved = flowTotalTime >= timeGoal;
            const taskCompleted = taskList.length === taskList.filter(task => task.completed).length;

            if (timeAchieved || taskCompleted) return true;

            return false;
        };

        if (requestCompleted && !isActive && handleCheckGoals()) {
            console.log('ciao')
            setEndTaskCompletedRequest(true);
            setRequestCompleted(false);
        }

        // autoStart automation
        if (startAutomation && !awaitEndResponse) {
            if (selectedMode === 1) pomodoroTimer.start();
            if (selectedMode === 2) flowmodoroTimer.start();

            playSound('click');

            setStartAutomation(false);
        }
    }, [isActive, requestCompleted, awaitEndResponse, setRequestCompleted, flowTotalTime, setAutoStart, timeGoal, taskList, setEndTaskCompletedRequest, startAutomation, pomodoroTimer, flowmodoroTimer, selectedMode])

    return (
        <div className={'z-[100] flex flex-col items-center justify-evenly w-5/6 h-[85%]'} >
            <div className={`flex items-center justify-between w-full h-3/4`}>
                <div className={`
                    ${modalSetting || modalTask ? 'hidden lg:center' : 'center'}
                    w-full h-full lg:w-1/3 
                `}>
                    <CountDown
                        timeRemaining={selectedMode === 1 ? pomodoroTimer.timeRemaining : flowmodoroTimer.timeRemaining}
                        bgRigth={bgRigth}
                        bgLeft={bgLeft}
                        selectedMode={selectedMode}
                    />
                </div>
                <div className={`
                    ${modalSetting || modalTask ? 'center lg:justify-end' : 'hidden lg:center'}
                    w-full h-full lg:w-2/3 
                `}>
                    {
                        modalSetting && !isActive && !modalTask &&
                        (
                            <MSettings
                                saveForm={pomodoroTimer.saveTimerForm}
                                flowTime={pomodoroTimer.flowTime}
                                restTime={pomodoroTimer.restTime}
                                longRestTime={pomodoroTimer.longRestTime}
                                timeRemaining={selectedMode === 1 ? pomodoroTimer.timeRemaining : flowmodoroTimer.timeRemaining}
                                autoStart={autoStart}
                                setTimeRemaining={pomodoroTimer.setTimeRemaining}
                                setAutoStart={setAutoStart}
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                                setTimerCount={pomodoroTimer.setTimerCount}
                                requestCompleted={requestCompleted}
                                setRequestCompleted={setRequestCompleted}
                            />
                        )
                    }
                    {
                        modalTask && !modalSetting &&
                        (
                            <MGoals {... { taskList, setTaskList, timeGoal, flowTotalTime }} />
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