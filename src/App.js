import './App.scss';
import TimerPomodoro from './components/Timer/TimerPomodoro'
import TimerFlowmodoro from './components/Timer/TimerFlowmodoro'
import Title from './components/Title/Title';
import {useEffect, useState} from 'react';
import InitSession from './components/InitSession/InitSession';
import EndModal from './components/Modal/EndModal';
import startRestAudio from './assets/sounds/start-rest.wav'

function App() {

  /*STATE SALVATI IN LOCAL STORAGE*/
  const [selectedMode, setSelectedMode] = useState(() => {
      const mode = localStorage.getItem('selectedMode');
      return mode ? JSON.parse(mode) : 1;
    }
  );
  const[initSession, setInitSession] = useState(() => {
      const initSession = localStorage.getItem('initSession');
      return initSession ? JSON.parse(initSession) : true;
    }
  );
  const[pageNumber, setPageNumber] = useState(() => {
      const pageNumber = localStorage.getItem('pageNumber');
      return pageNumber ? JSON.parse(pageNumber) : 0;
    }
  );
  const [taskList, setTaskList] = useState(() => {
      const savedTasks = localStorage.getItem('taskList');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
  );
  const [timeGoal, setTimeGoal] = useState(() => {
      const timeGoal = localStorage.getItem('timeGoal');
      return timeGoal ? JSON.parse(timeGoal) : 0;
    }
  );
  const [autoStart, setAutoStart] = useState( () => {
      const autoStart = localStorage.getItem('autoStart');
      return autoStart ? JSON.parse(autoStart) : 0;
    }
  );
  const [bgPink, setBgPink] = useState( () => {
      const bgPink = localStorage.getItem('bgPink');
      return bgPink ? JSON.parse(bgPink) : 15;
    }
  );
  const [bgCiano, setBgCiano] = useState( () => {
      const bgCiano = localStorage.getItem('bgCiano');
      return bgCiano ? JSON.parse(bgCiano) : 15;
    }
  );
  const [endSession, setEndSession] = useState( () => {
      const endSession = localStorage.getItem('endSession');
      return endSession ? JSON.parse(endSession) : false;
    }
  );
  const [flow, setFlow] = useState( () => {
      const flow = localStorage.getItem('flow');
      return flow ? JSON.parse(flow) : true;
    }
  )
  const [flowTotalTime, setFlowTotalTime] = useState( () => {
      const flowTotalTime = localStorage.getItem('flowTotalTime');
      return flowTotalTime ? JSON.parse(flowTotalTime) : 0;
    }
  )
  const [countAllFlow, setCountAllFlow] = useState( () => {
      const countAllFlow = localStorage.getItem('countAllFlow');
      return countAllFlow ? JSON.parse(countAllFlow) : 0;
    }
  )


  /*NON SALVATI IN LOCAL STAORAGE*/
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState( selectedMode === 1 ? 25*60 : 0 );
  const [endSessionRequest, setEndSessionRequest] = useState(false);
  const [flowTime, setFlowTime] = useState(25*60);
  const [restTime, setRestTime] = useState(5*60);
  const [longRestTime, setLongRestTime] = useState(15*60);
  const [bgMoving, setBgMoving] = useState(60 / flowTime );

  /* AUDIO */
  useEffect( () => {
    const startRest = new Audio(startRestAudio);

    if( timeRemaining === 0 && selectedMode === 1 ){
      startRest.play();
    }
    if( timeRemaining === 0 && selectedMode === 2 && !flow){
      startRest.play();
    }

  },[timeRemaining,flow,selectedMode])


  useEffect( () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('initSession', JSON.stringify(initSession));
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    localStorage.setItem('selectedMode', JSON.stringify(selectedMode));
    localStorage.setItem('autoStart', JSON.stringify(autoStart));
    localStorage.setItem('bgPink', JSON.stringify(bgPink));
    localStorage.setItem('bgCiano', JSON.stringify(bgCiano));
    localStorage.setItem('endSession', JSON.stringify(endSession));
    localStorage.setItem('flow', JSON.stringify(flow));
    localStorage.setItem('flowTotalTime', JSON.stringify(flowTotalTime));
    localStorage.setItem('countAllFlow', JSON.stringify(countAllFlow));
  }, [taskList,timeGoal,pageNumber,initSession, selectedMode,autoStart,bgPink, bgCiano,endSession,flow, flowTotalTime, countAllFlow] ) 


  useEffect( () => {
    if( endSession || initSession )
    {
      setBgPink(50);
      setBgCiano(50);
    }
    if( !initSession ){
      setBgPink(15);
      setBgCiano(100);
    }
  }, [endSession, initSession] );

  useEffect(() =>{
    const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
  
    const updateBackgrounds = (isFlow, bgMoving) => {
      setBgCiano(prev => clampValue(prev + (isFlow ? -bgMoving : bgMoving), 15, 100));
      setBgPink(prev => clampValue(prev + (isFlow ? bgMoving : -bgMoving), 15, 100));
    };

    setBgMoving(60/flowTime);

    if (flow) {
      updateBackgrounds(true, bgMoving);
    } else {
      updateBackgrounds(false, bgMoving);
    }
  },[timeRemaining, flowTime, bgMoving,flow]);

  return (
    <div className="app bg-moving">
      <button onClick={() => setTimeGoal} style={{display:'none'}}></button>
      <div className='bg-moving-blur'></div>
      <div 
        className={` bg-moving-rigth ${selectedMode === 1 ? 'bg-color-pink' : 'bg-color-ciano'} `}
        style={{width: `${bgPink}%` }}
      ></div>
      <div 
        className={`bg-moving-left ${selectedMode === 1 ? 'bg-color-ciano' : 'bg-color-green'}`}
        style={{width: `${bgCiano}%` }}
      ></div>

      <Title 
        setIsActive={setIsActive}
        setEndSessionRequest={setEndSessionRequest}
        initSession={initSession}
        endSession={endSession}
      />

      {
        initSession ?
        (
          <InitSession 
            taskList={taskList}
            setTaskList={setTaskList}
            timeGoal={timeGoal}
            setTimeGoal={setTimeGoal}
            setInitSession={setInitSession}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            setAutoStart={setAutoStart}
            setTimeRemaining={setTimeRemaining}
          />
        )
        :
        (
          (
            selectedMode === 1 ?
            (
              <TimerPomodoro 
                flowTime={flowTime}
                setFlowTime={setFlowTime}
                restTime={restTime}
                setRestTime={setRestTime}
                longRestTime={longRestTime}
                setLongRestTime={setLongRestTime}
                isActive={isActive}
                setIsActive={setIsActive}
                flow={flow}
                setFlow={setFlow}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}

                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                autoStart={autoStart}
                setAutoStart={setAutoStart}

                taskList={taskList}
                setTaskList={setTaskList}
                timeGoal={timeGoal}
                endSession={endSession}
                flowTotalTime={flowTotalTime}
                setFlowTotalTime={setFlowTotalTime}
                countAllFlow={countAllFlow}
                setCountAllFlow={setCountAllFlow}
              />
            )
            :
            (
              <TimerFlowmodoro 
                isActive={isActive}
                setIsActive={setIsActive}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                flow={flow}
                setFlow={setFlow}

                taskList={taskList}
                setTaskList={setTaskList}
                timeGoal={timeGoal}
                endSession={endSession}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                autoStart={autoStart}
                setAutoStart={setAutoStart}
                flowTotalTime={flowTotalTime}
                setFlowTotalTime={setFlowTotalTime}
                countAllFlow={countAllFlow}
                setCountAllFlow={setCountAllFlow}
              />
            )
          )
        )
      }
      <EndModal 
        endSessionRequest={endSessionRequest} 
        setEndSessionRequest={setEndSessionRequest} 
        setEndSession={setEndSession} 
      />
    </div>  );
}

export default App;
