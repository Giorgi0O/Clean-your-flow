import Header from '../components/shared/Header';
import { useEffect, useState } from 'react';
import CreateSession from '../components/page-flow-session/create-session/Create';
import PFSession from '../components/page-flow-session/session/PFSession';
import EndModal from '../components/shared/MEnd';
import AnimatedBg2 from '../components/shared/AnimatedBg2'
import { useLocalStorage } from '../hooks/useLocalStorage'

function FlowSession() {

  const [selectedMode, setSelectedMode] = useLocalStorage('selectedMode', 1);
  const [endSession, setEndSession] = useLocalStorage('endSession', false);
  const [isCreation, setIsCreation] = useLocalStorage('isCreation', true);
  const [taskList, setTaskList] = useLocalStorage('taskList', []);
  const [timeGoal, setTimeGoal] = useLocalStorage('timeGoal', 0);

  const [bgLeft, setBgLeft] = useState(0);
  const [bgRigth, setBgRigth] = useState(0);
  const [endSessionRequest, setEndSessionRequest] = useState(false);
  const [returnHome, setReturnHome] = useState(false);

  useEffect(() => {
    if (!isCreation || !endSession) {
      setBgLeft(0); setBgRigth(100);
    }
    if (endSession) {
      setBgLeft(50); setBgRigth(50);
    }
  }, [isCreation, endSession, setBgLeft, setBgRigth])

  useEffect(() => {
    if (endSession || taskList.length === 0) return;

    const handleEventBeforeUnload = (event) => {
      event.preventDefault();

      return (event.returnValue = '')
    }

    window.addEventListener('beforeunload', handleEventBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleEventBeforeUnload);
    }
  }, [])

  return (
    <div className="flex flex-col w-screen h-screen items-center overflow-hidden">
      {
        !isCreation && <AnimatedBg2 bgLeft={bgLeft} bgRigth={bgRigth} selectedMode={selectedMode} />
      }
      <Header />
      {
        isCreation ?
          <CreateSession
            {...{ taskList, setTaskList, timeGoal, setTimeGoal, setIsCreation, selectedMode, setSelectedMode, setEndSessionRequest, setReturnHome }}
          />
          :
          <PFSession
            {...{ taskList, setTaskList, selectedMode, setSelectedMode, timeGoal, bgRigth, bgLeft, setBgRigth, setBgLeft, endSession, setEndSessionRequest }}
          />
      }
      {
        endSessionRequest &&
        <EndModal
          {...{ endSessionRequest, setEndSessionRequest, setEndSession, returnHome }}
        />
      }
    </div>);
}

export default FlowSession;