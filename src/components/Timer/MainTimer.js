import React, { useEffect, useRef, useState, useCallback } from "react";
import CountDown from "./CountDown/CountDown";
import Settings from "../Modal/Settings";
import TaskList from "../Modal/TaskList";
import CircleButton from "../Buttons/CircleButton";
import StartButton from "../Buttons/StartButton";
import PomodoroControls from './TimerControls/PomodoroControls';
import FlowmodoroControls from "./TimerControls/FlowmodoroControls";
import startFlowSound from '../../assets/sounds/start-flow.wav';
import clicksound from '../../assets/sounds/start-click.wav';
import './Timer.css';

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
    restart
}){

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

    const isMobile = useState(window.innerWidth < 1000);
    const requestNotify = useRef(0);

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const interval = useRef(null);

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

    /* POMODORO TIMER */
    const handleTimerCompletion = useCallback( () =>{
        const newTimerCount = (timerCount + 1) % 8;
        const newFlow = newTimerCount % 2 === 0;
        
        let newTime;
        if (newFlow) newTime = flowTime;
        else newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;

        setCurrentTime(newTime);
        setTimeRemaining(newTime);
        if(flow) setFlowTotalTime(prev => prev + flowTime);
        setTimerCount(newTimerCount);

        if (!autoStart) {
            setIsActive(false);
            clearInterval(interval.current);
        }
        else{
            setStartAutomation(true);
        }
    }, [timerCount,autoStart, flow, flowTime, longRestTime, restTime]);

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
            setTimeRemaining(remainingTime);

            let bgMoving = (75/currentTime);
            setBgRigth(prev => flow ? Math.max(15, prev-bgMoving) : Math.min(100, prev+bgMoving) );
            setBgLeft(prev => flow ? Math.min(100, prev+bgMoving) : Math.max(15, prev-bgMoving) );
        
            if (remainingTime <= 0) {
                notify();
                handleTimerCompletion();
            }

        }, 1000);
    }, [currentTime, flow, handleTimerCompletion, notify,setBgRigth, setBgLeft ]);

    const pomodoroPause = () => {
        setIsActive(false);

        clearInterval(interval.current);

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
            setBgRigth(100);
            setBgLeft(15);

            startTimeRef.current = Date.now();
            if( timeRemaining > 0 ) startTimeRef.current = startTimeRef.current - timeRemaining *1000
            
            if( interval ) clearInterval(interval);

            interval.current = setInterval( () => {

                let now = Date.now();
                const elapsed = Math.round((now - startTimeRef.current)/1000);

                var bgMoving = (85/(25*60));
                setBgRigth(prev => Math.min(100, prev+bgMoving) );
                setBgLeft(prev => Math.max(15, prev-bgMoving) );
                
                setTimeRemaining(elapsed);
            },1000)
        }, [ setBgRigth, setBgLeft, timeRemaining ]);

        const flowmodoroPause = () => {
            setIsActive(false);
            clearInterval(interval.current);
        }

        const flowmodoroBreath = () =>{
            setIsActive(true);
            setFlowmoFlow(false);
            
            setModalSetting(false);
            setModalTask(false);
            setBgRigth(15);
            setBgLeft(100);

            setFlowTotalTime(prev => prev + timeRemaining);

            var breathTime = Math.ceil(timeRemaining/5);
            setTimeRemaining(breathTime);

            startTimeRef.current = Date.now();
            endTimeRef.current = startTimeRef.current + breathTime * 1000;

            if (interval.current) clearInterval(interval.current);
            
            interval.current = setInterval(() => {

                const now = Date.now();
                const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));

                setTimeRemaining(remainingTime);

                var bgMoving = (85/breathTime);
                setBgRigth(prev => Math.min( 100, prev+bgMoving ) );
                setBgLeft(prev => Math.max(15, prev-bgMoving) );
            
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

    const next = () => {
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
                setBgLeft(15);
                newTime = flowTime;
            } else {
                setBgRigth(15);
                setBgLeft(100);
                newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;
            }
    
            setTimeRemaining(newTime);
            setCurrentTime(newTime);
            setIsActive(false);
            
            return newTimerCount;
        });
    };

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
        setCurrentTime(flow ? tempFlowTime : (timerCount % 7 === 0 ? tempLongRestTime : tempRestTime));
    }

    useEffect(() => {
        if ('Notification' in window) {
            if(Notification.permission !== "granted" ){
                Notification.requestPermission();
            }
        }
    }, [isActive]);

    return (
        <div className={ 'timer' } >
            {
                !endSession ?
                (
                    <div className={`timer-center`}>
                        <div className={`${isMobile && ( modalSetting || modalTask ) ? 'hide-timer' : 'show-timer' } `}>
                            <CountDown 
                                timeRemaining = {timeRemaining}
                                bgRigth = {bgRigth}
                                bgLeft = {bgLeft}
                                selectedMode={selectedMode}
                            />
                        </div>
                        <div className={` ${ (isMobile && (modalSetting || modalTask)) ? 'modal-space' : 'modal-space-none' }`}>
                            {
                            modalSetting && !isActive && !modalTask &&
                            (
                                <Settings
                                    saveForm = {saveTimerForm}
                                    flowTime = {flowTime}
                                    restTime= {restTime}
                                    longRestTime= {longRestTime}
                                    timeRemaining  = {timeRemaining} 
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
                    <div className='timer-end'>
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
                    </div>
                )
            }
            <div className='timer-controls'>
                {   selectedMode === 1 &&
                    <p className='default-font count-flow color-ligth-pink count-flow'> #{Math.ceil(flowTotalTime/flowTime)} </p>
                }
                <div className='start-stop-buttons'>
                    {
                        !endSession &&
                        <>
                            {
                            !isActive &&
                            <CircleButton color={'ligth-green'} tooltip={'settings'} iconName={'settings'} active={modalSetting} activeColor={'green'}
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
                            <CircleButton color={'ligth-ciano'} tooltip={'View your task'} iconName={'task-list'} active={modalTask} activeColor={'ciano'}
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
                    {
                        !endSession &&
                        <CircleButton tooltip={'End session'} 
                            iconName={'x'} 
                            color={'ligth-pink'} 
                            operation={() => {
                                setEndSessionRequest(true)
                            }} 
                            activeColor={'pink'}
                        ></CircleButton>
                    }
                </div>
            </div>
        </div>
    );
}

export default MainTimer;