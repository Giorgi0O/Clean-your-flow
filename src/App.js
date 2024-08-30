import './App.scss';
import Title from './components/Title/Title';
import {useEffect, useState} from 'react';
import InitSession from './components/InitSession/InitSession';
import EndModal from './components/Modal/EndModal';
import MainTimer from './components/Timer/MainTimer';
import { restart } from './utils/Common';

function App() {

  /*STATE che rimangono*/
  const [selectedMode, setSelectedMode] = useState(() => {
      const mode = localStorage.getItem('selectedMode');
      return mode ? JSON.parse(mode) : 1;
    }
  );
  const [bgPink, setBgPink] = useState( 15 );
  const [bgCiano, setBgCiano] = useState( 100 );
  const [endSession, setEndSession] = useState( () => {
      const endSession = localStorage.getItem('endSession');
      return endSession ? JSON.parse(endSession) : false;
    }
  );
  const [endSessionRequest, setEndSessionRequest] = useState(false);
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

  useEffect( () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('initSession', JSON.stringify(initSession));
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    localStorage.setItem('selectedMode', JSON.stringify(selectedMode));
    localStorage.setItem('endSession', JSON.stringify(endSession));
  }, [taskList,timeGoal,pageNumber,initSession, selectedMode,endSession] ) 

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
          />
        )
        :
        (
          <MainTimer
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            taskList={taskList}
            setTaskList={setTaskList}
            timeGoal={timeGoal}
            setBgCiano={setBgCiano}
            setBgPink={setBgPink}
            endSession={endSession}
            restart = {restart}
          />
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
