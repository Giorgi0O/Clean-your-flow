import React from 'react';
import ISTask from './ISTask';
import ISTime from './ISTime';
import ISMode from './ISMode';
import AnimatedBg from '../../Common/AnimatedBg';
import BPrimary from '../../Common/BPrimary';
import BCircle from '../../Common/BCircle';
import { useTranslation } from 'react-i18next';
import {useLocalStorage} from '../../../utils/useLocalStorage'


function CreateSession({
    setIsCreation, 
    taskList, 
    timeGoal,
    setTimeGoal,
    selectedMode,
    setSelectedMode,
    createTask,
    deleteTask,
    updateTask,
    setEndSessionRequest,
    setReturnHome
}) {

    const {t} = useTranslation();

    const[pageNumber, setPageNumber] = useLocalStorage('pageNumber', 0);

    return (
        <>
            <AnimatedBg/>

            <div className="
                z-[100] flex flex-col w-full h-3/4 justify-evenly items-center overflow-hidden
                lg:flex-row 
            ">
                {
                    pageNumber === 0 && <ISTask taskList={taskList} createTask={createTask} deleteTask={deleteTask} />
                }
                {
                    pageNumber === 1 && <ISTime timeGoal={timeGoal} setTimeGoal={setTimeGoal} />
                }
                {
                    pageNumber === 2 && <ISMode selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
                }
            </div>
            <div className='z-[100] w-full h-[12%] center'>
                {
                    pageNumber === 0 &&
                    <>
                        <BCircle tooltip={t('common.end-session')} iconName={'x'} color={'secondary'} operation={() => { setEndSessionRequest(true); setReturnHome(true);}} />
                        <BPrimary text={t('flow-session.init-session.create-tasks.button')} iconName={'next'} color={ 'ciano' } disab={taskList.length === 0}operation={()=> setPageNumber(prev => prev+1)} />
                    </>
                }
                {
                    pageNumber === 1 && 
                    <>
                        <BCircle tooltip={t('common.button.prev')} iconName={'prev'} color={'secondary'} operation={()=> setPageNumber(prev => prev-1)} />
                        <BPrimary text={t('flow-session.init-session.set-time-goal.button')} iconName={'next'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></BPrimary>
                    </>
                }
                {
                    pageNumber === 2 && 
                    <>
                        <BCircle tooltip={t('common.button.prev')} iconName={'prev'} color={'secondary'} operation={()=> setPageNumber(prev => prev-1)} />
                        <BPrimary text={t('common.button.start')} iconName={'play-end'} color={selectedMode === 1 ? 'primary' : 'success'} operation={()=> {setPageNumber(0); setIsCreation(false);}}/>
                    </>
                }
            </div>
        </>
    );
}

export default CreateSession;