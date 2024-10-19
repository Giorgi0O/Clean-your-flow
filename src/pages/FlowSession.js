import Header from '../components/Common/Header';
import {useEffect, useState} from 'react';
import CreateSession from '../components/FlowSession/CreateSession/Create';
import EndModal from '../components/Common/MEnd';
import PFSession from '../components/FlowSession/Session/PFSession';
import AnimatedBg2 from '../components/Common/AnimatedBg2'

//function
import {getLocalStorageItem} from '../utils/localStorageManager'

function FlowSession() {

  /*STATE che rimangono*/
  const [selectedMode, setSelectedMode] = useState( getLocalStorageItem('selectedMode', 1));
  const [endSession, setEndSession] = useState( getLocalStorageItem('endSession',false));
  const [isCreation, setIsCreation] = useState( getLocalStorageItem('isCreation',true));
  const [taskList, setTaskList] = useState( getLocalStorageItem('taskList',[] ));
  const [timeGoal, setTimeGoal] = useState( getLocalStorageItem('timeGoal',0));

  const [bgLeft, setBgLeft] = useState( 0 );
  const [bgRigth, setBgRigth] = useState( 0 );
  const [endSessionRequest, setEndSessionRequest] = useState(false);
  const [returnHome, setReturnHome] = useState(false);

  useEffect( () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
    localStorage.setItem('timeGoal', JSON.stringify(timeGoal));
    localStorage.setItem('isCreation', JSON.stringify(isCreation));
    localStorage.setItem('selectedMode', JSON.stringify(selectedMode));
    localStorage.setItem('endSession', JSON.stringify(endSession));
  }, [taskList,timeGoal,isCreation, selectedMode,endSession] ) 

  useEffect(() => { 
    if( !isCreation || !endSession ){
      setBgLeft(0); setBgRigth(100);
    }
    if(endSession){
      setBgLeft(50); setBgRigth(50);
    }
  },[ isCreation, endSession, setBgLeft, setBgRigth])

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
    <div className="flex flex-col w-screen h-screen items-center overflow-hidden">
      {
        !isCreation && <AnimatedBg2 bgLeft={bgLeft} bgRigth={bgRigth} selectedMode={selectedMode} />
      }

      <Header />
      {
        isCreation ?
          <CreateSession
            {...{ taskList, timeGoal, setTimeGoal, setIsCreation, selectedMode, setSelectedMode, createTask, deleteTask, updateTask, setEndSessionRequest, setReturnHome }}
          />
        :
          <PFSession
            {...{selectedMode, setSelectedMode, taskList, timeGoal, bgRigth, bgLeft, setBgRigth, setBgLeft, endSession, setEndSessionRequest, createTask, deleteTask, updateTask }}
          />
      }
      {
        endSessionRequest &&
          <EndModal 
            { ...{endSessionRequest,setEndSessionRequest,setEndSession,returnHome}}
          />
      }
    </div>  );
}

export default FlowSession;