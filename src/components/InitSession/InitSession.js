import React, {useState, useEffect} from 'react';
import CreateAction from './CreateAction';
import TimeGoalSetting from './TimeGoalSetting';
import ModeSetting from './ModeSetting';
import BgLeftGradient from '../AnimatedBackground/BgLeftGradient';
import Button from '../Buttons/Button';
import ContentBox from '../AppText/ContentBox';
import CircleButton from '../Buttons/CircleButton';
import { useTranslation } from 'react-i18next';

function InitSession({
    setInitSession, 
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

    const[pageNumber, setPageNumber] = useState(() => {
        const pageNumber = localStorage.getItem('pageNumber');
        return pageNumber ? JSON.parse(pageNumber) : 0;
      }
    );

    useEffect( () => {
        localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    }, [pageNumber] ) 

    const bodyClass = 'font-corpo text-sm lg:text-lg mt-2 lg:mt-6 text-ciano-dark'
    const titleClass = 'font-titolo font-bold text-lg md:text-3xl text-ciano-dark'

    return (
        <>
            <BgLeftGradient/>
            <div className="
                z-[100] flex flex-col w-full h-3/4  justify-evenly items-center overflow-hidden
                lg:flex-row 
            ">
                <div className={`
                    w-full h-auto center p-8
                    lg:w-1/2 lg:h-full
                `}>
                    {
                        pageNumber === 0 &&
                        <div className='center text-center lg:text-left'>

                            <ContentBox
                                title={
                                    <>
                                        {t('flow-session.init-session.create-tasks.title')}
                                    </>
                                } 
                                body={
                                    <>
                                        {t('flow-session.init-session.create-tasks.body')}                                    
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
                        </div>
                    }
                    {
                        pageNumber === 1 &&
                            <TimeGoalSetting 
                                timeGoal={timeGoal}
                                setTimeGoal={setTimeGoal}
                            />
                    }
                    {
                        pageNumber === 2 &&
                        <div className='center text-center lg:text-left'>
                            <ContentBox
                                title={
                                    <>
                                        {t('flow-session.init-session.set-mode.title')}
                                    </>
                                } 
                                body={
                                    <>
                                        {t('flow-session.init-session.set-mode.body')}
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
                        </div>
                    }
                </div>
                <div className='
                    center w-full h-3/4 center p-8
                    lg:w-1/2 lg:h-full
                '>
                    {
                        pageNumber === 0 &&
                            <CreateAction
                                taskList={taskList}
                                createTask={createTask}
                                deleteTask={deleteTask}
                            />
                    }
                    {
                        pageNumber === 1 &&
                        <div className='center text-center lg:text-right'>
                            <ContentBox
                                title={
                                    <>
                                        {t('flow-session.init-session.set-time-goal.title')}
                                    </>
                                } 
                                body={
                                    <>
                                        {t('flow-session.init-session.set-time-goal.body')}
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
                        </div>
                    }
                    {
                         pageNumber === 2 &&
                            <ModeSetting
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                            />
                    }
                </div>
            </div>
            <div className='z-[100] w-full h-[12%] center'>
                {
                    pageNumber === 0 &&
                    <>
                        <CircleButton tooltip={'End session'} 
                            iconName={'x'} 
                            color={'secondary'} 
                            operation={() => {
                                setEndSessionRequest(true);
                                setReturnHome(true);
                            }} 
                        />
                        <Button text={t('common.button.next')} iconName={'next'} color={ 'ciano' } 
                            disab={taskList.length === 0}
                            operation={()=> 
                                setPageNumber(prev => prev+1) 
                            }
                        />
                    </>
                }
                {
                    pageNumber === 1 && 
                    <>
                        <CircleButton tooltip={'End session'} 
                            iconName={'prev'} 
                            color={'secondary'} 
                            operation={()=> setPageNumber(prev => prev-1)}
                        />
                        <Button text={t('common.button.next')} iconName={'next'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></Button>
                    </>
                }
                {
                    pageNumber === 2 && 
                    <>
                        <CircleButton tooltip={'End session'} 
                            iconName={'prev'} 
                            color={'secondary'} 
                            operation={()=> setPageNumber(prev => prev-1)}
                        />
                        <Button text={t('common.button.start')} iconName={'play-end'} color={selectedMode === 1 ? 'primary' : 'success'} operation={()=> {setPageNumber(0); setInitSession(false);}}/>
                    </>
                }
            </div>
        </>
    );
}

export default InitSession;
