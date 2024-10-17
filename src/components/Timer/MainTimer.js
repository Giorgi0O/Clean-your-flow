import React, { useEffect, useRef, useState, useCallback } from "react";
import CountDown from "./CountDown/CountDown";
import Settings from "../Modal/Settings";
import TaskList from "../Modal/TaskList";
import CircleButton from "../Buttons/CircleButton";
import StartButton from "../Buttons/StartButton";
import PomodoroControls from './TimerControls/PomodoroControls';
import FlowmodoroControls from "./TimerControls/FlowmodoroControls";
import Nosleep from 'nosleep.js';
import { restart } from '../../utils/Common';
import ReportFinal from '../Modal/ReportFinal';
import { useTranslation } from "react-i18next";

//file statici
const clicksound = '/sounds/start-click.wav';
const startFlowSound = '/sounds/start-flow.wav';

function MainTimer({
    selectedMode,
    setSelectedMode,
    taskList,
    timeGoal,
    bgRigth,
    bgLeft,
    setBgRigth,
    setBgLeft,
    endSession,
    setEndSessionRequest,
    createTask,
    deleteTask,
    updateTask,
}){


    const {t} = useTranslation();
    const [autoStart, setAutoStart] = useState( () => {
        const autoStart = localStorage.getItem('autoStart');
        return autoStart ? JSON.parse(autoStart) : 0;
      }
    );

    const [flowTotalTime, setFlowTotalTime] = useState( () => {
        const flowTotalTime = localStorage.getItem('flowTotalTime');
        return flowTotalTime ? JSON.parse(flowTotalTime) : 0;
      }
    )
    
    const [flowTime, setFlowTime] = useState(25*60);
    const [restTime, setRestTime] = useState(5*60);
    const [longRestTime, setLongRestTime] = useState(15*60); 

    const [timerCount, setTimerCount] = useState(0);
    const flow = timerCount % 2 === 0;
    const [flowmoFlow, setFlowmoFlow] = useState(false);
    const calculateInitialTime = () => {
        if (selectedMode === 1) {
            return flow ? flowTime : (timerCount % 7 === 0) ? longRestTime : restTime;
        } else {
            return 0;
        }
    };
    const [currentTime,setCurrentTime] = useState(calculateInitialTime);
    const [timeRemaining, setTimeRemaining] = useState(calculateInitialTime);
    const [isActive, setIsActive] = useState(false);
    const [startAutomation, setStartAutomation] = useState(false);

    const [modalSetting, setModalSetting] = useState(false);
    const [modalTask, setModalTask] = useState(false);

    const requestNotify = useRef(0);

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const interval = useRef(null);
    const savedBgRigth = useRef(0);
    const savedBgLeft = useRef(0);

    useEffect(() => {
        if(isActive){
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

    useEffect( () => {
        localStorage.setItem('autoStart', JSON.stringify(autoStart));
        localStorage.setItem('flowTotalTime', JSON.stringify(flowTotalTime));
    }, [autoStart,flowTotalTime] ) 

    const notify = useCallback( () =>{
        if (document.visibilityState === 'visible') {
            const startSound = new Audio(startFlowSound);
            startSound.play();

            return ;
        }
        if (Notification.permission === "granted") {
            const startSound = new Audio(startFlowSound);
            startSound.play();
        }
        else{
            if(requestNotify.current === 0){
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        const startSound = new Audio(startFlowSound);
                        startSound.play();
                    }

                });

                requestNotify.current = 1;
            }
        }
    },[]);

    const movingBackground = useCallback( (remainingTime, isTimer) =>{
        if( isTimer ){
            let workingTime = (currentTime - remainingTime);
            let movingToRigth = workingTime/currentTime*100 ;
            let movingToLeft = 100 - movingToRigth; 

            if( flow && movingToRigth > savedBgLeft.current ) savedBgLeft.current = 0;
            if( flow && movingToLeft < savedBgRigth.current ) savedBgRigth.current = 0;

            if( !flow && movingToLeft < savedBgLeft.current ) savedBgLeft.current = 0;
            if( !flow && movingToRigth > savedBgRigth.current ) savedBgRigth.current = 0;
            
            if( savedBgLeft.current === 0  && savedBgRigth.current === 0){
                setBgLeft(flow ?  movingToRigth : movingToLeft);
                setBgRigth(flow ? movingToLeft : movingToRigth);
            }
        }
        else{
            let bgMoving = 0.1;

            setBgLeft(prev => Math.min(100, prev+bgMoving));
            setBgRigth(prev => Math.max(0, prev-bgMoving));
        }
    }, [setBgLeft,setBgRigth,currentTime,flow]);

    /* POMODORO TIMER */
    const handleTimerCompletion = useCallback( () =>{
        const newTimerCount = (timerCount + 1) % 8;
        const newFlow = newTimerCount % 2 === 0;
        
        let newTime;
        if (newFlow) newTime = flowTime;
        else newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;

        setCurrentTime(newTime);
        setTimeRemaining(newTime);
        setTimerCount(newTimerCount);

        if (!autoStart) {
            setIsActive(false);
            clearInterval(interval.current);
        }
        else{
            setTimeout( () =>{
                setStartAutomation(true);
            }, 3000)
        }
    }, [timerCount,autoStart, flowTime, longRestTime, restTime]);

    const pomodoroStart = useCallback(() => {
        setIsActive(true);
        setModalSetting(false);
        setModalTask(false);

        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + currentTime * 1000;
        
        if (interval.current) clearInterval(interval.current);
        
        interval.current = setInterval(() => {

            const now = Date.now();
            const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

            movingBackground(remainingTime,true);

            setTimeRemaining(remainingTime);

            if(flow) setFlowTotalTime(prev => prev + 1);
        
            if (remainingTime <= 0) {
                clearInterval(interval.current);
                notify();
                handleTimerCompletion();
            }

        }, 1000);
    }, [currentTime, flow, handleTimerCompletion, movingBackground, notify ]);

    const pomodoroPause = () => {
        setIsActive(false);

        clearInterval(interval.current);

        savedBgLeft.current = bgLeft;
        savedBgRigth.current = bgRigth;

        const remainingTime = currentTime - (currentTime - timeRemaining);
        setCurrentTime(remainingTime);
        setTimeRemaining(remainingTime);
    }
    /* END */

    /* FLOWMODORO TIMER */
    const flowmodoroStart = useCallback( () =>{
        setIsActive(true);
        setFlowmoFlow(true);

        setModalSetting(false);
        setModalTask(false);

        startTimeRef.current = Date.now();
        if( timeRemaining > 0 ) startTimeRef.current = startTimeRef.current - timeRemaining *1000
        
        if( interval ) clearInterval(interval);

        interval.current = setInterval( () => {

            let now = Date.now();
            const elapsed = Math.round((now - startTimeRef.current)/1000);

            setFlowTotalTime(prev => prev + 1);
            
            setTimeRemaining(elapsed);
        },1000)
    }, [timeRemaining ]);

    const flowmodoroPause = () => {
        const buttonSound = new Audio(clicksound);
        buttonSound.play();

        setIsActive(false);
        clearInterval(interval.current);
    }

    const flowmodoroBreath = () =>{
        setIsActive(true);
        setFlowmoFlow(false);
        
        setModalSetting(false);
        setModalTask(false);

        var breathTime = Math.ceil(timeRemaining/5);
        setTimeRemaining(breathTime);

        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + breathTime * 1000;

        if (interval.current) clearInterval(interval.current);
        
        interval.current = setInterval(() => {

            const now = Date.now();
            const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

            movingBackground(remainingTime, true);

            setTimeRemaining(remainingTime);
        
            if (remainingTime <= 0) {
                notify();

                clearInterval(interval.current);

                if(!autoStart){
                    setIsActive(false);
                }
                else{
                    setStartAutomation(true);
                }
            }

        }, 1000);
    }
    /* END */

    useEffect(()=>{
        if(startAutomation){
            if(selectedMode === 1 ) pomodoroStart();
            if(selectedMode === 2 ) flowmodoroStart();

            const buttonSound = new Audio(clicksound);
            buttonSound.play();

            setStartAutomation(false);
        }
    },[startAutomation, selectedMode, pomodoroStart, flowmodoroStart])

    const next = useCallback( () => {
        const buttonSound = new Audio(clicksound);
        buttonSound.play();

        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    
        setTimerCount(prev => {
            const newTimerCount = (prev + 1) % 8;
            const nextFlow = newTimerCount % 2 === 0;
            
            let newTime;
            if (nextFlow) {
                setBgRigth(100);
                setBgLeft(0);
                newTime = flowTime;
            } else {
                setBgRigth(0);
                setBgLeft(100);
                newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;
            }
    
            setTimeRemaining(newTime);
            setCurrentTime(newTime);
            setIsActive(false);
            
            return newTimerCount;
        });
    },[flowTime, longRestTime, restTime ,setBgLeft, setBgRigth]);

    const saveTimerForm = (tempFlowTime, tempRestTime, tempLongRestTime) => {
        if( interval.current ){
            clearInterval(interval.current);
            interval.current = null;
        }

        var remaningTime;
        if( flow ) {
            remaningTime = tempFlowTime - (flowTime - timeRemaining);
        }
        else {
            if ( timerCount%7 === 0 ) {
                remaningTime = tempLongRestTime - (longRestTime - timeRemaining);
            }
            else{
                remaningTime = tempRestTime - (restTime - timeRemaining);
            }
        }

        remaningTime = Math.max(0,remaningTime);

        setFlowTime(tempFlowTime);
        setRestTime(tempRestTime);
        setLongRestTime(tempLongRestTime);
        setTimeRemaining(remaningTime);
        setCurrentTime(remaningTime);
    }

    useEffect(() => {
        if( isActive && 'Notification' in window ){
            Notification.requestPermission();
        }
    }, [isActive]);

    return (
        <div className={ 'z-[100] flex flex-col items-center justify-evenly w-5/6 h-[85%]' } >
            {
                !endSession ?
                (
                    <div className={`flex items-center justify-between w-full h-3/4`}>
                        <div className={`
                            ${ modalSetting || modalTask ? 'hidden lg:center' : 'center' }
                            w-full h-full lg:w-1/3 
                        `}>
                            <CountDown 
                                timeRemaining = {timeRemaining}
                                bgRigth = {bgRigth}
                                bgLeft = {bgLeft}
                                selectedMode={selectedMode}
                            />
                        </div>
                        <div className={`
                            ${ modalSetting || modalTask ? 'center lg:justify-end' : 'hidden lg:center' }
                            w-full h-full lg:w-2/3 
                        `}>
                            {
                            modalSetting && !isActive && !modalTask &&
                            (
                                <Settings
                                    saveForm = {saveTimerForm}
                                    flowTime = {flowTime}
                                    restTime= {restTime}
                                    longRestTime= {longRestTime}
                                    timeRemaining  = {timeRemaining} 
                                    setTimeRemaining={setTimeRemaining}
                                    autoStart={autoStart}
                                    setAutoStart  = {setAutoStart} 
                                    setFlowTime   = {setFlowTime} 
                                    selectedMode={selectedMode}
                                    setSelectedMode={setSelectedMode}
                                    setTimerCount={setTimerCount}
                                />
                            )
                            }
                            {
                            modalTask && !modalSetting &&
                            (
                                <TaskList
                                    taskList={taskList}
                                    timeGoal={timeGoal}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    flowTime={flowTime}
                                    flowTotalTime={flowTotalTime}
                                    endSession={endSession}
                                />
                            )
                            }
                        </div>
                    </div>
                )
                :
                (
                    <div className='w-full h-3/4'>
                        <ReportFinal
                            taskList={taskList}
                            timeGoal={timeGoal}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            flowTime={flowTime}
                            flowTotalTime={flowTotalTime}
                            endSession={endSession}
                        />
                    </div>
                )
            }
            <div className='w-full h-1/3 flex flex-col justify-center items-center'>
                {   selectedMode === 1 &&
                    <p className='font-number text-rosa-light m-1'> #{Math.ceil(flowTotalTime/flowTime)} </p>
                }
                <div className='w-full center '>
                    {
                        !endSession &&
                        <CircleButton 
                            tooltip={t('flow-session.session.tooltip.end')} 
                            iconName={'x'} 
                            color={'secondary'} 
                            operation={() => {
                                setEndSessionRequest(true)
                            }} 
                        />
                    }
                    {
                        !endSession &&
                        <>
                            {
                                !isActive &&
                                <CircleButton 
                                    color={'neutral'} 
                                    tooltip={t('flow-session.session.tooltip.settings') }
                                    iconName={'settings'} 
                                    active={modalSetting} 
                                    operation={() => {
                                        setModalSetting(!modalSetting);
                                        setModalTask(false);
                                    }} 
                                    activeOperation={() => {
                                        setModalSetting(!modalSetting);
                                        setModalTask(false);
                                    }} 
                                />
                            }

                            <CircleButton 
                                color={'primary'} 
                                tooltip={t('flow-session.session.tooltip.task')}
                                iconName={'task-list'} 
                                active={modalTask} 
                                operation={() => {
                                    setModalTask(!modalTask)
                                    setModalSetting(false);
                                }} 
                                activeOperation={() => {
                                    setModalTask(!modalTask)
                                    setModalSetting(false);
                                }} 
                            />
                        </>
                    }
                    {
                        !endSession && selectedMode === 1 &&
                        <CircleButton 
                            color={'secondary'} 
                            tooltip={t('flow-session.session.tooltip.next')}
                            iconName={flow ? 'next' : 'prev-light'} 
                            operation={next}
                        />
                    }
                    {
                        isActive && selectedMode === 2 && flowmoFlow &&
                        (
                            selectedMode === 2 && flowmoFlow &&
                            <CircleButton 
                                tooltip={t('flow-session.session.tooltip.pause')}
                                iconName={'pause'} 
                                color={'neutral'}
                                operation={flowmodoroPause} 
                            />
                        )
                    }
                </div>
                {
                    endSession ?
                    (
                        <StartButton operation={restart} type={2} ></StartButton>
                    )
                    :
                    (
                        selectedMode === 1 ?
                        <PomodoroControls
                            isActive={isActive}
                            endSession={endSession}
                            pomodoroStart={pomodoroStart}
                            pomodoroPause={pomodoroPause}
                            next={next}
                        />
                        :
                        <FlowmodoroControls
                            isActive={isActive}
                            flow={flowmoFlow}
                            flowmodoroStart={flowmodoroStart}
                            flowmodoroBreath={flowmodoroBreath}
                            flowmodoroPause={flowmodoroPause}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default MainTimer;