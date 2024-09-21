import './InitSession.css'
import React, {useState, useEffect} from 'react';
import CreateAction from './CreateAction';
import TimeGoalSetting from './TimeGoalSetting';
import ModeSetting from './ModeSetting';
import BgLeftGradient from '../AnimatedBackground/BgLeftGradient';
import Button from '../Buttons/Button';
import ContentBox from '../AppText/ContentBox';
import CircleButton from '../Buttons/CircleButton';

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

    const[pageNumber, setPageNumber] = useState(() => {
        const pageNumber = localStorage.getItem('pageNumber');
        return pageNumber ? JSON.parse(pageNumber) : 0;
      }
    );

    useEffect( () => {
        localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
    }, [pageNumber] ) 

    const bodyClass = 'font-corpo2 color-dark-ciano'
    const titleClass = 'titolo-font color-dark-ciano'

    return (
        <>
            <BgLeftGradient/>
            <div className="init-session-container background" >
                <div className={`is-left`}>
                    {
                        pageNumber === 0 &&
                            <ContentBox
                                title={
                                    <>
                                        <span className='marker-title'>Before starting</span> set your task
                                    </>
                                } 
                                body={
                                    <>
                                        To stay focused, break down larger tasks  <br/> into <span className='marker-pink'> smaller </span>, manageable steps.<br/> This makes tracking progress  <br/> <span className='marker-green'> easier </span> and keeps you motivated
                                    
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
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
                            <ContentBox
                                title={
                                    <>
                                        Pomodoro or Flowmodoro <span className='marker-title'> ? </span> 
                                    </>
                                } 
                                body={
                                    <>
                                        Pomodoro uses short <span className='marker-green'> work intervals </span> with breaks, <br/> while Flowmodoro adapts to your natural <br/> <span className='marker-pink'> endpoint </span> flow, allowing longer work periods.                                    
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
                    }
                </div>
                <div className='is-rigth'>
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
                            <ContentBox
                                title={
                                    <>
                                        <span className='marker-title'>Set time goal</span> 
                                    </>
                                } 
                                body={
                                    <>
                                        Set a time goal to stay on track. <br/> Having a clear  <span className='marker-pink'> endpoint </span> helps you maintain <br/> <span className='marker-green'> focus </span> and boosts your productivity.
                                    
                                    </>
                                }
                                titleClass={titleClass}
                                bodyClass={bodyClass}
                            />
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
            <div className='is-controls'>
                {
                    pageNumber === 0 &&
                    <>
                        <CircleButton tooltip={'End session'} 
                            iconName={'x'} 
                            color={'ligth-pink'} 
                            operation={() => {
                                setEndSessionRequest(true);
                                setReturnHome(true);
                            }} 
                            activeColor={'pink'}
                        />
                        <Button text={'Next'} iconName={'next-white'} color={ taskList.length > 0 ? 'ciano': 'gray' } 
                            operation={()=> 
                                taskList.length > 0 ? setPageNumber(prev => prev+1) : '' 
                            }
                        />
                    </>
                }
                {
                    pageNumber === 1 && 
                    <>
                        <Button text={'Prev'} iconName={'prev'} color={'ligth-pink'} operation={()=> setPageNumber(prev => prev-1)}></Button>
                        <Button text={'Next'} iconName={'next-white'} color={'ciano'} operation={()=> setPageNumber(prev => prev+1)}></Button>
                    </>
                }
                {
                    pageNumber === 2 && 
                    <>
                        <Button text={'Prev'} iconName={'prev'} color={'ligth-pink'} operation={()=> setPageNumber(prev => prev-1)}></Button>
                        <Button text={'Start'} iconName={'play-end'} color={selectedMode === 1 ? 'ciano' : 'green'} operation={()=> {setPageNumber(0); setInitSession(false);}}/>
                    </>
                }
            </div>
        </>
    );
}

export default InitSession;
