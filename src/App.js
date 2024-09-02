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
  const [endSession, setEndSession] = useState( () => {
      const endSession = localStorage.getItem('endSession');
      return endSession ? JSON.parse(endSession) : false;
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

  const [bgLeft, setBgLeft] = useState( 50 );
  const [bgRigth, setBgRigth] = useState( 50 );
  const bgAnimation = initSession || endSession ? 'bg-opacity-animation' : 'bg-start-rigth-animation' ;
  const [endSessionRequest, setEndSessionRequest] = useState(false);

  useEffect( () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('initSession', JSON.stringify(initSession));
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    localStorage.setItem('selectedMode', JSON.stringify(selectedMode));
    localStorage.setItem('endSession', JSON.stringify(endSession));
  }, [taskList,timeGoal,pageNumber,initSession, selectedMode,endSession] ) 

  useEffect(() => { 
    if(!initSession) {
      setBgLeft(15); setBgRigth(100);
    }
    if(endSession){
      setBgLeft(50); setBgRigth(50);
    }
  },[ initSession, endSession, setBgLeft, setBgRigth])


  /* CRUD TASK LIST */
  const createTask = (title) => {
    if (!title) return;

    setTaskList(prevList => [
      { id: Date.now(), action: title, completed: false },
      ...prevList
    ]);
  };

  const updateTask = ( id ) => {
    if( !id ) return ;

    setTaskList(prevList => prevList.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  const deleteTask = (id) => {
    if (!id) return;

    setTaskList(prevList => prevList.filter(task => task.id !== id));
  };


  return (
    <div className="app bg-moving">
      <div className='bg-moving-blur'></div>
      <div 
        className={`bg-moving-left  bg-color-pink ${bgAnimation} `}
        style={{width: `${bgLeft}%` }}
      ></div>
      <div 
        className={`bg-moving-rigth ${selectedMode === 1 ? 'bg-color-ciano' : 'bg-color-green'} ${bgAnimation} `}
        style={{width: `${bgRigth}%` }}
      ></div>

      <Title />
      {
        initSession ?
        (
          <InitSession 
            taskList={taskList}
            timeGoal={timeGoal}
            setTimeGoal={setTimeGoal}
            setInitSession={setInitSession}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )
        :
        (
          <MainTimer
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            taskList={taskList}
            timeGoal={timeGoal}
            bgRigth={bgRigth}
            bgLeft={bgLeft}
            setBgRigth={setBgRigth}
            setBgLeft={setBgLeft}
            endSession={endSession}
            setEndSessionRequest={setEndSessionRequest}
            createTask={createTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
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
