import './Timer.css';
import React, {useState,useEffect} from 'react';
import CountDown from './CountDown/CountDown';
import Settings from '../Modal/Settings';
import TaskList from '../Modal/TaskList';
import CircleButton from '../Buttons/CircleButton';
import FlowmodoroControls from './TimerControls/FlowmodoroControls';
import StartButton from '../Buttons/StartButton';
import { restart } from '../../utils/Common';

function TimerFlowmodoro( { 
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
  const isMobile = useState(window.innerWidth < 1000);

  useEffect(() => {

    if( isActive ){
      const interval = setInterval( () => {
        setTimeRemaining( prev => {
          
          if( timeRemaining === 0 && !flow ){
            setFlow(true);
            setIsActive(false);
          
            return 0;
          }
          
          if( !flow ){
            return timeRemaining -1;
          }
          
          return timeRemaining +1
        });
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [isActive, setIsActive, autoStart, flow, timeRemaining, setTimeRemaining, setFlow]); 

  useEffect(() => {
    if (!flow ) {
      setCountAllFlow((prev) => {
        return prev + 1
      });
    }
  }, [flow,setCountAllFlow]);

  return (
    <div className={ 'timer' } >
        {
          !endSession ?
          (
            <div className='timer-center'>
              <div className={`${isMobile && ( modalSetting || modalTask ) ? 'hide-timer' : 'show-timer' } `}>
                <CountDown 
                  timeRemaining = {timeRemaining}
                  selectedMode={selectedMode}
                />
              </div>
              <div className={` ${ (isMobile && (modalSetting || modalTask)) ? 'modal-space' : 'modal-space-none' }`}>
                {
                  modalSetting && !isActive && !modalTask &&
                  (
                    <Settings
                      timeRemaining={timeRemaining} 
                      setFlow={setFlow}
                      autoStart={autoStart}
                      setAutoStart  = {setAutoStart} 
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
                selectedMode={selectedMode}
                flowTotalTime={flowTotalTime}
              ></TaskList>
            </div>
          )
        }
        <div className='timer-controls'>
          <p className='default-font count-flow color-ligth-pink count-flow'> #{countAllFlow} </p>
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
                <FlowmodoroControls
                  isActive={isActive}
                  setIsActive={setIsActive}
                  flow={flow}
                  setFlow={setFlow}
                  timeRemaning={timeRemaining}
                  setTimeRemaining={setTimeRemaining}
                  autoStart= {autoStart}
                  setFlowTotalTime={setFlowTotalTime}
                />
              )
            }
          </div>
        </div>
    </div>
  );
}

export default TimerFlowmodoro;
