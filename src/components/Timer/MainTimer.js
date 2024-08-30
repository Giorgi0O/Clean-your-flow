import React, { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown/CountDown";
import Settings from "../Modal/Settings";
import TaskList from "../Modal/TaskList";
import CircleButton from "../Buttons/CircleButton";
import StartButton from "../Buttons/StartButton";
import PomodoroControls from './TimerControls/PomodoroControls';
import FlowmodoroControls from "./TimerControls/FlowmodoroControls";
import { useCallback } from "react";
import startFlowSound from '../../assets/sounds/start-flow.wav';
import clicksound from '../../assets/sounds/start-click.wav';

function MainTimer({
    selectedMode,
    setSelectedMode,
    taskList,
    setTaskList,
    timeGoal,
    setBgCiano,
    setBgPink,
    endSession,
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

    useEffect( () => {
        localStorage.setItem('autoStart', JSON.stringify(autoStart));
        localStorage.setItem('flowTotalTime', JSON.stringify(flowTotalTime));
    }, [autoStart,flowTotalTime] ) 
    
    const [flowTime, setFlowTime] = useState(25);
    const [restTime, setRestTime] = useState(5);
    const [longRestTime, setLongRestTime] = useState(15); 

    const [TimerCount, setTimerCount] = useState(0);
    const flow = TimerCount % 2 === 0;
    const [currentTime,setCurrentTime] = useState(flow ? flowTime : (TimerCount%7 === 0 ) ? longRestTime : restTime);

    const [isActive, setIsActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(flow ? flowTime : (TimerCount%7 === 0 ) ? longRestTime : restTime);
    const [modalSetting, setModalSetting] = useState(false);
    const [modalTask, setModalTask] = useState(false);
    const [startAutomation, setStartAutomation] = useState(false);

    const isMobile = useState(window.innerWidth < 1000);

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const interval = useRef(null);

    /* POMODORO TIMER */
        const handleTimerCompletion = useCallback( () =>{
            const newTimerCount = (TimerCount + 1) % 8;
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
        }, [TimerCount,autoStart, flow, flowTime, longRestTime, restTime]);

        const pomodoroStart = useCallback(() => {
            setIsActive(true);
            setModalSetting(false);
            setModalTask(false);

            startTimeRef.current = Date.now();
            endTimeRef.current = startTimeRef.current + currentTime * 1000;

            let bgMoving = (75/currentTime);
            
            if (interval.current) clearInterval(interval.current);
            
            interval.current = setInterval(() => {

                const now = Date.now();
                const remainingTime = Math.max(0, Math.round((endTimeRef.current - now) / 1000));
                setTimeRemaining(remainingTime);

                setBgCiano(prev => flow ? Math.max(15, prev-bgMoving) : Math.min(100, prev+bgMoving) );
                setBgPink(prev => flow ? Math.min(100, prev+bgMoving) : Math.max(15, prev-bgMoving) );
            
                if (remainingTime <= 0) {
                    const startSound = new Audio(startFlowSound);
                    startSound.play();
                    handleTimerCompletion();
                }

            }, 1000);
        }, [currentTime, flow, handleTimerCompletion,setBgCiano, setBgPink]);

   
        useEffect(()=>{
            if(startAutomation){
                pomodoroStart();
                const buttonSound = new Audio(clicksound);
                buttonSound.play();
                setStartAutomation(false);
            }
        },[startAutomation, pomodoroStart])

        const pomodoroPause = () => {
            setIsActive(false);

            clearInterval(interval.current);

            const remainingTime = currentTime - (currentTime - timeRemaining);
            setCurrentTime(remainingTime);
            setTimeRemaining(remainingTime);
        }
    /* END */



    const flowmodoroStart = () =>{
        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + currentTime * 1000;

        if( interval ) clearInterval(interval);
        interval.current = setInterval( () => {
            let now = Date.now();
            const elapsed = Math.round((now - startTimeRef.current) / 1000);
            
            setTimeRemaining(elapsed);  
        },1000)
    }

    const flowmodoroBreath = () =>{
        startTimeRef.current = Date.now();
        endTimeRef.current = startTimeRef.current + currentTime * 1000;

        if( interval ) clearInterval(clearInterval);
        interval.current = setInterval( () => {
            let now = Date.now();

            const remaningTime = Math.max(0, Math.round((endTimeRef.current - now ) /1000) );
            setTimeRemaining(remaningTime);

            if(remaningTime <= 0){
                setFlowTotalTime(prev => prev+flowTime)
                setTimerCount( prev => (prev + 1) % 8);
                if( !autoStart ){
                    setIsActive(false);
                }
            }
        },1000)
    }

    const next = () => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    
        setTimerCount(prev => {
            const newTimerCount = (prev + 1) % 8;
            const nextFlow = newTimerCount % 2 === 0;
            
            let newTime;
            console.log(nextFlow);
            if (nextFlow) {
                setBgCiano(100);
                setBgPink(15);
                newTime = flowTime;
            } else {
                setBgCiano(15);
                setBgPink(100);
                newTime = (newTimerCount % 7 === 0) ? longRestTime : restTime;
            }
    
            setTimeRemaining(newTime);
            setCurrentTime(newTime);
            setIsActive(false);
            
            return newTimerCount;
        });
    };

    return (
        <div className={ 'timer' } >
            {
                !endSession ?
                (
                    <div className={`timer-center`}>
                        <div className={`${isMobile && ( modalSetting || modalTask ) ? 'hide-timer' : 'show-timer' } `}>
                            <CountDown 
                                timeRemaining = {timeRemaining}
                                restTime = {restTime}
                                longRestTime={longRestTime}
                                selectedMode={selectedMode}
                            />
                        </div>
                        <div className={` ${ (isMobile && (modalSetting || modalTask)) ? 'modal-space' : 'modal-space-none' }`}>
                            {
                            modalSetting && !isActive && !modalTask &&
                            (
                                <Settings
                                    flowTime = {flowTime}
                                    restTime= {restTime}
                                    longRestTime= {longRestTime}
                                    timeRemaining  = {timeRemaining} 
                                    flow  = {flow}
                                    autoStart={autoStart}
                                    setAutoStart  = {setAutoStart} 
                                    setFlowTime   = {setFlowTime} 
                                    setRestTime   = {setRestTime}
                                    setLongRestTime = {setLongRestTime}
                                    setTimeRemaining= {setTimeRemaining}
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
                                    setTaskList={setTaskList}
                                    flowTime={flowTime}
                                    selectedMode={selectedMode}
                                    flowTotalTime={flowTotalTime}
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
                            setTaskList={setTaskList}
                            flowTime={flowTime}
                            selectedMode={selectedMode}
                            flowTotalTime={flowTotalTime}
                        ></TaskList>
                    </div>
                )
            }
            <div className='timer-controls'>
                <p className='default-font count-flow color-ligth-pink count-flow'> #{flowTotalTime/flowTime} </p>
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
                                setIsActive={setIsActive}
                                setTimerCount={setTimerCount}
                                flow={flow}
                                timeRemaining={timeRemaining}
                                setTimeRemaining={setTimeRemaining}
                                setCurrentTime={setCurrentTime}
                                handleStart={flowmodoroStart}
                                handleBreath={flowmodoroBreath}
                                interval={interval}
                            />
                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default MainTimer;