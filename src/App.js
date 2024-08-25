import './App.scss';
import Timer from './components/Timer/Timer';
import Title from './components/Title/Title';
import {useEffect, useState} from 'react';
import InitSession from './components/InitSession/InitSession';


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

  /*NON SALVATI IN LOCAL STAORAGE*/
  const [isActive, setIsActive] = useState(false);
  const [modalSetting, setModalSetting] = useState(false);
  const [modalTask, setModalTask] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState( 25*60);


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
  }, [taskList,timeGoal,pageNumber,initSession, selectedMode,autoStart,bgPink, bgCiano,endSession,flow] ) 


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
      
      {
        !initSession ?
        (
          <>
            {
              endSession ? 
              <Title 
                onlylogo={true}
              />
              :
              <Title 
                isActive={isActive}
                selectedMode={selectedMode} 
                setSelectedMode={setSelectedMode}
                modalSetting={modalSetting}
                setModalSetting={setModalSetting}
                modalTask={modalTask}
                setModalTask={setModalTask}
                endSession={endSession}
                timeRemaining={timeRemaining}
                setTimeRemaining={setTimeRemaining}
                setAutoStart={setAutoStart}
                setFlow={setFlow}
                setBgPink={setBgPink}
                setBgCiano={setBgCiano}
              />
            }
            <Timer 
              isActive={isActive}
              setIsActive={setIsActive}
              bgCiano={bgCiano}
              bgPink={bgPink}
              setBgCiano={setBgCiano}
              setBgPink={setBgPink}
              modalSetting={modalSetting}
              setModalSetting={setModalSetting}
              modalTask={modalTask}
              setModalTask={setModalTask}
              taskList={taskList}
              setTaskList={setTaskList}
              timeGoal={timeGoal}
              setTimeGoal={setTimeGoal}
              endSession={endSession}
              setEndSession={setEndSession}
              setInitSession={setInitSession}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              autoStart={autoStart}
              setAutoStart={setAutoStart}
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              flow={flow}
              setFlow={setFlow}
            />
          </>
        )
        :
        (
          <>
            <Title 
              onlylogo={true}
            />
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
          </>
        )
      }
    </div>  );
}

export default App;
