import './Timer.css';
import React, {useState,useEffect} from 'react';
import CountDown from './CountDown/CountDown';
import TimerControls from './TimerControls/TimerControls';
import Settings from '../Modal/Settings';
import TaskList from '../Modal/TaskList';
import EndModal from '../Modal/EndModal'


function Timer( { 
  isActive, 
  setIsActive, 
  bgPink, 
  bgCiano, 
  setBgPink, 
  setBgCiano,
  modalSetting,
  setModalSetting,
  modalTask,
  setModalTask,
  taskList,
  setTaskList,
  timeGoal,
  setTimeGoal,
  endSession,
  setEndSession,
  setInitSession,
  selectedMode,
  autoStart,
  setAutoStart
}) {


  const [flowTime, setFlowTime] = useState(25*60);
  const [restTime, setRestTime] = useState(5*60);
  const [longRestTime, setLongRestTime] = useState(15*60);
  const [flowmodoroCount, setFlowmodoroCount] = useState(0);
  
  const [bgMoving, setBgMoving] = useState(60 / flowTime );
  const [timeRemaining, setTimeRemaining] = useState( selectedMode === 1 ? flowTime : flowmodoroCount);
  const [flow, setFlow] = useState(true);
  const [countOfFlow, setCountOfFlow] = useState(0);
  const [flowTotalTime, setFlowTotalTime] = useState(0);
  const [countAllFlow, setCountAllFlow] = useState(0);
  const [isRealTime, setIsRealTime] = useState(true);
  const [isLongRest, setIsLongRest] = useState(false);

  const [endSessionRequest, setEndSessionRequest] = useState(false);

  const pomodoroTimer = () => {
    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateBackgrounds = (isFlow, bgMoving) => {
      setBgCiano(prev => clampValue(prev + (isFlow ? -bgMoving : bgMoving), 15, 100));
      setBgPink(prev => clampValue(prev + (isFlow ? bgMoving : -bgMoving), 15, 100));
    };

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
        setBgMoving( 65 / nextTime);

        return nextTime;
      }
      else{
        if (flow) {
          updateBackgrounds(true, bgMoving);
        } else {
          updateBackgrounds(false, bgMoving);
        }

        return secondsLeft -1;
      }
    });
  }

  const flowmodoroTimer = () => {

    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateBackgrounds = (isFlow, bgMoving) => {
      setBgCiano(prev => clampValue(prev + (isFlow ? -bgMoving : bgMoving), 15, 100));
      setBgPink(prev => clampValue(prev + (isFlow ? bgMoving : -bgMoving), 15, 100));
    };

    setTimeRemaining( prev => {

      updateBackgrounds(flow, bgMoving);
      
      if( timeRemaining === 0 && !flow ){
        setFlow(true);
        setIsActive(false);
      
        return 0;
      }
      
      if( !flow ){
        return timeRemaining -1;
      }
      
      return timeRemaining +1
    } );
  }

  useEffect(() => {
    if( isActive ){
      const interval = setInterval( () => {
        if( selectedMode === 1 ){
          pomodoroTimer();
        }
  
        if( selectedMode === 2 ){
          flowmodoroTimer();
        }
      }, 1000)

      return () => clearInterval(interval);
    }
  }, [isActive,setIsActive, flowTime, restTime, autoStart,flow, timeRemaining, isLongRest,longRestTime, bgMoving, countAllFlow ,setBgCiano, setBgPink]); 

  useEffect(() => {
    if (!flow ) {
        setCountAllFlow((prev) => {
            setIsLongRest( (prev+1)%4 === 0 ? true : false );

            return prev + 1
        });

        if( isRealTime ){
            setCountOfFlow((prev) => prev + 1);
        }
    }
  }, [flow, isRealTime]);

  const restart = () => {
    setEndSessionRequest(false);
    setCountAllFlow(0);
    setCountOfFlow(0);
    setEndSession(false);
    setEndSessionRequest(false);
    setFlow(true);
    setBgPink(15);
    setBgCiano(100);
    setBgMoving(60/timeRemaining);
    setModalSetting(false);
    setModalTask(false);
    setInitSession(true);
    setTaskList([]);
    setTimeGoal(0);
    setTimeRemaining(0);
  }

  return (
    <div className={ 'timer' } >
        {
          !endSession ?
          (
            <div className='timer-center'>
              <CountDown 
                  timeRemaining = {timeRemaining}
                  bgCiano={bgCiano}
                  bgPink={bgPink}
              />
              {
                modalSetting && !isActive && !modalTask &&
                (
                  <Settings
                    flowTime = {flowTime}
                    restTime= {restTime}
                    longRestTime= {longRestTime}
                    timeRemaining  = {timeRemaining} 
                    flow  = {flow}
                    isLongRest= {isLongRest}
                    autoStart={autoStart}
                    setBgMoving = {setBgMoving}
                    setAutoStart  = {setAutoStart} 
                    setFlowTime   = {setFlowTime} 
                    setRestTime   = {setRestTime}
                    setLongRestTime = {setLongRestTime}
                    setTimeRemaining= {setTimeRemaining}
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
        <TimerControls 
          flowTime={flowTime}
          restTime={restTime}
          longRestTime={longRestTime}
          isActive={isActive}
          flow={flow}
          countOfFlow={countOfFlow}
          countAllFlow={countAllFlow}
          timeRemaning={timeRemaining}
          setTimeRemaining={setTimeRemaining}
          flowmodoroCount={flowmodoroCount}
          setFlowmodoroCount={setFlowmodoroCount}
          selectedMode={selectedMode}
          setIsActive={setIsActive}
          setFlow={setFlow}
          setIsRealTime={setIsRealTime}
          bgCiano={bgCiano}
          bgPink={bgPink}
          setBgMoving={setBgMoving}
          setBgCiano={setBgCiano}
          setBgPink={setBgPink}
          setEndSessionRequest={setEndSessionRequest}
          endSession={endSession}
          restart={restart}
          autoStart= {autoStart}
          setFlowTotalTime={setFlowTotalTime}
        />
        <EndModal endSessionRequest={endSessionRequest} setEndSessionRequest={setEndSessionRequest} setEndSession={setEndSession}></EndModal>
    </div>
  );
}

export default Timer;
