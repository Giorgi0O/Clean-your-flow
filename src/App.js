import './App.scss';
import Timer from './components/Timer/Timer';
import Title from './components/Title/Title';
import {useEffect, useState} from 'react';
import InitSession from './components/InitSession/InitSession';


function App() {

  /*NON SALVATI IN LOCAL STAORAGE*/
  const [bgPink, setBgPink] = useState(15);
  const [bgCiano, setBgCiano] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [modalSetting, setModalSetting] = useState(false);
  const [modalTask, setModalTask] = useState(false);
  const [endSession, setEndSession] = useState(false);

  /*STATE SALVATI IN LOCAL STORAGE*/
  const [selectedMode, setSelectedMode] = useState(() => {
      const mode = localStorage.getItem('mode');
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

  const loadLocalStorage = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('initSession', JSON.stringify(initSession));
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    localStorage.setItem('selectedMode', JSON.stringify(selectedMode));
    localStorage.setItem('autoStart', JSON.stringify(autoStart));
  };

  useEffect( () => {
    loadLocalStorage();
  }, [taskList,timeGoal,pageNumber,initSession, selectedMode] ) 


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
        className={` bg-moving-rigth bg-color-pink `}
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
              autoStart={autoStart}
              setAutoStart={setAutoStart}
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
            />
          </>
        )
      }
    </div>  );
}

export default App;
