import React, {useState, useEffect} from 'react';
import CreateAction from './Task';
import TimeGoalSetting from './TimeGoal';
import ModeSetting from './Mode';
import AnimatedBg from '../../Common/AnimatedBg';
import BPrimary from '../../Common/BPrimary';
import BCircle from '../../Common/BCircle';
import { Trans, useTranslation } from 'react-i18next';
import MExplanation from '../../Common/MExplanation';
import Modal from '../../Common/Modal'

//svg
import {ReactComponent as IconCorrect } from '../../../assets/Icons/advice-correct.svg'
import {ReactComponent as IconWrong } from '../../../assets/Icons/advice-wrong.svg'

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

    const[pageNumber, setPageNumber] = useState(() => {
        const pageNumber = localStorage.getItem('pageNumber');
        return pageNumber ? JSON.parse(pageNumber) : 0;
      }
    );

    const [adviceNumber, setAdviceNumber] = useState(0);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width:400px)").matches;
        const interval = setInterval(() => {
            if( !isMobile ){
                setAdviceNumber((prevNumber) => (prevNumber + 1) % 3);
            }
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <AnimatedBg/>

            <Modal id="mode-explain" onClose={() => document.getElementById('mode-explain').close()}>
                <MExplanation/> 
            </Modal>

            <div className="
                z-[100] flex flex-col w-full h-3/4 justify-evenly items-center overflow-hidden
                lg:flex-row 
            ">
                <div className={`${pageNumber === 0 ? '' : 'hidden'}
                    w-full h-auto center p-8
                    lg:w-auto lg:h-full
                `}>
                    {
                        pageNumber === 0 &&
                        <div className='card-mirror center flex-col items-start w-[390px] h-auto lg:h-[400px] rounded-md p-8 lg:p-6'>
                            <p className='font-titolo text-2xl text-ciano-dark font-bold  text-center lg:text-start'>
                                <Trans i18nKey={'flow-session.init-session.create-tasks.title'}>
                                    Elenca i <span className='underline-wave decoration-ciano'>task</span> della sessione
                                </Trans>
                            </p>
                            <p className='hidden mt-2 lg:block lg:font-bold md:text-start md:font-corpo md:text-ciano'>
                                    {t('flow-session.init-session.create-tasks.body1')}
                            </p>
                            <div className='hidden lg:mt-4 lg:flex lg:justify-center lg:items-start lg:flex-col lg:w-full lg:h-1/3'>
                                <div className='flex w-fullitems-center'>
                                    <IconWrong/>
                                    <p className='flex ml-2 font-corpo font-bold text-rosa'>
                                        {t(`flow-session.init-session.create-tasks.advice.wrong${adviceNumber}`)}
                                    </p>
                                </div>

                                <div className='flex w-full lg:mt-2 lg:items-center '>
                                    <IconCorrect/>
                                    <p className='w-5/6 text-md flex ml-2 font-corpo text-verde font-bold '>
                                        {t(`flow-session.init-session.create-tasks.advice.correct${adviceNumber}`)}
                                    </p>
                                </div>
                            </div>
                            <p className='hidden lg:inline lg: mt-4 lg:text-ciano lg:text-sm'>
                                {t('flow-session.init-session.create-tasks.footer')}
                            </p>
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
                        <div className='w-full h-full card-mirror rounded-lg center flex-col'>
                            <h1 className='font-titolo font-bold text-2xl m-8 text-center text-verde-dark'> 
                                <Trans i18nKey={'flow-session.init-session.set-time-goal.title'}>
                                    Quanto <span className='underline-wave decoration-verde'>tempo</span> vuoi dedidicare <br/> alla sessione ?
                                </Trans>
                            </h1>
                            <TimeGoalSetting 
                                timeGoal={timeGoal}
                                setTimeGoal={setTimeGoal}
                            />
                        </div>
                    }
                    {
                         pageNumber === 2 &&
                         <div className={`w-full h-full ${selectedMode === 1 ? 'card-mirror-ciano': 'card-mirror-verde'} rounded-lg center flex-col`}>
                            <h1 className={`font-titolo font-bold text-2xl m-8 ${selectedMode === 1 ? 'text-ciano-dark': 'text-verde-dark'} text-center text-ciano-dark`}> 
                                <Trans i18nKey={'flow-session.init-session.set-mode.title'}>
                                    Quanto <span className='underline-wave decoration-verde'>tempo</span> vuoi dedidicare <br/> alla sessione ?
                                </Trans>
                            </h1>
                            <p className={`font-corpo text-md ${selectedMode === 1 ? 'text-ciano': 'text-verde'}`}>
                                <Trans i18nKey={'flow-session.init-session.set-mode.body'}>
                                    Se non conosci la differenza <button onClick={()=>document.getElementById('my_modal_3').showModal()} className={`font-bold ${selectedMode === 1 ? 'text-ciano': 'text-verde'} hover:underline`}>clicca quì</button>
                                </Trans>
                            </p>
                            <ModeSetting
                                selectedMode={selectedMode}
                                setSelectedMode={setSelectedMode}
                            />
                        </div>

                    }
                </div>
            </div>
            <div className='z-[100] w-full h-[12%] center'>
                {
                    pageNumber === 0 &&
                    <>
                        <BCircle tooltip={'End session'} 
                            iconName={'x'} 
                            color={'secondary'} 
                            operation={() => {
                                setEndSessionRequest(true);
                                setReturnHome(true);
                            }} 
                        />
                        <BPrimary text={t('flow-session.init-session.create-tasks.button')} iconName={'next'} color={ 'ciano' } 
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
                        <BCircle tooltip={'End session'} 
                            iconName={'prev'} 
                            color={'secondary'} 
                            operation={()=> setPageNumber(prev => prev-1)}
                        />
                        <BPrimary text={t('flow-session.init-session.set-time-goal.button')} iconName={'next'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></BPrimary>
                    </>
                }
                {
                    pageNumber === 2 && 
                    <>
                        <BCircle tooltip={'End session'} 
                            iconName={'prev'} 
                            color={'secondary'} 
                            operation={()=> setPageNumber(prev => prev-1)}
                        />
                        <BPrimary text={t('common.button.start')} iconName={'play-end'} color={selectedMode === 1 ? 'primary' : 'success'} operation={()=> {setPageNumber(0); setIsCreation(false);}}/>
                    </>
                }
            </div>
        </>
    );
}

export default CreateSession;