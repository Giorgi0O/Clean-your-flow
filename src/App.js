import './App.scss';
import Timer from './components/Timer/Timer';
import Title from './components/Title/Title';
import {useEffect, useState} from 'react';
import InitSession from './components/InitSession/InitSession';


function App() {

  const [bgPink, setBgPink] = useState(15);
  const [bgCiano, setBgCiano] = useState(100);

  const [selectedMode, setSelectedMode] = useState('pomodoro');
  const [isActive, setIsActive] = useState(false);

  const [modalSetting, setModalSetting] = useState(false);
  const [modalTask, setModalTask] = useState(false);

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

  const[endSession, setEndSession] = useState(false);
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


  useEffect( () => {
    if( endSession || initSession )
    {
      setBgPink(50);
      setBgCiano(50);
    }

  }, [endSession, initSession] );

  useEffect( () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('initSession', JSON.stringify(initSession));
    localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
  }, [taskList,timeGoal,pageNumber,initSession] ) 

  return (
    <div className="app bg-moving">
      <button onClick={() => setTimeGoal} style={{display:'none'}}></button>
      <div className='bg-moving-blur'></div>
      <div 
        className='bg-moving-pink'
        style={{width: `${bgPink}%` }}
      ></div>
      <div 
        className='bg-moving-ciano'
        style={{width: `${bgCiano}%` }}
      ></div>
      
      {
        !initSession ?
        (
          <>
            <Title 
              isActive={isActive}
              selectedMode={selectedMode} 
              setSelectedMode={setSelectedMode}
              modalSetting={modalSetting}
              setModalSetting={setModalSetting}
              modalTask={modalTask}
              setModalTask={setModalTask}
            />
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
              endSession={endSession}
              setEndSession={setEndSession}
              setInitSession={setInitSession}
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
            />
          </>
        )
      }
    </div>  );
}

export default App;
