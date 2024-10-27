import Nosleep from 'nosleep.js';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import React, { useEffect, useState, useCallback } from "react";
import CountDown from "./CountDown";
import MSettings from "./MSettings";
import MGoals from "./MGoals";
import REndSession from '../report/REndSession';
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
    endSession,
    setEndSessionRequest,
}) {

    const [autoStart, setAutoStart] = useLocalStorage('autoStart', 0);
    const [flowTotalTime, setFlowTotalTime] = useLocalStorage('flowTotalTime', 0);
    const [isActive, setIsActive] = useState(false);
    const [startAutomation, setStartAutomation] = useState(false);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalTask, setModalTask] = useState(false);

    const handleTimerComplete = useCallback((autoStart) => {
        if (!autoStart) {
            setIsActive(false);
        } else {
            setTimeout(() => {
                setStartAutomation(true);
            }, 3000);
        }
    }, []);

    /* POMODORO TIMER */
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

    /* FLOWMODORO TIMER */
    const flowmodoroTimer = useFlowmodoroTimer({
        setIsActive,
        setBgLeft,
        setBgRigth,
        autoStart,
        setFlowTotalTime,
        onTimerComplete: handleTimerComplete
    });

    //isActive change operation
    useEffect(() => {
        if (isActive) {
            //chiusura modal
            setModalSetting(false);
            setModalTask(false);

            //richiesta notifiche
            if ('Notification' in window) {
                Notification.requestPermission();
            }

            //gestione not sleep
            let isEnableNoSleep = false;
            const noSleep = new Nosleep();
            document.addEventListener(
                `click`,
                function enableNoSleep() {
                    document.removeEventListener(`click`, enableNoSleep, false);
                    noSleep.enable();
                    isEnableNoSleep = true;
                },
                false
            );
            return () => {
                if (isEnableNoSleep) {
                    noSleep.disable();
                }
            };
        }
    }, [isActive]);

    // autoStart automation
    useEffect(() => {
        if (startAutomation) {
            if (selectedMode === 1) pomodoroTimer.start();
            if (selectedMode === 2) flowmodoroTimer.start();

            playSound('click');

            setStartAutomation(false);
        }
    }, [startAutomation, pomodoroTimer, flowmodoroTimer, selectedMode])

    //## CAPIRE COME GESTIRE QUESTO


    return (
        <div className={'z-[100] flex flex-col items-center justify-evenly w-5/6 h-[85%]'} >
            {
                !endSession ?
                    (
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
                                            timeRemaining={pomodoroTimer.timeRemaining}
                                            autoStart={autoStart}
                                            setTimeRemaining={pomodoroTimer.setTimeRemaining}
                                            setAutoStart={setAutoStart}
                                            selectedMode={selectedMode}
                                            setSelectedMode={setSelectedMode}
                                            setTimerCount={pomodoroTimer.setTimerCount}
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
                    )
                    :
                    (
                        <div className='w-full h-3/4'>
                            <REndSession
                                taskList={taskList}
                                setTaskList={setTaskList}
                                timeGoal={timeGoal}
                                flowTotalTime={flowTotalTime}
                            />
                        </div>
                    )
            }
            <div className='w-full h-1/3 flex flex-col justify-center items-center'>
                {
                    selectedMode === 1 && <p className='font-number text-rosa-light m-1'> #{Math.floor(flowTotalTime / pomodoroTimer.flowTime)} </p>
                }
                <BManager {... { endSession, isActive, selectedMode, setEndSessionRequest, modalSetting, setModalSetting, modalTask, setModalTask, pomodoroTimer, flowmodoroTimer }} />
            </div>
        </div>
    );
}

export default PFSession;