import Header from '../components/shared/Header';
import { useEffect, useState } from 'react';
import CreateSession from '../components/page-flow-session/create-session/Create';
import PFSession from '../components/page-flow-session/session/PFSession';
import AnimatedBg2 from '../components/shared/AnimatedBg2'
import useLocalStorage from '../hooks/useLocalStorage';
import MEnd from '../components/shared/MEnd';
import MEndTaskCompleted from '../components/shared/MEndTaskCompleted';
import EndSession from '../components/page-flow-session/end-session/EndSession';

function FlowSession() {

  const [selectedMode, setSelectedMode] = useLocalStorage('selectedMode', 1);
  const [endSession, setEndSession] = useLocalStorage('endSession', false);
  const [isCreation, setIsCreation] = useLocalStorage('isCreation', true);
  const [taskList, setTaskList] = useLocalStorage('taskList', []);
  const [timeGoal, setTimeGoal] = useLocalStorage('timeGoal', 0);
  const [flowTotalTime, setFlowTotalTime] = useLocalStorage('flowTotalTime', 0);

  const [bgLeft, setBgLeft] = useState(100);
  const [bgRigth, setBgRigth] = useState(0);
  const [endSessionRequest, setEndSessionRequest] = useState(false);
  const [endTaskCompletedRequest, setEndTaskCompletedRequest] = useState(false);
  const [awaitEndResponse, setAwaitEndResponse] = useState(false);
  const [returnHome, setReturnHome] = useState(false);

  const handleRestart = () => {
    setEndSession(false);
    setIsCreation(true);

    setTimeGoal(0);
    setTaskList(prev => prev.filter(task => !task.completed));

    setFlowTotalTime(0);
  }

  useEffect(() => {

    if (!isCreation || !endSession) {
      setBgLeft(0); setBgRigth(100);
    }
    if (endSession) {
      setBgLeft(35); setBgRigth(35);
    }
  }, [isCreation, endSession, setBgLeft, setBgRigth])

  useEffect(() => {
    if (endTaskCompletedRequest) setAwaitEndResponse(true);
    else setAwaitEndResponse(false);

  }, [endSessionRequest, endTaskCompletedRequest, setAwaitEndResponse])

  return (
    <div className="flex flex-col w-screen h-screen items-center overflow-hidden">
      {
        !isCreation && <AnimatedBg2 bgLeft={bgLeft} bgRigth={bgRigth} selectedMode={selectedMode} />
      }
      {
        <MEnd {...{ endSessionRequest, setEndSessionRequest, setEndSession, returnHome }} />
      }
      {
        endTaskCompletedRequest && <MEndTaskCompleted {...{ endTaskCompletedRequest, setEndTaskCompletedRequest, setEndSession }} />
      }

      <Header />
      {
        isCreation &&
        <CreateSession {...{ taskList, setTaskList, timeGoal, setTimeGoal, setIsCreation, selectedMode, setSelectedMode, setEndSessionRequest, setReturnHome }} />
      }
      {
        !isCreation && !endSession &&
        <PFSession {...{ taskList, setTaskList, selectedMode, setSelectedMode, timeGoal, setBgRigth, setBgLeft, setEndSessionRequest, flowTotalTime, setFlowTotalTime, awaitEndResponse, setEndTaskCompletedRequest }} />
      }
      {
        endSession &&
        <EndSession taskList={taskList} setTaskList={setTaskList} timeGoal={timeGoal} flowTotalTime={flowTotalTime} handleRestart={handleRestart} />
      }
    </div>);
}

export default FlowSession;