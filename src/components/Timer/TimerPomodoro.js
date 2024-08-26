import './Timer.css';
import React, {useState,useEffect} from 'react';
import CountDown from './CountDown/CountDown';
import Settings from '../Modal/Settings';
import TaskList from '../Modal/TaskList';
import CircleButton from '../Buttons/CircleButton';
import PomodoroControls from './TimerControls/PomodoroControls';
import StartButton from '../Buttons/StartButton';
import { restart } from '../../utils/Common';


function TimerPomodoro( { 
  flowTime,
  setFlowTime,
  restTime,
  setRestTime,
  longRestTime,
  setLongRestTime,
  isActive, 
  setIsActive, 
  timeRemaining,
  setTimeRemaining,
  flow,
  setFlow,
  taskList,
  setTaskList,
  timeGoal,
  endSession,
  selectedMode,
  setSelectedMode,
  autoStart,
  setAutoStart,
  flowTotalTime,
  setFlowTotalTime,
  countAllFlow,
  setCountAllFlow

}) {

  const [modalSetting, setModalSetting] = useState(false);
  const [modalTask, setModalTask] = useState(false);
  const [countOfFlow, setCountOfFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(true);
  const [isLongRest, setIsLongRest] = useState(false);
  const isMobile = useState(window.innerWidth < 1000);



  useEffect(() => {

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const executeEffect = async () => {
        await sleep(4000);
    };

    if( isActive ){
      const interval = setInterval( () => {
        setTimeRemaining( (secondsLeft) => {
            if(secondsLeft === 0){
            
              var nextTime;
      
              setFlow(!flow);
              setIsRealTime(true);
      
              nextTime  = flow ? restTime: flowTime;
      
              if( (countAllFlow+1)%4 === 0 && flow ){
                  nextTime = longRestTime;
              } 
              if( !autoStart ){
                  setIsActive(false);
              }
              else{
                executeEffect();
              }
      
              return nextTime;
            }
            else{
              return secondsLeft -1;
            }
        });
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [isActive,setIsActive, flowTime, restTime, autoStart,flow, timeRemaining, isLongRest,longRestTime, countAllFlow , selectedMode, setTimeRemaining, setFlow]); 

  useEffect(() => {
    if (!flow ) {
        setCountAllFlow((prev) => {
            setIsLongRest( (prev+1)%4 === 0 ? true : false );
            return prev + 1
        });

        if( isRealTime ){
            setCountOfFlow((prev) => prev + 1);
            setFlowTotalTime( prev => prev + flowTime);
        }
    }
  }, [flow, isRealTime,setCountAllFlow, setIsLongRest , flowTime, setFlowTotalTime]);

  const next = () => {
    setFlow(!flow);

    var nextTime  = flow ? restTime: flowTime;
    if( (countAllFlow+1) % 4 === 0 && flow ){
      nextTime = longRestTime;
    } 
    setTimeRemaining( nextTime );
    
    setIsRealTime(false);
  }

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
                      setFlow={setFlow}
                      isLongRest= {isLongRest}
                      autoStart={autoStart}
                      setAutoStart  = {setAutoStart} 
                      setFlowTime   = {setFlowTime} 
                      setRestTime   = {setRestTime}
                      setLongRestTime = {setLongRestTime}
                      setTimeRemaining= {setTimeRemaining}
                      selectedMode={selectedMode}
                      setSelectedMode={setSelectedMode}
                    ></Settings>
                  )
                }
                {
                  modalTask && !modalSetting &&
                  (
                    <TaskList
                      taskList={taskList}
                      timeGoal={timeGoal}
                      setTaskList={setTaskList}
                      countOfFlow={countOfFlow}
                      flowTime={flowTime}
                      selectedMode={selectedMode}
                      flowTotalTime={flowTotalTime}
                    ></TaskList>
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
                countOfFlow={countOfFlow}
                flowTime={flowTime}
                selectedMode={selectedMode}
                flowTotalTime={flowTotalTime}
              ></TaskList>
            </div>
          )
        }
        <div className='timer-controls'>
          <p className='default-font count-flow color-ligth-pink count-flow'> #{countOfFlow} </p>
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
                <PomodoroControls 
                    isActive={isActive}
                    setIsActive={setIsActive}
                />
              )
            }
            {
              !endSession &&
              <CircleButton color={'ligth-pink'} tooltip={'next'} iconName={'next'} operation={next}></CircleButton>
            }
          </div>
        </div>
    </div>
  );
}

export default TimerPomodoro;
