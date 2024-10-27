import React from 'react';
import ISTask from './ISTask';
import ISTime from './ISTime';
import ISMode from './ISMode';
import AnimatedBg from '../../shared/AnimatedBg';
import BPrimary from '../../shared/BPrimary';
import BCircle from '../../shared/BCircle';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { ReactComponent as IconX } from '../../../assets/Icons/x.svg';
import { ReactComponent as IconNext } from '../../../assets/Icons/next.svg';
import { ReactComponent as IconPrev } from '../../../assets/Icons/prev.svg';
import { ReactComponent as IconPlay } from '../../../assets/Icons/play-end.svg';


function CreateSession({
    taskList,
    setTaskList,
    setIsCreation,
    timeGoal,
    setTimeGoal,
    selectedMode,
    setSelectedMode,
    setEndSessionRequest,
    setReturnHome
}) {

    const { t } = useTranslation();

    const [pageNumber, setPageNumber] = useLocalStorage('pageNumber', 0);

    return (
        <>
            <AnimatedBg />

            <div className="
                z-[100] flex flex-col w-full h-3/4 justify-evenly items-center overflow-hidden
                lg:flex-row 
            ">
                {
                    pageNumber === 0 && <ISTask taskList={taskList} setTaskList={setTaskList} />
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
                        <BCircle tooltip={t('common.end-session')} iconName={'x'} color={'secondary'} operation={() => { setEndSessionRequest(true); setReturnHome(true); }} >
                            <IconX className="icon-standard stroke-rosa-dark"></IconX>
                        </BCircle>
                        <BPrimary text={t('flow-session.init-session.create-tasks.button')} iconName={'next'} color={'ciano'} disab={taskList.length === 0} operation={() => setPageNumber(prev => prev + 1)} >
                            <IconNext className='icon-primary stroke-ciano-dark'></IconNext>
                        </BPrimary>
                    </>
                }
                {
                    pageNumber === 1 &&
                    <>
                        <BCircle tooltip={t('common.button.prev')} iconName={'prev'} color={'secondary'} operation={() => setPageNumber(prev => prev - 1)} >
                            <IconPrev className="icon-standard stroke-rosa-dark"></IconPrev>
                        </BCircle>
                        <BPrimary text={t('flow-session.init-session.set-time-goal.button')} iconName={'next'} color={'ciano'} operation={() => setPageNumber(prev => prev + 1)}>
                            <IconNext className='icon-primary stroke-ciano-dark'></IconNext>
                        </BPrimary>
                    </>
                }
                {
                    pageNumber === 2 &&
                    <>
                        <BCircle tooltip={t('common.button.prev')} iconName={'prev'} color={'secondary'} operation={() => setPageNumber(prev => prev - 1)} >
                            <IconPrev className="icon-standard stroke-rosa-dark"></IconPrev>
                        </BCircle>
                        <BPrimary text={t('common.button.start')} color={selectedMode === 1 ? 'primary' : 'success'} operation={() => { setPageNumber(0); setIsCreation(false); }} >
                            <IconPlay className='icon-primary stroke-ciano-dark' ></IconPlay>
                        </BPrimary>
                    </>
                }
            </div>
        </>
    );
}

export default CreateSession;